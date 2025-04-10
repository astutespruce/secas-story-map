<script>
    const { id, title, photo, caption_text } = $props()
</script>

<a
    href={`#${id}`}
    class="cursor-pointer hover:bg-zinc-100 pt-5 pb-7 px-4 border-b border-zinc-200 gap-0 hover:no-underline block"
>
    <div class="font-bold leading-tight text-foreground">{title}</div>

    <div class="h-[100px] overflow-hidden flex flex-col justify-center">
        <img src={photo} alt={caption_text} class="border border-zinc-300 w-full border border-zinc-300 block" />
    </div>
</a>
