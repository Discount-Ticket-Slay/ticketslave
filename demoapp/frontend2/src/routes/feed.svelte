<script>
    import Navbar from "../components/Navbar.svelte"
    import Footer from "../components/Footer.svelte"
    import Carousel from "../components/others/Carousel.svelte"
    import Searchbar from "../components/others/Searchbar.svelte"
    import Card from "../components/others/Card.svelte"
    import FaqCard from "../components/others/FaqCard.svelte"
</script>

<body>
    <Navbar />
    <Searchbar />
    <Carousel />
    <Card />
    <FaqCard />
    <Footer />
</body>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>