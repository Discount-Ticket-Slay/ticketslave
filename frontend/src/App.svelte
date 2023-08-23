<script>
	import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';
	import 'bootstrap/dist/js/bootstrap.js';
	import Jumbotron from './components/Jumbotron.svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';

	main {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>

<!-- Rest of app content -->
<main>
	<Navbar />

	<Jumbotron />

	<Footer />
</main>