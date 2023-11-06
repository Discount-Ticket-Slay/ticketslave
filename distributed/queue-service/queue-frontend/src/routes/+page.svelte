<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import Footer from "../components/Essentials/Footer.svelte";
    import DinoGame from "../components/Game/DinoGame.svelte";
    import { Button } from "carbon-components-svelte";
    import { onMount } from 'svelte'
    import { page } from '$app/stores';

    let QueueNo;
    let authenticated = false; // security measure to prevent unauthorized access (authenticate when page loads)
    
    onMount(async () => {
        const unsubscribe = page.subscribe(($page) => {
        const urlParams = new URLSearchParams($page.url.search);
        QueueNo = urlParams.get('queueNumber') || 'Not Available'; // Fallback if queueNumber is not in the URL
    });
        return unsubscribe; // Unsubscribe when the component is destroyed
    });

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
