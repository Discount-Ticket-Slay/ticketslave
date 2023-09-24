<script>
    import { Button } from "carbon-components-svelte";
    export let event;
</script>

<div class="header">
    <h5>{event.eventName}</h5>
    <h6>{event.startDateTime} | {event.venue}</h6>
    <br />
</div>

<div class="info-bar">
    <strong>Event Details</strong>
    <strong>Ticket Pricing</strong>
    <strong>Exchange & Refund Policy</strong>
    <strong>Admission Policy</strong>
    <Button href="/#/queue?id={event.eventId}">Queue for Tickets</Button>
</div>

{#each event.ticketCategories as cat}
    <div class="ticket">
        <strong>{cat.name}</strong>
        <p>{cat.price}</p>
    </div>
{/each}

<style>
    .header {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: center;
        justify-content: center;
        margin-top: 0.5rem;
    }
    .info-bar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: blanchedalmond;
        padding: 1rem;
        overflow: hidden;
    }

    .info-bar > strong {
        display: table-cell;
        vertical-align: middle;
    }

    .ticket {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        background-color: cornsilk;
        width: 20vw;
        height: 12.5vw;
        padding: 1rem;
        margin: 1rem;
    }
</style>
