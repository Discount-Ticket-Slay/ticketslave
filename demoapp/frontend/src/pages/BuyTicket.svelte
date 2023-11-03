<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from "../components/Misc/ProgressTracker.svelte";
    import SeatSection from "../components/Ticketing/SeatSection.svelte";
    import { Button } from "carbon-components-svelte";
    import Seat from "../components/Ticketing/Ticket.svelte";
    import { onMount } from "svelte";

    // security measure to prevent unauthorized access (authenticate when page loads)
    let authenticated = false;
    import { changeRoute } from '../utils/routeUtils.js'; 

    onMount(() => {
        changeRoute('/#/buy-ticket', window.location.href);
        authenticated = true;
    });

    let buyingEvent = []; // MAKE PURCHASE POST REQUEST TO DB HERE

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
                    // `http://localhost:8080/events/${eventId}/get` // for local testing
                    `https://www.ticketslave.org/events/${eventId}/get` // for deployment
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

{#if event}
    <h3>{event.eventName}</h3>
{/if}

<ProgressTracker />

<div class="wrapper">
    <div class="section-available-seats">
        <h4>Available Seats:</h4>
    
        <div class="seat-options">
            {#if event && event.ticketCategories}
            {#each event.ticketCategories as cat}
                <SeatSection number={cat.ticketCategoryId} availability="Available" category={cat} purchasedTicketsArray={buyingEvent}/>
            {/each}
            {/if}
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
                    {#each cat.tickets as ticket}
                        {#if ticket}
                            <Seat {ticket} />
                        {/if}
                    {/each}
                {/if}
            {/each}
        {/if}
    </div>

</div>

<div class="checkout">
    <Button style="text-align:center;" href="/#/payment">Checkout</Button>
</div>



<style>
    h3 {
        margin: 3vh;
        text-align: center;
    }

    h4 {
        margin: 5%;
    }

    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .seat-options {
        display: flex;
        flex-direction: row;
        gap: 1em;
        justify-content: center;
    }

    .section-ticketing, .section-available-seats {
        display: flex;
        flex-direction: column;
        background-color: pink; /*pink used for debugging will change later*/
        align-items: center;
        margin: 3vh;
        padding: 3vh;
        border-radius: 0.5rem;
        width: 30vw;
        height: 48vw;
        overflow-y: scroll;
    }

    .checkout {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }
</style>
