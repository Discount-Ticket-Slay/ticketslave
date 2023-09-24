<script>
    import EventDetails from "../components/Events/EventDetails.svelte";
    import Navbar from "../components/Essentials/Navbar.svelte";
    import { onMount } from "svelte";

    let eventId = null;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.toString)
        let receivedId = urlParams.get("id");
console.log(receivedId)
        if(receivedId) {
            eventId = Number(receivedId)
        }
console.log(eventId)
    });

    let event = null
    async function fetchEvent() {
        try {
            const response = await fetch(`http://localhost:8080/events/${eventId}/get`)
            const event_data = await response.json()
            event = event_data
console.log(event)
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


