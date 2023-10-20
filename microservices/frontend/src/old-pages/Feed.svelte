<script>
    import { Search } from "carbon-components-svelte";
    import Navbar from "../old-components/Essentials/Navbar.svelte";
    import EventCard from "../old-components/Events/EventCard.svelte";
    import { empty, onMount } from "svelte/internal";

    //event details for every event from json file will go here
    let eventList = null;
    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8080/events");
            const json_data = await response.json();
            eventList = [];
            for (let i in json_data) {
                eventList.push(json_data[i]);
            }
            console.log(eventList[0]);
        } catch (error) {
            console.error(error);
        }
    }
    onMount(fetchData);

</script>

<Navbar />
<div class="top-menu">
	<h3>Popular Events</h3>
	<div class="search-bar"><Search placeholder="Find an event..."/></div>
</div>
<div class="main">
	<div class="events">
        <!--this will eventually become the area where backend json_data is displayed-->

        {#if eventList}
            {#each eventList as event}
                {#if event}
                    <EventCard {event} />
                {/if}
            {/each}
        {/if}

        <!--this will eventually become the area where backend json_data is displayed-->
	</div>
</div>



<style>
    @import url("https://fonts.googleapis.com/css2?family=Advent+Pro:wght@500&family=Pacifico&display=swap");
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

	.search-bar {
		max-width: 50%;
	}

	h3 {
		font-family: 'Advent Pro', sans-serif;
	}
</style>