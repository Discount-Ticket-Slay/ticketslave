<script>
    import Navbar from '../components/Essentials/Navbar.svelte';
    import Footer from '../components/Essentials/Footer.svelte';
	import EventCard from '../components/Events/EventCard.svelte';
    import { onMount } from "svelte";
    import { userId } from "../store/store.js";

    //event details for every event from json file will go here
    let events = [];
    let showUserIdComponent = false; // Used to control the display of the user ID component
    
    async function fetchData() {
        try {
            // Fetch event data
            const response = await fetch(
                "https://www.ticketslave.org/feed/events"
            );
            const json_data = await response.json();
            events = [];
            for (let i in json_data) {
                events.push(json_data[i]);
            }

            // Attempt to fetch userId as plain text
            const userIdResponse = await fetch("https://www.ticketslave.org/feed/email");
            console.log(userIdResponse);

            if (userIdResponse.ok) {
                const textData = await userIdResponse.text();
                console.log("textData: " + textData);

                // Set userId as text using set method on the store, not on $userId
                userId.set(textData);

                // The userId value is now set and can be used in the markup
                showUserIdComponent = true;
            } else {
                showUserIdComponent = false;
                console.error("Error fetching user ID:", userIdResponse.statusText);
            }
        }
        catch (error) {
            console.error(error);
            showUserIdComponent = false; // Do not show the component if any other error occurs
        }
    }

    onMount(fetchData);
    
</script>

<Navbar />

<div class="m-10 min-h-screen rounded-lg">
    
    {#if showUserIdComponent}
        <div class="email">{$userId}</div>
    {/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</div>

<Footer />

<style>
    .email{
        justify-content: center;
    }
</style>
