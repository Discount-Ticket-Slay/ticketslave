<script>
	import Navbar from '../components/Navbar.svelte'
	import Footer from '../components/Footer.svelte'
</script>

<Navbar />

<Footer />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
