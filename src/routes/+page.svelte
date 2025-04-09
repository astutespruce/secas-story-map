<script>
    import { Sidebar } from '$lib/components/layout'
    import { Map } from '$lib/components/map'
    import { ProjectList } from '$lib/components/projects'
    import Logo from '$lib/assets/SECAS_logo_words.svg'

    const { data } = $props()
    const { projects } = data
</script>

<svelte:head>
    <title>SECAS Conservation Projects</title>
    <meta name="description" content="A story map of conservation projects." />
</svelte:head>

<main class="flex gap-0 h-full w-full">
    <Sidebar>
        <ProjectList {projects} />

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
    </Sidebar>
    <Map />
</main>
