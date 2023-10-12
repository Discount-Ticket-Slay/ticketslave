<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import DinoGame from "../components/Boing/DinoGame.svelte";
    import { Button } from "carbon-components-svelte";
    import {onMount} from 'svelte'

    let eventId = null;

    async function fetchEvent() {
        try {
        const hash = window.location.hash;
        const paramsStart = hash.indexOf('?');

        if (paramsStart >= 0) {
            const paramString = hash.slice(paramsStart + 1);
            const urlParams = new URLSearchParams(paramString);

            let receivedId = urlParams.get("id");
            console.log(receivedId);

            if (receivedId) {
                eventId = Number(receivedId);
            }
        }
    } catch {
            console.error(error)
        }
    }
    onMount(fetchEvent)
</script>

<main>
    <Navbar />
    <Button href="/#/buy-ticket?id={eventId}">Go to: Ticketing</Button>
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
