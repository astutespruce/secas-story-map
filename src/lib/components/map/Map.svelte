<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import maplibre from 'maplibre-gl'
    import 'maplibre-gl/dist/maplibre-gl.css'
    import { Protocol } from 'pmtiles'

    import { bounds, style } from './config'
    import { getCenterAndZoom } from './viewport'

    const { projects, selectedProject, onMarkerClick } = $props()

    let protocol = new Protocol()
    maplibre.addProtocol('pmtiles', protocol.tile)

    let mapContainer: HTMLDivElement
    let map: maplibre.Map
    let southeast: { center: [number, number]; zoom: number }

    style.sources.projects.data = {
        type: 'FeatureCollection',
        features: projects.map(({ id, boundary }) => ({
            type: 'Feature',
            geometry: boundary,
            properties: {
                id,
            },
        })),
    }

    onMount(() => {
        southeast = getCenterAndZoom(mapContainer, bounds, 0)

        map = new maplibre.Map({
            container: mapContainer,
            style,
            ...(selectedProject ? getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05) : southeast),
        })

        // @ts-ignore
        window.map = map

        map.on('load', () => {
            projects.forEach(({ id, title, latitude, longitude }) => {
                const marker = new maplibre.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(new maplibre.Popup({ closeButton: false }).setHTML(title))
                    .addTo(map)

                if (selectedProject && selectedProject.id === id) {
                    marker.addClassName('visited')
                }

                const element = marker.getElement()

                element.addEventListener('click', (e) => {
                    e.stopPropagation()
                    onMarkerClick(id)
                    marker.addClassName('visited')
                })

                element.addEventListener('mouseenter', (e) => {
                    e.stopPropagation()
                    marker.togglePopup()
                })

                element.addEventListener('mouseleave', (e) => {
                    e.stopPropagation()
                    marker.togglePopup()
                })
            })
        })
    })

    $effect(() => {
        selectedProject

        if (!map) {
            return
        }

        const updateVisibleProject = () => {
            if (selectedProject) {
                const { id, bounds: projectBounds, boundary: projectBoundary } = selectedProject
                map.flyTo({ ...getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05) })
                map.setFilter('projects-outline', ['==', 'id', id])
                map.setFilter('projects-fill', ['==', 'id', id])
            } else {
                map.flyTo({ ...southeast })
                map.setFilter('projects-outline', ['==', 'id', Infinity])
                map.setFilter('projects-fill', ['==', 'id', Infinity])
            }
        }

        if (map.loaded()) {
            updateVisibleProject()
        } else {
            map.once('idle', updateVisibleProject)
        }
    })

    onDestroy(() => {
        maplibre.removeProtocol('pmtiles')

        if (map) {
            map.remove()
        }
    })
</script>

<div class="left-[264px] top-0 bottom-0 right-0 absolute map z-[0]" class:has-selected-project={!!selectedProject}>
    <div class="h-full w-full absolute" bind:this={mapContainer}></div>
</div>

<style>
    /* highlight marker on hover; have to use global to prevent unused CSS from being removed */
    :global(
        .maplibregl-marker:hover svg > g > g:nth-child(2),
        .maplibregl-marker.visited:hover svg > g > g:nth-child(2)
    ) {
        fill: orange;
    }

    :global(.maplibregl-marker.visited svg > g > g:nth-child(2)) {
        fill: purple;
    }

    :global(.has-selected-project .maplibregl-marker) {
        display: none;
    }

    /* make popup contents match regular paragraph styling */
    :global(.maplibregl-popup-content) {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 1rem;
        line-height: 1.1;
        padding: 0.5rem;
        border: 1px solid #000;
    }
</style>
