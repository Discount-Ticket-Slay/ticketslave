<script>
    // Importing Bootstrap CSS for styling
    import "bootstrap/dist/css/bootstrap.min.css";
    
    // Exporting 'event' as a prop to be passed to this component
    export let event;

</script>

<!-- Card component to display event details -->
<div class="card text-center">
    <!-- Link to the event details page, using the event ID -->
    <a href="/#/Event?id={event.eventId}" style="text-decoration: none;">
        <!-- Event image -->
        <img
            src="https://ticketslavestore.s3.ap-southeast-1.amazonaws.com/feed/images/concert.jpg"
            class="card-img-top"
            alt="No pic found"
            style="max-width: 100%;"
        />
        <!-- Card body containing the event title -->
        <div class="card-body">
            <h5 class="card-title">{event.eventName}</h5>
        </div>
    </a>
</div>

<style>
    /* Styling for the card */
    .card {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: 12rem;
        height: auto;
        cursor: pointer;
        display: inline-block;
        margin: 5vh;
    }

    /* Styling for the card body */
    .card-body {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: full;
        height: auto;
    }

    /* Styling for the card title */
    .card-title {
        width: full;
    }
</style>
