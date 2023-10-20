<script>
    import EventDetails from "../old-components/Events/EventDetails.svelte";
    import Navbar from "../old-components/Essentials/Navbar.svelte";
    import { onMount } from "svelte";

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

            const response = await fetch(`http://localhost:8080/events/${eventId}/get`);
            const event_data = await response.json();
            event = event_data;
            console.log(event); 

        }
    } catch {
            console.error(error)
        }
    }
    onMount(fetchEvent)
</script>

<Navbar />

{#if event}
    <EventDetails {event} />
{/if}