<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	import Home from './home.svelte'
	import Feed from './feed.svelte'
	import Buy from './buy.svelte'
	import Login from './login.svelte'
	import Faq from './faq.svelte'

	// import Router from 'svelte-spa-router'

	const routes = {
		'/': Home,
		'/buy': Buy,
		'/feed': Feed,
		'/login': Login,
		'/faq': Faq
	};
</script>

<!-- <body>
    <Router {routes}/>
</body> -->

<Login />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
