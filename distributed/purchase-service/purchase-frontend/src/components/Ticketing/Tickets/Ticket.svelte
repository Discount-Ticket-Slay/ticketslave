<!--
    Component that displays details of a single ticket
    Takes in 2 parameters:
    1. the single ticket
    2. the function to select the ticket itself, which is executed in TicketList.svelte
-->

<!--Ticket.svelte-->
<script>
	export let ticket;
	export let onSelect;
	export let isInCart; //checks whether the ticket is in the cart

	/*
		if the ticket is still available, add it to the cart.
		sets the status of the ticket to "In Cart" and changes the button style accordingly
	*/
	function handleSelect() {
		isInCart = true;
		updateButton();
		onSelect(ticket);
	}

	//changes the button color and text to denote in cart status
	let buttonStyle = "bg-cyan-600 hover:bg-cyan-800 text-white"
	function updateButton() {
		buttonStyle = "bg-gray-300 text-black"
	}
</script>

<div class="border p-2 m-2 w-1/4 flex justify-between bg-slate-400">
	<span class="font-semibold">{ticket.name} - {ticket.price}</span>
	<button class="{buttonStyle} font-bold py-2 px-4 rounded" on:click={handleSelect}>
		{isInCart ? "In Cart" : "Select"}
	</button>
</div>
