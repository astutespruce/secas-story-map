<script>
    let { children } = $props()
</script>

<div class="flex-none w-[440px] border-r-2 border-zinc-200 overflow-y-auto">
    {@render children()}
</div>
