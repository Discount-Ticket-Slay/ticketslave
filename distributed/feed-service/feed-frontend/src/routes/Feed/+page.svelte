<script>
    import Navbar from "../../components/Essentials/Navbar.svelte"
    import Footer from "../../components/Essentials/Footer.svelte"
    import Carousel from "../../components/Others/Carousel.svelte"
    import Searchbar from "../../components/Others/Searchbar.svelte"
    import Card from "../../components/Others/Card.svelte"
    import FaqCard from "../../components/Others/FaqCard.svelte"
    import EventCard from "../../components/Events/EventCard.svelte"
</script>

<body>
    <Navbar />
    

    <div class="content">
        <div class="pt-10">
            <Searchbar />
        </div>

        <Carousel />

        <!-- <div class="grid grid-cols-2 gap-4 pt-10 pb-10">
            <div class="col>"><EventCard /></div>
        </div> -->

        <div class="grid grid-cols-2 gap-4 pt-10 pb-10">
            <div class="col>"><Card /></div>
            <div class="col>"><FaqCard /></div>
        </div>
        
    </div>

    <Footer />
</body>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
    }
</style>