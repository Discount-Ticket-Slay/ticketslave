<script>
    import Ticket from './Ticket.svelte'
    export let sectionTickets

    const handleTicketSelection = (ticket) => {
        addToCart(ticket)
    }
</script>


<ul class="grid gap-4 grid-cols-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
    <!--notifies the user if there are no tickets available-->
    {#if sectionTickets.length === 0}
        <p>No tickets available {":("}</p>
    {/if}

    <!--otherwise, display each available ticket in a Ticket.svelte-->
    {#each sectionTickets as ticket (ticket.id)}
        <li>
            <Ticket {ticket} onSelect={handleTicketSelection} />
        </li>
    {/each}
</ul>