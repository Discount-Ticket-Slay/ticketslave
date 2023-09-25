<!--
    Individual ticket and ticket details component

    This component is used to display the details of an individual ticket
    Deatils included: 
    Seat number (char + 2 digit string)
    Ticket number

    Features to be added/updated:
    Additional styling
-->

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import { Button } from "carbon-components-svelte";

    export let ticket;

    const submitPurchase = () => {
        console.log(ticket.ticketId)
    }
</script>

{#if ticket}
    <div class="container">
        <div class="details">
            <div class="ticket">{`${ticket.rowChar}${ticket.seatNo}`}</div>
            <div class="category-wrapper">
                Category: <strong class="category">{ticket.ticketCategory}</strong>
            </div>
        </div>
        <Button on:click={submitPurchase}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="button-info">
                Buy <!--when this button is clicked, create a pull request that adds the ticket to the Purchase object -->
            </div>
        </Button>
    </div>
{:else}
    <div class="details">
        Cannot find ticket
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        background-color: #e1e1e1;
        margin: 0.35vw;
        padding: 1em;
        width: 100%;
        border-radius: 0.5rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        row-gap: 0.5em;
        padding-bottom: 1vw;
    }

    /* .title {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        color: #8f8f8f;
    } */

    .ticket {
        font-size: 1.5em;
        font-weight: bold;
    }

    /* .section {
        font-weight: bolder;
    } */

    .category-wrapper {
        margin-bottom: 0.5em;
    }

    .category {
        font-weight: bolder;
    }
</style>
