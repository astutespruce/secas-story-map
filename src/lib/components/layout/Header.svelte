<script>
    import Logo from '$lib/assets/SECAS_logo.svg'
</script>

<header class="flex flex-none items-center gap-3 py-2 px-2 leading-none">
    <a href="https://secassoutheast.org/" target="_blank" class="text-foreground hover:no-underline">
        <img src={Logo} height="30px" width="30px" alt="SECAS logo" />
    </a>

    <a href="/">
        <h1 class="m-0 text-2xl leading-none">Southeast Conservation Adaptation Strategy Projects</h1>
    </a>
</header>

<style>
    header {
        background-color: #4279a6;
        color: #fff;
        border-bottom: 2px solid #444;

        a {
            color: #fff;
        }
    }
</style>
