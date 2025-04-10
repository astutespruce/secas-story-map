<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'

    import type { Project } from '$lib/components/projects/types'
    import { Map } from '$lib/components/map'
    import { ProjectList, ProjectDetails } from '$lib/components/projects'
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

<main class="gap-0 h-full w-full relative">
    <div
        class="border-r-2 border-zinc-200 overflow-y-auto absolute z-[100] left-0 top-0 bottom-0 bg-white"
        style={`width: ${selectedProject ? '440px' : '264px'};`}
        bind:this={sidebarNode}
    >
        {#if selectedProject}
            <ProjectDetails {...selectedProject} onClose={closeProject} />
        {:else}
            <ProjectList {projects} onSelectProject={setProject} />

            <div class="flex gap-4 py-6 px-4">
                <img src={Logo} height="54px" width="41px" alt="SECAS logo" />
                <div class="text-md">
                    Southeast Conservation Adaptation Strategy (SECAS). 2025. <a
                        href="https://secassoutheast.org/"
                        target="_blank"
                    >
                        https://secassoutheast.org/
                    </a>
                </div>
            </div>
        {/if}
    </div>
    <Map {projects} {selectedProject} onMarkerClick={openProject} />
</main>
