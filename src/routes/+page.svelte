<script>
    import { Sidebar } from '$lib/components/layout'
    import { Map } from '$lib/components/map'
    import Logo from '$lib/assets/SECAS_logo_words.svg'
</script>

<svelte:head>
    <title>SECAS Conservation Projects</title>
    <meta name="description" content="A story map of conservation projects." />
</svelte:head>

<main class="flex gap-0 h-full w-full">
    <Sidebar>
        <h1>Heading</h1>

        <p>TODO: content</p>

        <div class="border-t border-t-zinc-200 flex gap-4 mt-4 pt-4">
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
