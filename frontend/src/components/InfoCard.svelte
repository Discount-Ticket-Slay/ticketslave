<!--
    Resuable card component that displays event and venue details
	edit styles where needed
-->

<script>
	import CoolButton from './CoolButton.svelte';

	const handleClick = () => {
		alert('greetings my dude');
	}; //for debugging
</script>

<div class="card">
	<img src="/images/hyunjin-stray-kids.jpg" class="card-img-top" alt="No image" />
	<div class="card-body">
		<h5 class="card-title">Card title</h5>
		<p class="card-text">This will become a reusable card component</p>
		<CoolButton text="Does Something" onClick={handleClick} />
	</div>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
	}

	.card {
		display: inline-block;
		background-color: bisque;
		padding: 1em;
		border-radius: 1em;
		width: 15em;
	}

	.card-img-top {
		max-width: 100%;
		object-fit: contain;
		border-radius: 1em;
	}
</style>
