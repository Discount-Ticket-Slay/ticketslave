<script>
	import Router from 'svelte-spa-router';
	import Login from './pages/Login.svelte';
	import Signup from './pages/Signup.svelte';
    import Home from './pages/Home.svelte';

	const routes = {
		'/': Home,
		'/signup': Signup,
		'/login': Login
	}
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->

<main>
	<Router {routes}/>
</main>