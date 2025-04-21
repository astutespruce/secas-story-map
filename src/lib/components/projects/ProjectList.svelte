<script lang="ts">
    const { projects } = $props()
</script>

<nav class="order-1 flex flex-none overflow-x-auto border-t-2 border-zinc-600">
    {#each projects as project}
        <a
            href={`#${project.id}`}
            class="block flex w-[240px] flex-none cursor-pointer flex-col justify-between gap-2 border-l border-zinc-200 px-4 py-4 hover:bg-zinc-100 hover:no-underline"
        >
            <div class=" leading-tight text-foreground">{project.title}</div>

            <div class="flex h-[120px] flex-col justify-center overflow-hidden">
                <img
                    src={project.photo}
                    alt={project.photo_caption}
                    class="block w-full flex-none border border border-zinc-300 border-zinc-300"
                />
            </div>
        </a>
    {/each}
</nav>
