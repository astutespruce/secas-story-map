<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'

    import type { Project } from '$lib/components/projects/types'
    import { Map } from '$lib/components/map'
    import { ProjectDetails, ProjectList } from '$lib/components/projects'
    import Logo from '$lib/assets/SECAS_logo_words.svg'

    const { data } = $props()
    const { projects, projectIndex } = data

    let sidebarNode: Element

    let selectedProject: Project | null = $state(
        window.location.hash ? projectIndex[window.location.hash.slice(1)] : null
    )
    const setProject = (id: String | null) => {
        selectedProject = id === null ? null : projectIndex[id]
    }

    const openProject = (id: String) => {
        goto(`${window.location.href.split('#')[0]}#${id}`)
    }

    const closeProject = () => {
        goto(window.location.href.split('#')[0])
    }

    let hash = $derived(page.url.hash)

    $effect(() => {
        // when hash updates, set project
        setProject(hash ? hash.slice(1) : null)

        // scroll sidebar to top on change of content
        if (sidebarNode) {
            sidebarNode.scrollTo({ top: 0, behavior: 'auto' })
        }
    })
</script>

<svelte:head>
    <title>SECAS Conservation Projects</title>
    <meta name="title" content="Southeast Conservation Adaptation Strategy Projects" />
    <meta name="description" content="A story map of conservation projects." />
</svelte:head>

<main class="relative flex h-full w-full gap-0">
    <div
        class="z-[100] w-[440px] flex-none overflow-y-auto border-r-2 border-zinc-200 bg-white"
        bind:this={sidebarNode}
    >
        {#if selectedProject}
            <ProjectDetails {...selectedProject} onClose={closeProject} />
        {:else}
            <ProjectList {projects} />
        {/if}
    </div>
    <Map {projects} {selectedProject} onMarkerClick={openProject} />
</main>
