<!--
    Component that displays details of a single ticket
    Takes in 2 parameters:
    1. the single ticket
    2. the function to select the ticket itself, which is executed in TicketList.svelte
-->

<script>
	export let ticket;
	export let onSelect;

	function handleSelect() {
		onSelect(ticket);
	}
</script>

<div class="border p-2 m-2 w-1/4 flex justify-between bg-slate-400">
	<span class="font-semibold">{ticket.name} - {ticket.price}</span>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={handleSelect}>Select</button
	>
</div>
