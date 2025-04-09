<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import maplibre from 'maplibre-gl'
    import 'maplibre-gl/dist/maplibre-gl.css'
    import { Protocol } from 'pmtiles'

    import { bounds, style } from './config'
    import { getCenterAndZoom } from './viewport'

    const { projects, onMarkerClick } = $props()

    let protocol = new Protocol()
    maplibre.addProtocol('pmtiles', protocol.tile)

    let mapContainer: HTMLDivElement
    let map: maplibre.Map
    const markers = {}

    onMount(() => {
        const { center, zoom } = getCenterAndZoom(mapContainer, bounds, 0)

        map = new maplibre.Map({
            container: mapContainer,
            style,
            center,
            zoom,
        })

        // @ts-ignore
        window.map = map

        map.on('load', () => {
            // TODO: add boundaries into layer
            projects.forEach(({ id, title, latitude, longitude }) => {
                const marker = new maplibre.Marker()
                    .setLngLat([longitude, latitude])
                    // .setPopup(new maplibre.Popup({ closeButton: false }).setHTML(title))
                    .addTo(map)

                marker.getElement().addEventListener('click', (e) => {
                    e.stopPropagation()
                    onMarkerClick(id)
                })

                const element = marker.getElement()
                const g = element
                    .getElementsByTagName('svg')[0]
                    .getElementsByTagName('g')[0]
                    .getElementsByTagName('g')[1]

                marker.getElement().addEventListener('mouseenter', () => {
                    g.setAttribute('fill', 'purple')
                })

                marker.getElement().addEventListener('mouseleave', () => {
                    g.setAttribute('fill', '#3FB1CE')
                })

                markers[id] = marker
            })
        })

        // FIXME: remove
        window.markers = markers
    })

    onDestroy(() => {
        maplibre.removeProtocol('pmtiles')

        if (map) {
            map.remove()
        }
    })
</script>

<div class="flex-auto h-full w-full relative map">
    <div class="h-full w-full absolute" bind:this={mapContainer}></div>
</div>
