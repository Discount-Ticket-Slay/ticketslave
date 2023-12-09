<!--
    Component that displays the list of concertTickets for that concert.
    Takes in 2 parameters:
    1. the list of concert tickets
    2. the function to add a ticket from this list to the cart, which is executed in the main page

    each ticket is displayed in a single Ticket.svelte
-->

<!--TicketList.svelte-->
<script>
    import SectionOverlay from "./SectionOverlay.svelte";
    export let concertTickets; // Array of concert tickets
    export let cartItems; // Array of items in the cart
    export let addToCart;

    let selectedSection = null;

    function openOverlay(section) {
console.log("hello")
        selectedSection = section;
    }

    function closeOverlay() {
        selectedSection = null;
    }

    // gets all unique sections from the concertTickets array
    function getSections() {
        const sections = [];
        concertTickets.forEach(ticket => {
            if (!sections.includes(ticket.name)) {
                sections.push(ticket.name);
            }
        });
        return sections;
    }
</script>

<div class="bg-white p-4 rounded shadow w-1/2 min-h-screen">
    <h2 class="text-xl font-semibold mb-4">All Sections</h2>
    <ul>
        {#each getSections() as section}
            <li>
                <button 
                    class="section-chip cursor-pointer rounded-sm p-2 w-1/2 m-3" 
                    on:click={() => openOverlay(section)}
                >
                    {section}
                </button>
            </li>
        {/each}
    </ul>
</div>

{#if selectedSection}
    <SectionOverlay {selectedSection} {concertTickets} {cartItems} {addToCart} {closeOverlay} />
{/if}

<style>
    .section-chip {
        background-color: rgb(21 94 117);
        color: gray;
    }
</style>
