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

    let QueueNo = 100;

    // let event = null
    // async function fetchQueueNo() {
    //     try {
    //     const hash = window.location.hash;
    //     const paramsStart = hash.indexOf('?');

    //     if (paramsStart >= 0) {
    //         const paramString = hash.slice(paramsStart + 1);
    //         const urlParams = new URLSearchParams(paramString);

    //         let receivedId = urlParams.get("id");
    //         console.log(receivedId);

    //         if (receivedId) {
    //             QueueNo = Number(receivedId);
    //         }
    //     }
    // } catch {
    //         QueueNo = -1;
    //     }
    // }
    // onMount(fetchQueueNo)


    let fontSize = 55; // initial font size
</script>

<Navbar />
<div class="min-h-screen flex flex-col">
    <div class="centered-div">
        <p class="queue-text" style="font-size: {fontSize + 'px'}">Your Queue Number: {QueueNo}</p>

        <DinoGame />
    </div>
    
    <!-- <Button href="/#/buy-ticket?id={eventId}">Go to: Ticketing</Button> -->
    <!-- <div class="centered-div">
    </div> -->
</div>

<Footer/>

<style>

    .queue-text {
            margin-bottom: 100px; /* Adjust this value to control the separation */
        }

    .centered-div {
        position: absolute;
        top: 50%; /* Adjust this value to control the vertical position */
        left: 50%;
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        padding: 10px;
        text-align: center;
    }
</style>
