<script>
	import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';
	import 'bootstrap/dist/js/bootstrap.js';
	import Jumbotron from './components/Jumbotron.svelte';
	import RadioButton from './components/RadioButton.svelte';
  import LoadingBar from './components/LoadingBar.svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->
<main>
	<Navbar />

	<RadioButton />

	<LoadingBar />

	<Jumbotron />

	<Footer />
</main>