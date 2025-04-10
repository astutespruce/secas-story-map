<script lang="ts">
    import { CircleX } from '@lucide/svelte'

    const { title, content, photo, photo_caption, photo_url, onClose } = $props()
</script>

<div class="relative flex flex-col">
    <div class="pt-4 pb-8 px-4">
        <div class="flex justify-between gap-4">
            <div class="flex-auto text-xl font-bold leading-tight">
                {title}
            </div>
            <div class="flex-none">
                <button
                    onclick={onClose}
                    class="text-zinc-400 hover:text-foreground mt-1"
                    tabindex="0"
                    title="close project"
                >
                    <CircleX size="1.5em" />
                </button>
            </div>
        </div>

        <div class="mt-4">
            <img src={photo} alt="caption" class="border border-zinc-300" />
        </div>
        <div class="text-sm leading-tight text-zinc-600 mt-1">
            {#if photo_url && photo_caption.indexOf('Photo:') !== -1}
                {photo_caption.split('Photo:')[0]}Photo:
                <a href={photo_url} target="_blank" class="text-zinc-600 underline"
                    >{photo_caption.split('Photo:')[1]}</a
                >
            {:else}
                {photo_caption}
            {/if}
        </div>

        <div class="markdown-content">{@render content()}</div>
    </div>
</div>
