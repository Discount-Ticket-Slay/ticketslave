<script>
	import Router from 'svelte-spa-router';
	import Login from './old-pages/Login.svelte';
	import Signup from './old-pages/Signup.svelte';
    import Home from './old-pages/Home.svelte';
	import Feed from './old-pages/Feed.svelte';
	import Event from './old-pages/Event.svelte';
	import BuyTicket from './old-pages/BuyTicket.svelte';
	import Payment from './old-pages/Payment.svelte';
	import Queue from './old-pages/Queue.svelte';

	const routes = {
		'/': Home,
		'/signup': Signup,
		'/login': Login,
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