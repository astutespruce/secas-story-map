<script>
    const { title, photo, date, caption_text } = $props()

    // TODO: update URL with hash of project ID
</script>

<div class="flex cursor-pointer hover:bg-zinc-100 py-4 px-4 border-b border-zinc-300 gap-4">
    <div class="flex-auto">
        <div class="font-bold leading-tight">{title}</div>
        <div class="text-muted-foreground text-sm">{date.toLocaleDateString()}</div>
    </div>
    <div class="flex-none w-[100px]">
        <img src={photo} alt={caption_text} class="border border-zinc-300 w-full" />
    </div>
</div>
