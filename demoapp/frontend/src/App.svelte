<script>
	import Router from 'svelte-spa-router';
    import Home from './pages/Home.svelte';
	import Feed from './pages/Feed.svelte';
	import Event from './pages/Event.svelte';
	import BuyTicket from './pages/BuyTicket.svelte';
	import Payment from './pages/Payment.svelte';
	import Queue from './pages/Queue.svelte';

	const routes = {
		'/': Home,
		'/feed': Feed,
		'/event': Event,
		'/buy-ticket': BuyTicket,
		'/payment': Payment,
		'/queue': Queue
	}
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->

<main>
	<Router {routes}/>
</main>