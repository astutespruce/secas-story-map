<script>
    import { page } from '$app/state'

    console.error(page.status)
    console.error(page.error)
</script>

<svelte:head>
    <title>{page.status} | SECAS Conservation Projects</title>
</svelte:head>

{#if page.status === 404}
    <div class="container my-20">
        <h1>PAGE NOT FOUND</h1>
    </div>
{:else}
    <div class="container my-20">
        <h1>Uh oh!</h1>
        <h2>There was an unexpected error</h2>
        <div class="mt-4 text-xl">
            Please try again in a few minutes. If that still doesn't work, please
            <a href="mailto:hilary_morris@fws.gov"> let us know</a>!
        </div>
    </div>
{/if}
