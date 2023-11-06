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
    let sectionTickets = concertTickets.filter(ticket => ticket.name === selectedSection)
</script>

<div class="backdrop z-50">
    <div class="overlay relative overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">Section: {selectedSection}</h2>
        {#each sectionTickets as ticket}
            <Ticket {ticket} onSelect={addToCart}/>
        {/each}
        <button class="close-button absolute top-0 right-0" on:click={closeOverlay}>Close</button>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .overlay {
        background-color: white;
        padding: 1rem;
        border-radius: 0.25rem;
        --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        width: 60%;
        height: 60%;
    }

    .close-button {
        background-color: cornflowerblue;
        color: white;
        border-radius: 0.125rem;
        padding: 0.5rem;
    }
</style>
