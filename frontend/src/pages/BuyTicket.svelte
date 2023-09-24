<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from "../components/Misc/ProgressTracker.svelte";
    import SeatSection from "../components/Ticketing/SeatSection.svelte";
    import { Button } from "carbon-components-svelte";
    import Seat from "../components/Ticketing/Seat.svelte";
    import { onMount } from "svelte";

    let buyingEvent = []; //MAKE PURCHASE POST REQUEST TO DB HERE

    let eventId = null;

    let event = null;
    async function fetchEvent() {
        try {
            const hash = window.location.hash;
            const paramsStart = hash.indexOf("?");

            if (paramsStart >= 0) {
                const paramString = hash.slice(paramsStart + 1);
                const urlParams = new URLSearchParams(paramString);

                let receivedId = urlParams.get("id");
                console.log(receivedId);

                if (receivedId) {
                    eventId = Number(receivedId);
                }

                const response = await fetch(
                    `http://localhost:8080/events/${eventId}/get`
                );
                const event_data = await response.json();
                event = event_data;
                console.log(event);
            }
        } catch {
            console.error(error);
        }
    }
    onMount(fetchEvent);
</script>

<Navbar />

<Button href="/#/payment">Go to: Payment</Button>

{#if event}
    <h3>{event.eventName}</h3>
{/if}

<ProgressTracker />

<div class="container">
    <h4>Available Seats:</h4>

    <div class="seat-options">
        <SeatSection number="227" availability="Available" category="1" />
        <SeatSection number="229" availability="Unavailable" category="2" />
        <SeatSection number="231" availability="Unavailable" category="3" />
        <SeatSection number="233" availability="Available" category="4" />
        <SeatSection number="235" availability="Available" category="5" />
        <SeatSection number="237" availability="Unavailable" category="6" />
        <SeatSection
            number="239"
            availability="Available"
            category="standing"
        />
    </div>
</div>

<!--
    Generate a seat details component for every seat in seats array.
    additionally pass in the seat entity as a parameter to display respective values
-->
<div class="section-ticketing">
    {#if event && event.ticketCategories}
        {#each event.ticketCategories as cat}
            {#if cat.tickets}
                {#each cat.tickets as seat}
                    <Seat {seat} />
                {/each}
            {/if}
        {/each}
    {/if}
</div>

<style>
    h3 {
        margin: 3vh;
        text-align: center;
    }

    h4 {
        margin: 5%;
    }

    .seat-options {
        display: flex;
        flex-direction: row;
        gap: 1em;
        justify-content: center;
    }

    .section-ticketing {
        display: flex;
        flex-direction: column;
        background-color: pink; /*pink used for debugging will change later*/
        align-items: center;
        margin: 3vh;
        padding: 3vh;
        border-radius: 0.5rem;
        height: 60vh;
        overflow-y: scroll;
    }
</style>
