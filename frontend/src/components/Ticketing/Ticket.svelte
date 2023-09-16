<!--
    Individual seat and ticket details component

    This component is used to display the details of an individual seat
    Currently this component is completely static

    Features to be added/updated:
    Passing in ticket info as parameters
-->

<script>
    // export let section;
    import "bootstrap/dist/css/bootstrap.min.css"
    import { Button } from "carbon-components-svelte";
</script>

<div class="container">
    <div class="details">
        <div class="seat">A69</div>
        <div class="title">Taylor Swift | The Eras Tour</div>
        <div class="number">Ticket Number: <strong>4206969</strong></div>
        <div>Section: <strong class="section">233</strong></div>
        <div class="category-wrapper">Category: <strong class="category">4</strong></div>
    </div>
    <Button>
        <div class="button-info">
            Buy for $208
        </div>
    </Button>
</div>

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