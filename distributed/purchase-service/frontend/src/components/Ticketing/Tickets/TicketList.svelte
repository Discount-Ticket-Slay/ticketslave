<!--
    Component that displays the list of concertTickets for that concert.
    Takes in 2 parameters:
    1. the list of concert tickets
    2. the function to add a ticket from this list to the cart, which is executed in the main page

    each ticket is displayed in a single Ticket.svelte
-->

<script>
    import Ticket from "./Ticket.svelte";
	export let concertTickets;
    export let addToCart

    const handleSelect = (ticket) => {
        addToCart(ticket)
    }
</script>

<div class="p-4">
	<h2 class="text-lg font-semibold mb-2">Ticket List</h2>
	<ul class="grid gap-4 grid-cols-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
        <!--notifies the user if there are no tickets available-->
        {#if concertTickets.length === 0}
            <p>No tickets available {":("}</p>
        {/if}

        <!--otherwise, display each available ticket in a Ticket.svelte-->
		{#each concertTickets as ticket (ticket.id)}
			<li>
				<Ticket {ticket} onSelect={handleSelect} />
			</li>
		{/each}
	</ul>
</div>
