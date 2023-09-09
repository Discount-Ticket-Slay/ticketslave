<script>
    import { Button } from "carbon-components-svelte";
    export let event;
</script>

<div class="card text-center">
    <img src={event.image} class="card-img-top" alt="No pic found" />
    <div class="card-body">
        <h5 class="card-title">{event.eventName}</h5>
        <p>{event.eventDescription}</p>
    </div>
    <Button href="/#/Event">Event Details</Button>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Amaranth&display=swap");

    .card {
        margin-left: 5%;
        font-family: "Amaranth", sans-serif;
        width: 18rem;
    }

    .card-title {
        width: full;
    }
</style>
