<!--EventDetailsOverlay.svelte-->

<!--
    * most parts of this page is styled in vanilla CSS.
    ? this could be because some of the tailwindcss styles i tried to use are deprecated, but i'm not sure which ones
-->

<script>
    export let event
    import {createEventDispatcher} from 'svelte'
    import {onMount} from "svelte"

    //the event dispatcher procs the event in the dispatch() function.
    //in this case, dispatching CLOSE here to EventCard.svelte, procs the event CLOSE in
    //<EventDetails {event} on:CLOSE={closeDetails}/>
    const dispatch = createEventDispatcher()

    function closeDetails() {
        dispatch("close")
    }

    /**
     * reditects the user to the queue
     */
    async function queueForTickets() {
        try {
            // Call backend to register user in the queue
            const userIdString = String(userId);
            console.log("Attempting to send userId:", userId);
            console.log("Type of userId:", typeof userId);
            
            // Send POST request to backend
            const response = await fetch("https://www.ticketslave.org/feed/queue", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userIdString })
            });

            console.log("Response:", response);

            // Check the status of the response
            if (response.status === 401) {
                // If the user is not authorized, redirect to the Cognito login page
                window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
            } else if (response.ok) {
                // Successful registration, redirect user to buffer service page to wait
                window.location.href = `https://www.ticketslave.org/buffer`;  // Pass userId as URL parameter
            } else {
                // Handle other responses or errors accordingly
                console.error('Failed to register in queue:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const ticketCategories = []
    
    // onMount(
    //     fetch(`https://www.ticketslave.org/purchase/ticketcategory`)
    //     .then(response => {
    //         if(!response.ok) {
    //             throw new Error("response is not ok")
    //         }
    //         return response.json()
    //     })
    //     .then(data => {
    //         //ticketcategory of an event takes in the eventId as an attribute
    //         for (let i in data) {
    //             if(data[i].eventId === event.eventId)
    //             ticketCategories.push(data[i]);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // )
</script>

<div class="background">
    <div class="overlay bg-white p-4 rounded-lg shadow-lg h-3/4 w-3/4 relative">
        <!-- Top right button, closes the overlay -->
        <button class="close-button" on:click={closeDetails}>Close</button>

        <!-- Displays all event information -->
        <h2 class="text-xl font-bold">{event.eventName}</h2>
        <p class="text-sm text-gray-600 font-semibold">{(event.startDateTime).slice(0,10)}</p>
        <p class="text-sm text-gray-600 font-semibold">{event.venue}</p>
        <p class="text-sm text-gray-600">{event.eventDescription}</p>
        <br>

        <!--Displays all ticket information-->
        <!-- <h2>Ticket Categories</h2> -->
        <!-- <div class="text-sm text-gray-600">{#each ticketCategories as category}
            <p>{category}</p>
        {/each}</div> -->

        <!-- Bottom right button, redirects the user to the buffer/queue -->
        <!-- * the click event takes in the userId and executes the queueForTickets function (not implemented) -->
        <button class="redirect-button" on:click={queueForTickets}>Buy Tickets</button>
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