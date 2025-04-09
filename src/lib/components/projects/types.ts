type Banner = {
    credits: string
    url?: string
    label?: string

    // added dynamically
    src: object
}

export type Project = {
    // from frontmatter
    title: string
    summary: string
    date: string
    banner: Banner
    latitude: number
    longitude: number


    // from markdown content
    description: string

    // added dynamically based on path
    id: string
}
