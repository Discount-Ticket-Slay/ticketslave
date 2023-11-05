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
		const response = await fetch("https://www.ticketslave.org/feed/events", {method: "GET"})
		if (response.ok) {
			const eventList = await response.json()
			eventList.forEach(event => {
				events.push(event)
			});
		} else {
			console.error(error)
		}
	})
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
