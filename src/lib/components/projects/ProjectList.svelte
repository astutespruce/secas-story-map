<script lang="ts">
    import ProjectListItem from './ProjectListItem.svelte'

    const { projects, onSelectProject } = $props()
</script>

{#each projects as project}
    <ProjectListItem {...project} {onSelectProject} />
{/each}
