<script>
    import EventDetails from "../components/Events/EventDetails.svelte";
    import Navbar from "../components/Essentials/Navbar.svelte";
    import { onMount } from "svelte";

    let event = null;

    async function fetchEvent() {
        try {
            const hash = window.location.hash;
            const paramsStart = hash.indexOf('?');

            if (paramsStart >= 0) {
                const paramString = hash.slice(paramsStart + 1);
                const urlParams = new URLSearchParams(paramString);

                const eventId = urlParams.get("id");

                if (eventId) {
                    const response = await fetch(`https://www.ticketslave.org/feed/events/${eventId}/get`); // for deployment
                    if (response.ok) {
                        const event_data = await response.json();
                        event = event_data;
                        console.log(event);
                    } else {
                        console.error("Failed to fetch event data");
                    }
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    onMount(fetchEvent);
</script>

<Navbar />

{#if event}
    <EventDetails {event} />
{/if}