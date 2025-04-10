<script>
    const { id, title, photo, date, caption_text, onSelectProject } = $props()

    // TODO: update URL with hash of project ID
    // on:click={() => onSelectProject(id)}
</script>

<a
    href={`#${id}`}
    class="cursor-pointer hover:bg-zinc-100 py-4 px-4 border-b border-zinc-300 gap-4 hover:no-underline block"
>
    <div>
        <div class="font-bold leading-tight text-foreground">{title}</div>
        <div class="text-muted-foreground text-sm">{date.toLocaleDateString()}</div>
    </div>
    <div>
        <img src={photo} alt={caption_text} class="border border-zinc-300 w-full border border-zinc-300" />
    </div>
</a>
