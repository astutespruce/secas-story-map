import type { StyleSpecification } from 'mapbox-gl'

export const bounds: [number, number, number, number] = [-106.64569497, 17.63478139, -64.44293322, 40.63868947]

export const style: StyleSpecification = {
    version: 8,
    sources: {
        boundaries: {
            type: 'pmtiles',
            url: '/boundaries.pmtiles',
        },
        geojson: {
            type: 'geojson',
            data: null,
        },
    },
    layers: [
        {
            id: 'geojson-fill',
            source: 'geojson',
            type: 'fill',
            filter: ['==', 'id', Infinity],
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.25,
            },
        },
        {
            id: 'geojson-outline',
            source: 'geojson',
            type: 'line',
            filter: ['==', 'id', Infinity],
            paint: {
                'line-color': 'orange',
                'line-width': 2,
            },
        },
        {
            id: 'boundaries-fill',
            type: 'fill',
            source: 'boundaries',
            'source-layer': 'boundaries',
            filter: ['==', 'id', Infinity],
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.25,
            },
        },
        {
            id: 'boundaries-outline',
            type: 'line',
            source: 'boundaries',
            'source-layer': 'boundaries',
            filter: ['==', 'id', Infinity],
            paint: {
                'line-color': 'orange',
                'line-width': 2,
            },
        },

        {
            id: 'secas-boundary',
            type: 'line',
            source: 'boundaries',
            'source-layer': 'boundaries',
            filter: ['==', 'id', 'secas'],
            paint: {
                'line-color': '#000',
                'line-width': 1.5,
            },
        },
    ],
}
