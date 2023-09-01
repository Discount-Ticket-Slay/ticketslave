<script>
    import {Button} from 'carbon-components-svelte'
</script>

<div class="card text-center">
	<img src="../images/concert-general.jpg" class="card-img-top" alt="No pic found" />
	<div class="card-body">
		<h5 class="card-title">Taylor Swift | The Eras Tour</h5>
	</div>
	<Button href='/Event'>Event Details</Button>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Amaranth&display=swap');

	.card {
		margin-left: 5%;
		font-family: 'Amaranth', sans-serif;
		width: 18rem;
	}

	.card-title {
		width: full;
	}
</style>
