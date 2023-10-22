<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	import Home from './home.svelte'
	import Feed from './feed.svelte'
	import Buy from './Buy/+page.svelte'
	import Login from './Login/+page.svelte'
	import Faq from './Faq/+page.svelte'
	import Contact from './Contact/+page.svelte'

	// import Router from 'svelte-spa-router'

	const routes = {
		'/': Home,
		'/buy': Buy,
		'/feed': Feed,
		'/login': Login,
		'/faq': Faq,
		'/contact': Contact,
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