<!--Individual Section component which represents one section in the Seatmap-->
<script>
	import Seatmap from "./Seatmap.svelte";
	import Modal from "./Modal.svelte";

	export let sectionNumber = '';
	export let color = '';
    export let isInvisible = false;

	let isSeatsOverlayVisible = false;
	let showModal = false;

	const showSeatsOverlay = () => {
		isSeatsOverlayVisible = true;
	};

	const hideSeatsOverlay = () => {
		isSeatsOverlayVisible = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="section" on:click={() => (showModal = true)}>
	<strong>V map V nice</strong>
</div>

<Modal bind:showModal>
	<h2 slot="header" >
		<h2>test</h2>
	</h2>

	<!-- add ur element here -->
	<div></div>
</Modal>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex items-center justify-center w-16 h-16 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg {isInvisible ? "opacity-0" : "opacity-100"}"
	style="background-color: {color}"
	on:click={showSeatsOverlay}
>
	{isInvisible ? "" : sectionNumber}
</div>

<!--Toggles the seating map overlay when a section is clicked-->
{#if isSeatsOverlayVisible}
	<div
		class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50"
	>
		<div class="flex items-center justify-center bg-white p-4 w-3/4 h-3/4 relative">

			<!--This div is for testing purposes-->

			<button
				class="bg-red-500 text-white px-2 py-1 absolute top-2 right-2"
				on:click={hideSeatsOverlay}>Close</button
			>
		</div>
	</div>
{/if}

<style>
	.section{
        display: flex;
        align-items: center;
        justify-content: center;
	}
</style>
