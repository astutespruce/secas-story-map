<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import maplibre from 'maplibre-gl'
    import 'maplibre-gl/dist/maplibre-gl.css'
    import { Protocol } from 'pmtiles'

    import { getCenterAndZoom } from './viewport'

    let protocol = new Protocol()
    maplibre.addProtocol('pmtiles', protocol.tile)

    const bounds: [number, number, number, number] = [
        -106.93611462308955, 14.65662961734786, -48.85555906753385, 43.47207027673693,
    ]

    const style: maplibre.StyleSpecification = {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap Contributors',
                maxzoom: 19,
            },
            local: {
                type: 'vector',
                url: `pmtiles://${window.location.protocol}//${window.location.host}/tiles.pmtiles`,
            },
        },
        layers: [
            {
                id: 'osm',
                type: 'raster',
                source: 'osm', // This must match the source key above
            },
            {
                id: 'boundary',
                type: 'line',
                source: 'local',
                'source-layer': 'boundary',
                paint: {
                    'line-color': '#000',
                    'line-width': {
                        stops: [
                            [6, 1],
                            [8, 0.1],
                        ],
                    },
                },
            },
        ],
    }

    let mapContainer: HTMLDivElement
    let map: maplibre.Map

    onMount(() => {
        const { center, zoom } = getCenterAndZoom(mapContainer, bounds, 0)

        map = new maplibre.Map({
            container: mapContainer,
            style,
            center,
            zoom,
        })

        window.map = map

        map.on('load', () => {
            // TODO:
            // Object.entries(sources).forEach(([key, source]) => {
            // 	map.addSource(key, source)
            // })
            // layers.forEach((layer) => {
            // 	map.addLayer(layer)
            // })
        })
    })

    onDestroy(() => {
        maplibre.removeProtocol('pmtiles')

        if (map) {
            map.remove()
        }
    })
</script>

<div class="flex-auto h-full w-full relative">
    <div class="h-full w-full absolute" bind:this={mapContainer}></div>
</div>
