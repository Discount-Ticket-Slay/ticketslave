<!--
    TODO: load actual events from database 
	TODO: styling where necessary
-->

<script>
    import Navbar from '../../components/Essentials/Navbar.svelte';
    import Footer from '../../components/Essentials/Footer.svelte';
	import EventCard from '../../components/Events/EventCard.svelte';
	import {onMount} from 'svelte'

	/**
     * array of event values.
     */
	let events = []
	onMount(async () => {
		await fetch("https://www.ticketslave.org/feed/events", {method: "GET", mode: "no-cors"})
		.then(response => {
			if(!response.ok) {
				throw new Error("Response failed")
			}
			return response.json()
		})
		.then(data => {
			try {
				const eventList = data.json();

				if (eventList) {
					eventList.forEach(event => {
						events.push(event)
					});
				}
		} catch(error) {
			console.error(error)
		}})
		.catch(error => {
			console.error(error)
		})
	})
	console.log(events)


	
</script>

<Navbar />

<div class="m-10 min-h-screen rounded-lg">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</div>

<Footer />
