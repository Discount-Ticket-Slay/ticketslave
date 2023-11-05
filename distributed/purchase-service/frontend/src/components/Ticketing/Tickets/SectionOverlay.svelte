<!-- 
    Overlay component when a selectedSection is selected, which will display all available tickets belonging to that selectedSection.
-->

<!--SectionOverlay.svelte-->
<script>
    export let selectedSection;
    export let concertTickets;
    export let addToCart;
    export let closeOverlay;

    import Ticket from './Ticket.svelte'

    //filter the tickets from that section
    let sectionTickets = concertTickets.filter(ticket => ticket.section === selectedSection)
</script>

<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded shadow w-3/5 h-3/5">
        <h2 class="text-xl font-semibold mb-4">Section: {selectedSection}</h2>
        {#each sectionTickets as ticket}
            <Ticket {ticket} onSelect={addToCart}/>
        {/each}
        <button class="bg-blue-500 text-white rounded-sm p-2" on:click={closeOverlay}>Close</button>
    </div>
</div>
