<!--
    Component that displays the list of concertTickets for that concert.
    Takes in 2 parameters:
    1. the list of concert tickets
    2. the function to add a ticket from this list to the cart, which is executed in the main page

    each ticket is displayed in a single Ticket.svelte
-->

<script>
    import TicketSection from "./TicketSection.svelte";
	export let concertTickets;
    export let addToCart

    //tracks the section selected by the user
    let selectedSection = null;

    //sets selected section to the section selected by the user
    function pickSection(section) {
        selectedSection = section;
    }

    //stores the tickets belonging to the section selected
    let sections = []
    let sectionTickets = []
    $: {
        sections = Array.from(new Set(concertTickets.map(ticket => ticket.section)))
        sectionTickets = concertTickets.filter(ticket => ticket.section === selectedSection)
    }
</script>

<div class="p-4">
	<h2 class="text-lg font-semibold mb-2">Section List</h2>
    {#if sections.length !== 0}
        <TicketSection {sectionTickets} on:click={pickSection}/>
    {/if}
</div>
