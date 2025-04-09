<script lang="ts">
    import { page } from '$app/state'
    import { goto } from '$app/navigation'

    import type { Project } from '$lib/components/projects/types'
    import { Sidebar } from '$lib/components/layout'
    import { Map } from '$lib/components/map'
    import { ProjectList, ProjectDetails } from '$lib/components/projects'
    import Logo from '$lib/assets/SECAS_logo_words.svg'

    const { data } = $props()
    const { projects, projectIndex } = data

    let selectedProject: Project | null = $state(null)

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
    })
</script>

<svelte:head>
    <title>SECAS Conservation Projects</title>
    <meta name="description" content="A story map of conservation projects." />
</svelte:head>

<main class="flex gap-0 h-full w-full">
    <Sidebar>
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
    </Sidebar>
    <Map {projects} onMarkerClick={openProject} />
</main>
