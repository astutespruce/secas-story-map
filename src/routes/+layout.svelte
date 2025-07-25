<script lang="ts">
    import raleway from '@fontsource/raleway/files/raleway-latin-700-normal.woff2?url'
    import sourceSansPro from '@fontsource/source-sans-pro/files/source-sans-pro-latin-400-normal.woff2?url'

    import '../app.css'

    import { Analytics, Footer, Header } from '$lib/components/layout'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="preload" as="font" type="font/woff2" href={raleway} crossorigin="anonymous" />
    <link rel="preload" as="font" type="font/woff2" href={sourceSansPro} crossorigin="anonymous" />
</svelte:head>

<Analytics />

<div class="overflow-none flex h-full w-full flex-col">
    <Header />

    <div class="h-full w-full flex-auto overflow-auto">
        {@render children()}
    </div>
    <Footer />
</div>
