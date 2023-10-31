<script>
    import Ticket from "./Ticket.svelte";
	export let tickets;
    export let addToCart

    const handleSelect = (ticket) => {
        addToCart(ticket)
    }
</script>

<div class="p-4">
	<h2 class="text-lg font-semibold mb-2">Ticket List</h2>
	<ul class="grid gap-4 grid-cols-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
		{#each tickets as ticket (ticket.id)}
			<li>
				<Ticket {ticket} onSelect={handleSelect} />
			</li>
		{/each}
	</ul>
</div>
