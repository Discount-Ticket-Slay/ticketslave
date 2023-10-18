<script>
    import Seat from "./others/Seat.svelte"
    import Navbar from "./Navbar.svelte"
    import Footer from "./Footer.svelte"
</script>

<body>
    <Navbar />
    <Seat />
    <Footer />
</body>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>

