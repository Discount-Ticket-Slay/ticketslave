<script>
    import Navbar from "../old-components/Essentials/Navbar.svelte";
    import DinoGame from "../old-components/Boing/DinoGame.svelte";
    import LoadingBar from "../old-components/Misc/LoadingBar.svelte";
    import { Button } from "carbon-components-svelte";

    const waitTime = () => {
        alert("clicked");
    };
</script>

<main>
    <Navbar />
    <Button href="/#/buy-ticket">Go to: Ticketing</Button>
    <div class="centered-div">
        <DinoGame />
    </div>
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.css";

    .centered-div {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        padding: 10px;
    }
</style>
