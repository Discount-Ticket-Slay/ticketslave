<script>
    import { Button } from "carbon-components-svelte";
    export let event;
</script>

<div class="card" style="border-radius: 1vh;">
    <img
        src="public/images/concert.jpg"
        class="card-img-top"
        alt="No pic found"
        style="max-width: 100%;"
    />
    <div class="card-body">
        <h5 class="card-title">{event.eventName}</h5>
        <p>{event.eventDescription}</p>
        <Button href="/#/Event" style="min-width: 100%;">Event Details</Button>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Amaranth&display=swap");
    .card {
        font-family: "Amaranth", sans-serif;
        max-width: 18rem;
        margin: 1vh;
    }

    .card-body {
        font-family: "Amaranth", sans-serif;
    }

    .card-title {
        width: full;
    }
</style>
