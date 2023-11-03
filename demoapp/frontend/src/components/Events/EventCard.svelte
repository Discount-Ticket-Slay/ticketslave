<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    export let event;
console.log(event.eventId)
</script>

<div class="card text-center">
    <a href="/#/Event?id={event.eventId}" style="text-decoration: none;">
        <img
            src="public/images/concert.jpg"
            class="card-img-top"
            alt="No pic found"
            style="max-width: 100%;"
        />
        <div class="card-body">
            <h5 class="card-title">{event.eventName}</h5>
        </div>
    </a>
</div>

<style>
    .card {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: 12rem;
        height: auto;
        cursor: pointer;
        display: inline-block;
        margin: 5vh;
    }

    .card-body {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: full;
        height: auto;
    }

    .card-title {
        width: full;
    }
</style>
