<script lang="ts">
    const { projects } = $props()
</script>

<nav>
    {#each projects as project, i}
        {#if i > 0}
            <hr />
        {/if}
        <a
            href={`#${project.id}`}
            class="block flex flex-none cursor-pointer flex-col justify-between gap-2 border-l border-zinc-200 px-4 pb-6 pt-4 hover:bg-zinc-100 hover:no-underline"
        >
            <div class="font-bold leading-tight text-foreground">{project.title}</div>
            <div
                class="flex h-[120px] flex-col overflow-hidden"
                class:justify-start={project.photo_position === 'top'}
                class:justify-center={project.photo_position === 'center' || !project.photo_position}
                class:justify-end={project.photo_position === 'bottom'}
            >
                <img
                    src={project.photo}
                    alt={project.photo_caption}
                    class="block w-full flex-none border border border-zinc-300 border-zinc-300"
                />
            </div>
        </a>
    {/each}
</nav>
