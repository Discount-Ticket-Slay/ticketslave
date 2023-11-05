<!--EventDetailsOverlay.svelte-->

<!--
    * most parts of this page is styled in vanilla CSS.
    ? this could be because some of the tailwindcss styles i tried to use are deprecated, but i'm not sure which ones
-->

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

<div class="background">
    <div class="overlay bg-white p-4 rounded-lg shadow-lg h-3/4 w-3/4 relative">
        <!-- Top right button, closes the overlay -->
        <button class="close-button" on:click={closeDetails}>Close</button>

        <!-- Displays all event information -->
        <h2 class="text-xl font-bold">{event.eventName}</h2>
        <p class="text-sm text-gray-600 font-semibold">{event.eventDate}</p>
        <p class="text-sm text-gray-600 font-semibold">{event.eventLocation}</p>
        <p class="text-sm text-gray-600">{event.eventDescription}</p>

        <!-- Bottom right button, redirects the user to the buffer/queue -->
        <button class="redirect-button" on:click={moveToQueue}>Buy Tickets</button>
    </div>
</div>

<style>
    .background {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
    }

    .overlay {
        background-color: white;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background-color: rgb(107 114 128); /*bg-gray-500*/
        color: white;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.5rem;
    }

    .close-button:hover {
        background-color: rgb(55 65 81); /*bg-gray-700*/
    }

    .redirect-button {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        background-color: rgb(59 130 246); /*bg-blue-500*/
        color: white;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0.5rem;
    }

    .redirect-button:hover {
        background-color: rgb(29 78 216); /*bg-blue-700*/
    }
</style>