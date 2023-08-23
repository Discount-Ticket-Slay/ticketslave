<!--
    Reusable single button component, which comes in small, medium, and large sizes.
    Default size is medium.
-->


<script>
	export let text;
	export let onClick;
	export let size = 'medium';
</script>

<button class={`button ${size}`} on:click={onClick}>
	{text}
</button>

<style scoped>
	.button {
		padding: 1em 2em;
		background-color: #cbc3e3;
		color: #5f5f5f;
		border: none;
		cursor: pointer;
		border-radius: 0.8em;
		font-weight: bold;
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
	}

    .button:hover {
        background-color: #a598cc;
        box-shadow: 0 0.2em 0.2rem rgba(0,0,0,0.1);
    }

	.small {
        /*small button*/
		padding: 0.5em 1em;
		font-size: 0.8em;
	}

	.medium {
        /*medium button (default)*/
		font-size: 1em;
	}

	.large {
        /*large button*/
		padding: 1.5em 3em;
		font-size: 1.2em;
	}
</style>
