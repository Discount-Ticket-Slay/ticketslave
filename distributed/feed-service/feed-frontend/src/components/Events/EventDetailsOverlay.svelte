<!--EventDetailsOverlay.svelte-->
<script>
    export let event
    import {createEventDispatcher} from 'svelte'

    //the event dispatcher procs the event in the dispatch() function.
    //in this case, dispatching CLOSE here to EventCard.svelte, procs the event CLOSE in
    //<EventDetails {event} on:CLOSE={closeDetails}/>
    const dispatch = createEventDispatcher()

    function closeDetails() {
        dispatch("close")
    }

    /**
     * reditects the user to the queue
     * *will be replaced by the function to move the user to the buffer service
     */
    function moveToQueue() {
        alert('redirect user to queue')
    }
</script>

<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-lg shadow-lg h-3/4 w-3/4 relative">
        <!--top right button, closes the overlay-->
        <button class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 absolute top-2 right-2" on:click={closeDetails}>Close</button>

        <!--displays all event information-->
        <h2 class="text-xl font-bold">{event.eventName}</h2>
        <p class="text-sm text-gray-600 font-semibold">{event.eventDate}</p>
        <p class="text-sm text-gray-600 font-semibold">{event.eventLocation}</p>
        <p class="text-sm text-gray-600">{event.eventDescription}</p>

        <!--bottom right button, redirects the user to the buffer/queue-->
        <button class="absolute bottom-2 right-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" on:click={moveToQueue}>Buy Tickets</button>
    </div>
</div>