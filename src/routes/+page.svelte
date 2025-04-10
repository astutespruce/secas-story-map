<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'

    import type { Project } from '$lib/components/projects/types'
    import { Map } from '$lib/components/map'
    import { ProjectDetails, ProjectList } from '$lib/components/projects'
    import Logo from '$lib/assets/SECAS_logo_words.svg'

    const { data } = $props()
    const { projects, projectIndex } = data

    let selectedProject: Project | null = $state(
        window.location.hash ? projectIndex[window.location.hash.slice(1)] : null
    )
    let sidebarNode: Element

    const setProject = (id: String | null) => {
        selectedProject = id === null ? null : projectIndex[id]

        // scroll sidebar to top on change of content
        if (sidebarNode) {
            sidebarNode.scrollTo({ top: 0, behavior: 'auto' })
        }
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
    })
</script>

<svelte:head>
    <title>SECAS Conservation Projects</title>
    <meta name="description" content="A story map of conservation projects." />
</svelte:head>

<main class="flex flex-col gap-0 h-full w-full relative overflow-hidden">
    <div class="flex flex-auto gap-0 relative h-full">
        {#if selectedProject}
            <div
                class="flex-none w-[440px] border-r-2 border-zinc-400 overflow-y-auto z-[100] bg-white"
                bind:this={sidebarNode}
            >
                <ProjectDetails {...selectedProject} onClose={closeProject} />
            </div>
        {/if}

        <Map {projects} {selectedProject} onMarkerClick={openProject} />
    </div>

    {#if !selectedProject}
        <ProjectList {projects} />
    {/if}
</main>
