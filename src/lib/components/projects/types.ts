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

    photo: string
    photo_caption: string
    photo_url?: string | null | undefined

    // from markdown content
    content: any

    // added dynamically based on path
    id: string
}
