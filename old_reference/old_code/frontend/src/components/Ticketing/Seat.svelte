<!--
    Individual seat and seat details component

    This component is used to display the details of an individual seat
    Deatils included: 
    Seat number (char + 2 digit string)
    Concert name
    Ticket number
    Section
    Category
    Price

    For now, refer to the 'seats' array in BuyTicket.svelte for dummy seat values

    Features to be added/updated:
-->

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import { Button } from "carbon-components-svelte";

    export let seat;
</script>

{#if seat}
    <div class="container">
        <div class="details">
            <div class="seat">{`${seat.rowChar}${seat.seatNo}`}</div>
            <!-- <div class="title">{seat.name}</div> -->
            <!-- <div class="number">
                seat Number: <strong>{seat.number}</strong>
            </div> -->
            <!-- <div>Section: <strong class="section">{seat.section}</strong></div> -->
            <div class="category-wrapper">
                Category: <strong class="category">{seat.ticketCategory}</strong>
            </div>
        </div>
        <Button>
            <div class="button-info">
                Buy
            </div>
        </Button>
    </div>
{:else}
    <div class="details">
        Cannot find seat
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        background-color: #e1e1e1;
        margin: 0.35vw;
        padding: 1em;
        width: 48vw;
        border-radius: 0.5rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        row-gap: 0.5em;
        padding-bottom: 1vw;
    }

    .title {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        color: #8f8f8f;
    }

    .seat {
        font-size: 1.5em;
        font-weight: bold;
    }

    .section {
        font-weight: bolder;
    }

    .category-wrapper {
        margin-bottom: 0.5em;
    }

    .category {
        font-weight: bolder;
    }
</style>
