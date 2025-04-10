import { bbox } from "@turf/bbox";

import type { Project } from '$lib/components/projects/types'

import {indexBy} from '$lib/util/data'

export const load = () => {
    const images = import.meta.glob('$projects/**/banner.jpg', { eager: true, import: 'default'})
    const boundaries = import.meta.glob('$projects/**/boundary.json', { eager: true, import: 'default'})
    const paths = import.meta.glob('$projects/**/project.md', { eager: true })

    const projects = []

    for (const path in paths) {
        const file = paths[path]
        const id = path.split('/').at(-2)
        if (id && file && typeof file === 'object' && 'metadata' in file) {
            const metadata = file.metadata as Omit<Project, 'id'>
            const imageKey = Object.keys(images).filter((m) => m.split('/').at(-2) === id)[0]
            const boundaryKey = Object.keys(boundaries).filter((m)=>m.split('/').at(-2)===id)[0]

            projects.push({
                ...metadata,
                // load parsed markdown content
                content: file.default,
                id,
                date: new Date(metadata.date),
                photo: images[imageKey],
                boundary: boundaries[boundaryKey],
                bounds: bbox(boundaries[boundaryKey])
            })
        }
    }

    // sort by date
    projects.sort(({date: a}, {date: b}) => a>b ? -1 : 1)


    return {projects, projectIndex: indexBy(projects, "id")}
}