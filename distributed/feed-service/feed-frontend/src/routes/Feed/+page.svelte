<script>
    import Navbar from "../../components/Essentials/Navbar.svelte"
    import Footer from "../../components/Essentials/Footer.svelte"
    import Carousel from "../../components/Others/Carousel.svelte"
    import Searchbar from "../../components/Others/Searchbar.svelte"
    import Card from "../../components/Others/Card.svelte"
    import FaqCard from "../../components/Others/FaqCard.svelte"
</script>

<body>
    <Navbar />
    <!-- <Searchbar /> -->
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