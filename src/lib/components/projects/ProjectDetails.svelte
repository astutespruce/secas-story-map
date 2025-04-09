<script lang="ts">
    import { CircleX } from '@lucide/svelte'

    const { title, content, photo, photo_caption, photo_url, onClose } = $props()
</script>

<div class="pt-4 pb-8 px-4">
    <div class="flex justify-between items-start gap-4">
        <div class="text-xl font-bold leading-tight">
            {title}
        </div>

        <button onclick={onClose} class="flex-none text-zinc-400 hover:text-foreground">
            <CircleX size="2em" />
        </button>
    </div>

    <div class="mt-4">
        <img src={photo} alt="caption" />
    </div>
    <div class="text-sm leading-tight text-zinc-600">
        {#if photo_url && photo_caption.indexOf('Photo:') !== -1}
            {photo_caption.split('Photo:')[0]}Photo:
            <a href={photo_url} target="_blank" class="text-zinc-600 underline">{photo_caption.split('Photo:')[1]}</a>
        {:else}
            {photo_caption}
        {/if}
    </div>

    <div class="markdown-content">{@render content()}</div>
</div>
