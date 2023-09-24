<script>
    import { Button } from "carbon-components-svelte";
    import Navbar from "../components/Essentials/Navbar.svelte";
    import EventCard from "../components/Events/EventCard.svelte";
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
            // console.log(eventList[0]);
        } catch (error) {
            console.error(error);
        }
    }
    onMount(fetchData);
</script>

<Navbar />
<Button kind="primary" href="/">Go to: Home</Button>
<div class="events">
    <h3>Popular Events</h3>
</div>

<!--this will eventually become the area where backend json_data is displayed-->

{#if eventList}
    {#each eventList as event}
        {#if event}
            <EventCard {event} />
        {/if}
    {/each}
{/if}

<!--this will eventually become the area where backend json_data is displayed-->

<style>
    @import url("https://fonts.googleapis.com/css2?family=Advent+Pro:wght@500&family=Pacifico&display=swap");
    .events {
        margin: 3%;
    }

    h3 {
        font-family: "Advent Pro", sans-serif;
    }
</style>
