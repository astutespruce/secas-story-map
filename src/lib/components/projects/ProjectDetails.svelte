<script lang="ts">
    import { ChevronsLeft } from '@lucide/svelte'

    const { title, content, photo, photo_caption, photo_url, onClose } = $props()
</script>

<div class="relative flex flex-col">
    <div class="bg-zinc-100 py-2 px-4 flex-none">
        <button onclick={onClose} class="flex items-center leading-none gap-1 text-blue-600">
            <ChevronsLeft size="1.25em" />

            see all projects
        </button>
    </div>
    <div class="pt-4 pb-8 px-4">
        <div class="text-xl font-bold leading-tight">
            {title}
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
