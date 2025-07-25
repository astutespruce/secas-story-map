<script>
    import { ExternalLink } from '@lucide/svelte'
</script>

<footer class="flex flex-none gap-4 items-center justify-between py-1 px-2 leading-none text-sm">
    <div>
        <a href="https://secassoutheast.org/" target="_blank" class="flex gap-2 items-center"
            >SECAS website <ExternalLink size={16} /></a
        >
    </div>

    <div>Created by the U.S. Fish and Wildlife Service</div>
</footer>

<style>
    footer {
        background-color: #1e435b;
        color: #fff;
        a {
            color: #fff;
        }
    }
</style>
