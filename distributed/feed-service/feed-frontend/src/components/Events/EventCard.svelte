<!--EventCard.svelte-->

<script>
	import EventDetailsOverlay from "./EventDetailsOverlay.svelte";

    export let event

    //checks whether any EventCard is clicked on by the user.
    //if it was clicked, open the EventDetails as an overlay
    let isEventClicked = false

    //opens the EventDetails overlay
    function showDetails() {
        isEventClicked = true
    }

    //closes the EventDetails overlay
    function closeDetails() {
        isEventClicked = false
    }

</script>


<button class="p-4 rounded-lg border border-gray-300 shadow-lg h-32 md:h-40 lg:h-48 xl:h-64 cursor-pointer" on:click={showDetails}>
    <h2 class="text-xl font-semibold">{event.eventName}</h2>
    <p class="text-sm text-gray-600">{event.eventDate}</p>
    <p class="text-sm text-gray-600">{event.eventLocation}</p>
</button>

{#if isEventClicked}
    <div>
        <EventDetailsOverlay {event} on:close={closeDetails}/>
    </div>
{/if}