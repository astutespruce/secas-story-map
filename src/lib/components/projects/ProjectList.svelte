<script lang="ts">
    import ProjectListItem from './ProjectListItem.svelte'

    const { projects } = $props()
</script>

{#each projects as project, i}
    <!-- {#if i > 0}
        <hr class="my-6 border-zinc-300" />
    {/if} -->

    <ProjectListItem {...project} />
{/each}
