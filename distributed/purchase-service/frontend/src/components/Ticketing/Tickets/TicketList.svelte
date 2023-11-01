<!--
    Component that displays the list of concertTickets for that concert.
    Takes in 2 parameters:
    1. the list of concert tickets
    2. the function to add a ticket from this list to the cart, which is executed in the main page

    each ticket is displayed in a single Ticket.svelte
-->

<!--
    TODO:
    combine the ticket listing with the section logic:
    each SectionOverlay will display the list of tickets belonging to that section.
    those tickets can be added to the cart.
-->

<script>
    import SectionOverlay from "./SectionOverlay.svelte";
    export let concertTickets; // Array of concert tickets
    export let cartItems; // Array of items in the cart
    export let addToCart; // Function to add a ticket to the cart

    let selectedSection = null;

    function openOverlay(section) {
        selectedSection = section;
    }

    function closeOverlay() {
        selectedSection = null;
    }

    // Function to get all unique sections from the concertTickets array
    function getSections() {
        const sections = [];
        concertTickets.forEach(ticket => {
            if (!sections.includes(ticket.section)) {
                sections.push(ticket.section);
            }
        });
        return sections;
    }

        // Function to handle section click
        function sectionClicked(section) {
        const sectionTickets = concertTickets.filter(ticket => ticket.section === section);
    }
</script>

<div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">All Sections</h2>
    <ul>
        {#each getSections() as section}
            <li>
                <button class="cursor-pointer bg-blue-400 text-white rounded-sm p-2 w-full" on:click={() => openOverlay(section)}>{section}</button>

            </li>
        {/each}
    </ul>
</div>

{#if selectedSection !== null}
    <SectionOverlay section={selectedSection} {closeOverlay} />
{/if}

