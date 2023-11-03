<script>
	import Router from 'svelte-spa-router';
    import Home from './pages/Home.svelte';
	import Feed from './pages/Feed.svelte';
	import Event from './pages/Event.svelte';

	const routes = {
		'/': Home,
		'/feed': Feed,
		'/event': Event
	}
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->

<main>
	<Router {routes}/>
</main>