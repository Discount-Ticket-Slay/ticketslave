<script>
    import {Button} from 'carbon-components-svelte'
</script>

<h5>Taylor Swift | The Eras Tour</h5>
<h6>March 2, 3, 4 & 7, 8, 9, 2024 | National Stadium</h6><br>

<div class="info-bar">
    <strong>Event Details</strong>
    <strong>Ticket Pricing</strong>
    <strong>Exchange & Refund Policy</strong>
    <strong>Admission Policy</strong>
    <Button href="/Buy Ticket">Buy Tickets</Button>
</div>

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