<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import Footer from "../components/Essentials/Footer.svelte";
    import DinoGame from "../components/Game/DinoGame.svelte";
    import { Button } from "carbon-components-svelte";
    import {onMount} from 'svelte'

    // security measure to prevent unauthorized access (authenticate when page loads)
    let authenticated = false;
//    import { changeRoute } from '../utils/routeUtils.js'; 

    // onMount(() => {
    //     changeRoute('/#/queue', window.location.href);
    //     authenticated = true;
    // });

    // const waitTime = () => {
    //     alert("clicked");
    // };

    let eventId = null;

    let event = null
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

<Navbar />

<div class="min-h-screen flex flex-col">
    <!-- <Button href="/#/buy-ticket?id={eventId}">Go to: Ticketing</Button> -->
    <div class="centered-div">
        <DinoGame />
    </div>
</div>

<Footer />

<style>
    @import "bootstrap/dist/css/bootstrap.css";

    .centered-div {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        padding: 10px;
    }
</style>
