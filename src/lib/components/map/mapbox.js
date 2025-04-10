/* consolidated loading of mapbox GL to ensure token is properly initialized */

// exclude Mapbox GL from babel transpilation per https://docs.mapbox.com/mapbox-gl-js/guides/migrate-to-v2/
/* eslint-disable-next-line */
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { MAPBOX_TOKEN } from '$lib/config'

mapboxgl.accessToken = MAPBOX_TOKEN

export { mapboxgl }
