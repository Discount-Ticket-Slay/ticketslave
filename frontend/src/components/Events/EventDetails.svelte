<script>
    import {Button} from 'carbon-components-svelte'
    export let event
</script>

<h5>{event.name}</h5>
<h6>{event.startDateTime} | {event.venue}</h6><br>

<div class="info-bar">
    <strong>Event Details</strong>
    <strong>Ticket Pricing</strong>
    <strong>Exchange & Refund Policy</strong>
    <strong>Admission Policy</strong>
    <Button href="/#/queue">Queue for Tickets</Button>
</div>

<p>{event.description}</p>

<style>
    .info-bar {
        display: flex;
        justify-content: space-evenly;
        overflow: hidden;
    }

    .info-bar > strong {
        display: table-cell;
        vertical-align: middle;
    }
</style>