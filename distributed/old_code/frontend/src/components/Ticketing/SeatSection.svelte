<!--
    Configurable section component

    the component takes in 4 parameters:
    1) section number as a string
    2) category as a string, from 1-7 and standing
    3) availability as a string: "Available" indicates available, anything else indicates unavailable (for now)
    4) a click handler as a function, which can be implemented in the file this component is called in

    returns a (currently) rectangular clickable field

    Features/Updates to be added:
    Display seat info below
    Custom shape styling
    Color choice optimization
-->

<script>
    import Modal from "./Modal.svelte";
    import Chair from "./Chair.svelte";
    import {onMount} from "svelte/internal";

    export let number;
    export let category;
    // export let availability;
    export let width = 5; //int for the width of the area
    export let purchasedTicketsArray

// tickets.forEach(ticket => {
//     console.log(ticket.ticketId)
// });

    //dont open overlay first
    let showModal = false;

let availability = "Available";

    //If fully booked, the section will be faded out
    let opacity = availability === "Available" ? "1" : "0.45";

    //If fully booked, the section will not be clickable
    let cursor = availability === "Available" ? "pointer" : "default";
    let clickable = availability === "Available" ? "auto" : "none";

    //Colors corresponding to the seat category
    let bg = "";
    switch (category.ticketCategoryId) {
        case "standing":
            bg = "#f6c2f3";
            break;
        case "1":
            bg = "#ff9aa2";
            break;
        case "2":
            bg = "#ffb7b2";
            break;
        case "3":
            bg = "#F6CA94";
            break;
        case "4":
            bg = "#e20fcb";
            break;
        case "5":
            bg = "#b5ead7";
            break;
        case "6":
            bg = "#c7ceea";
            break;
        default: //this handles cat 7 as well for now
            bg = "#964b00";
    }

    let style = `
        opacity: ${opacity};
        cursor: ${cursor};
        background-color: ${bg};
        pointer-events: ${clickable};
        `;
    
    const updatePurchasedArray = () => {
        
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="section" {style} on:click={() => (showModal = true)} on:close={updatePurchasedArray}>
    <strong>Section&nbsp;{number}</strong>
</div>

<Modal bind:showModal>
    <h2 slot="header">
        <h2>Category : {category.ticketCategoryId}</h2>

        <div class="Stage"><h3>Stage</h3></div>

        <div
            class="seatMap"
            style="grid-template-columns: repeat({width}, 1em)"
        >
            <!-- put seat plan per cat here -->
            {#each category.tickets as ticket}
                {#if ticket}
                    <Chair {ticket} {purchasedTicketsArray}/>
                {/if}
            {/each}
        </div>
    </h2>
</Modal>

<style>
    .section {
        color: white;
        padding: 0.5em;
        width: 16vh;
        height: 10vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section:hover {
        box-shadow: 0px 0px 10px 3px #999;
        transition: box-shadow 0.45s ease-in-out;
    }

    .seatMap {
        display: grid;
        grid-template-columns: repeat(auto-fit, 1em);

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .Stage {
        width: 100%;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
</style>
