<!--EventDetailsOverlay.svelte-->

<!--
    * most parts of this page is styled in vanilla CSS.
    ? this could be because some of the tailwindcss styles i tried to use are deprecated, but i'm not sure which ones
-->

<script>
    export let event;
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";
    import { userId } from "../../store/store.js";

    const dispatch = createEventDispatcher();

    function closeDetails() {
        dispatch("close");
    }

    async function queueForTickets() {
        try {
            // Use $userId to access the store's value directly
            const userIdString = $userId;
            console.log("Attempting to send userId:", userIdString);

            // Send POST request to backend
            const response = await fetch("https://www.ticketslave.org/feed/queue", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userIdString })
            });

            // Handle response
            if (response.status === 401) {
                // If the user is not authorized, redirect to the login page
                window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
            } else if (response.ok) {
                // Successful registration, redirect user to buffer service page
                window.location.href = `https://www.ticketslave.org/buffer`;
            } else {
                console.error('Failed to register in queue:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    let ticketCategories = [];
    let error = null;
    let isLoading = true;

    async function fetchData() {
        try {
            const response = await fetch(`https://www.ticketslave.org/purchase/ticketcategory`);
            const json_data = await response.json();

            ticketCategories = json_data.filter(category => category.eventId === event.eventId);
            isLoading = false;
        } catch (e) {
            error = e;
            isLoading = false;
        }
    }

    onMount(fetchData);
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
        <h2>Ticket Categories</h2>
        {#if error}
        <div class="error-message">
            <p>Error: {error.message}</p>
            <p>Please try again later.</p>
        </div>
        {/if}
         <div class="text-sm text-gray-600">  {#if isLoading}
            <!-- Display a loading message while data is being fetched -->
            <div class= "loading">
                <p>Loading...</p>
              </div>
          {:else if ticketCategories.length !== 0}
            <!-- Display the data once it's available -->
            {#each ticketCategories as category, index}
            <div class= "category">
              <p>Category {index+1}: </p>
              <p>{category.name}</p>
              <p>Price: ${category.price}</p>
            </div>
            {/each}
          {:else }
            <div class= "category">
                <p>No Categories Available Right Now. Check Back Soon!</p>
            </div>
          {/if}</div>

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

    .category {
        display: flex;
        flex-direction: row;
        padding: 0.5rem; 
        align-items: center;
        justify-content: center;
    }
    .category p {
        margin-right: 1rem; /* Adjust the value as needed to control the horizontal space */
        }

    .loading {
        flex-direction: row;
        display: flex;
        font-size: 1.5rem;
        line-height: 2rem;
        display: flex;
        padding: 0.5rem; 
        align-items: center;
        justify-content: center;
    }
</style>