<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import EventCard from "../components/Events/EventCard.svelte";
    import { onMount } from "svelte";
    import { userId } from "../store/store.js";

    //event details for every event from json file will go here
    let eventList = null;
    let showUserIdComponent = false; // Used to control the display of the user ID component

    async function fetchData() {
        try {
            // Fetch event data
            const response = await fetch(
                "https://www.ticketslave.org/feed/events"
            );
            const json_data = await response.json();
            eventList = [];
            for (let i in json_data) {
                eventList.push(json_data[i]);
            }

            // Attempt to fetch userId as plain text
            const userIdResponse = await fetch(
                "https://www.ticketslave.org/feed/email"
            );
            if (userIdResponse.ok) {
                const textData = await userIdResponse.text();
                // Set userId as text
                $userId = textData; 
                showUserIdComponent = true; // Show the component
            } else {
                // Handle non-OK response
                showUserIdComponent = false;
                console.error(
                    "Error fetching user ID:",
                    userIdResponse.statusText
                );
            }
        } catch (error) {
            console.error(error);
            showUserIdComponent = false; // Do not show the component if any other error occurs
        }
    }

    onMount(fetchData);
</script>

<Navbar />
<div class="events">
    <h3>Popular Events</h3>
    {#if showUserIdComponent}
        <p>Your user ID is: {$userId}</p>
    {/if}
</div>

<!--this will eventually become the area where backend json_data is displayed-->

<div class="main">
    {#if eventList}
        {#each eventList as event}
            {#if event}
                <EventCard {event} />
            {/if}
        {/each}
    {/if}
</div>

<!--this will eventually become the area where backend json_data is displayed-->

<style>
    .main {
        margin: 5vh;
        max-width: 52rem; /**12(3rem) + 4(5vh)*/
        max-height: 80vh;
        overflow-y: auto;
        background-color: #ccc;
        border-radius: 0.5rem;
    }

    .top-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 52rem;
        margin: 5vh;
    }

    /* .search-bar {
        max-width: 50%;
    } */

    h3 {
        font-family: "Advent Pro", sans-serif;
    }
</style>
