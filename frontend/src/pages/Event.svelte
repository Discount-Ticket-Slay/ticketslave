<script>
    import EventDetails from "../components/Events/EventDetails.svelte";
    import Navbar from "../components/Essentials/Navbar.svelte";
    import { onMount } from "svelte";

    let eventId = "";

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        eventId = urlParams.get("data") || "No data received";
    });

    let event = null
    async function fetchEvent() {
        try {
            const response = await fetch(`http://localhost:8080/${eventId}/get`)
            const event_data = await response.json()
            event = event_data
console.log(event)
        } catch {
            console.error(error)
        }
    }
</script>

<Navbar />

{#if event}
    <EventDetails {event} />
{/if}

<style>
</style>
