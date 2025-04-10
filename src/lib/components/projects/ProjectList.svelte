<script lang="ts">
    const { projects } = $props()
</script>

<div class="flex flex-none overflow-x-auto border-t-2 border-zinc-600">
    {#each projects as project}
        <a
            href={`#${project.id}`}
            class="w-[240px] flex-none flex flex-col justify-between cursor-pointer py-4 hover:bg-zinc-100 px-4 border-l border-zinc-200 gap-2 hover:no-underline block"
        >
            <div class=" leading-tight text-foreground">{project.title}</div>

            <div class="h-[120px] overflow-hidden flex flex-col justify-center">
                <img
                    src={project.photo}
                    alt={project.photo_caption}
                    class="flex-none border border-zinc-300 w-full border border-zinc-300 block"
                />
            </div>
        </a>
    {/each}
</div>
