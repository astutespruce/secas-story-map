<script lang="ts">
    import { Expand } from '@lucide/svelte'
    import { onMount, onDestroy } from 'svelte'

    import { bounds, style } from './config'
    import { mapboxgl } from './mapbox'
    import { PMTilesSource } from './pmtiles'
    import { getCenterAndZoom } from './viewport'

    // enable PMTiles source
    mapboxgl.Style.setSourceType(PMTilesSource.SOURCE_TYPE, PMTilesSource)

    const { projects, selectedProject, onMarkerClick } = $props()

    let mapContainer: HTMLDivElement
    let map: mapboxgl.Map
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

        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/light-v9',
            ...(selectedProject ? getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05) : southeast),
        })

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

        // @ts-ignore
        window.map = map

        map.once('style.load', () => {
            // hide Gulf of Mexico per US federal requirements (2025)
            if (map.style._layers['marine-label-md-pt']) {
                map.setFilter('marine-label-md-pt', [
                    'all',
                    ['==', '$type', 'Point'],
                    ['in', 'labelrank', 2, 3],
                    ['!=', 'name', 'Gulf of Mexico'],
                ])
            }
        })

        map.on('load', () => {
            // add sources
            Object.entries(style.sources).forEach(([id, source]) => {
                map.addSource(id, source)
            })

            style.layers.forEach((layer) => {
                map.addLayer(layer)
            })

            // add marker for each project
            projects.forEach(({ id, title, latitude, longitude }) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(new mapboxgl.Popup({ closeButton: false }).setHTML(title))
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

    const zoomFullExtent = () => {
        map.flyTo({ ...southeast })
    }

    onDestroy(() => {
        if (map) {
            map.remove()
        }
    })
</script>

<div class="flex-auto w-full h-full relative map" class:has-selected-project={!!selectedProject}>
    <div class="h-full w-full absolute" bind:this={mapContainer}></div>
    <button
        class="absolute top-[75px] right-[10px] z-[1000] bg-white leading-none rounded-[4px] p-[2px]"
        style="border: 1px solid #ddd;box-shadow: 0 0 0 1px rgba(0,0,0,.1);"
        onclick={zoomFullExtent}
    >
        <Expand />
    </button>
</div>

<style>
    /* highlight marker on hover; have to use global to prevent unused CSS from being removed */
    :global(.mapboxgl-marker:hover svg > path:first-of-type, .mapboxgl-marker.visited:hover svg > path:first-of-type) {
        fill: orange;
    }

    :global(.mapboxgl-marker.visited svg > path:first-of-type) {
        fill: purple;
    }

    :global(.has-selected-project .mapboxgl-marker) {
        display: none;
    }

    /* make popup contents match regular paragraph styling */
    :global(.mapboxgl-popup-content) {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 1rem;
        line-height: 1.1;
        padding: 0.5rem;
    }
</style>
