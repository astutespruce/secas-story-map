import type {StyleSpecification} from 'maplibre-gl'

export const bounds: [number, number, number, number] = [
    -106.93611462308955, 14.65662961734786, -48.85555906753385, 43.47207027673693,
]

export const style: StyleSpecification = {
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
            source: 'osm',
        },
        {
            id: 'boundary',
            type: 'line',
            source: 'local',
            'source-layer': 'boundary',
            paint: {
                'line-color': '#000',
                'line-width': 1.5,
            },
        },
    ],
}