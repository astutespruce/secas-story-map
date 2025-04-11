import type { StyleSpecification } from 'mapbox-gl'

export const bounds: [number, number, number, number] = [-106.64569497, 17.63478139, -64.44293322, 40.63868947]

export const style: StyleSpecification = {
    version: 8,
    sources: {
        boundaries: {
            type: 'pmtiles',
            url: '/tiles.pmtiles',
        },
        projects: {
            type: 'geojson',
            data: null,
        },
    },
    layers: [
        {
            id: 'projects-fill',
            source: 'projects',
            type: 'fill',
            filter: ['==', 'id', Infinity],
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.25,
            },
        },
        {
            id: 'projects-outline',
            source: 'projects',
            type: 'line',
            filter: ['==', 'id', Infinity],
            paint: {
                'line-color': 'orange',
                'line-width': 2,
            },
        },
        {
            id: 'states-fill',
            type: 'fill',
            source: 'boundaries',
            'source-layer': 'states',
            filter: ['==', 'id', Infinity],
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.25,
            },
        },
        {
            id: 'states-outline',
            type: 'line',
            source: 'boundaries',
            'source-layer': 'states',
            filter: ['==', 'id', Infinity],
            paint: {
                'line-color': 'orange',
                'line-width': 2,
            },
        },

        {
            id: 'boundary',
            type: 'line',
            source: 'boundaries',
            'source-layer': 'boundary',
            paint: {
                'line-color': '#000',
                'line-width': 1.5,
            },
        },
    ],
}
