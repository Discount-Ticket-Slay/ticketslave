<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte'
    import SeatSection from "../components/Ticketing/SeatSection.svelte";
    import {Button} from 'carbon-components-svelte'
    import Seat from "../components/Ticketing/Seat.svelte";

    // security measure to prevent unauthorized access (authenticate when page loads)
    let authenticated = false;
    import { onMount } from 'svelte';
    import { changeRoute } from '../utils/routeUtils.js'; 

    onMount(() => {
        changeRoute('/#/buy-ticket');
        authenticated = true;
    });

    let buyingEvent = [];

    //For now, this is an array of fake seat values to test components. Will be replaced with actual JSON data.
    //Used seat 233 of category 4
    let seats = [
        {
            id: 1,
            name: "Taylor Swift | The Eras Tour",
            number: 10000001,
            section: 233,
            rowChar: 'G',
            seatNo: "01",
            category: 4,
            price: "$208",
        },
        {
            id: 2,
            name: "Taylor Swift | The Eras Tour",
            number: 10000002,
            section: 233,
            rowChar: 'A',
            seatNo: "02",
            category: 4,
            price: "$208",
        },
        {
            id: 3,
            name: "Taylor Swift | The Eras Tour",
            number: 10000003,
            section: 233,
            rowChar: 'Y',
            seatNo: "03",
            category: 4,
            price: "$208",
        },
        {
            id: 4,
            name: "Taylor Swift | The Eras Tour",
            number: 10000004,
            section: 233,
            rowChar: 'B',
            seatNo: "13",
            category: 4,
            price: "$208",
        },
        {
            id: 5,
            name: "Taylor Swift | The Eras Tour",
            number: 10000005,
            section: 233,
            rowChar: 'C',
            seatNo: "21",
            category: 4,
            price: "$208",
        },
        {
            id: 6,
            name: "Taylor Swift | The Eras Tour",
            number: 10000006,
            section: 233,
            rowChar: 'D',
            seatNo: "06",
            category: 4,
            price: "$208",
        },
        {
            id: 7,
            name: "Taylor Swift | The Eras Tour",
            number: 10000007,
            section: 233,
            rowChar: 'E',
            seatNo: "24",
            category: 4,
            price: "$208",
        },
        {
            id: 8,
            name: "Taylor Swift | The Eras Tour",
            number: 10000008,
            section: 233,
            rowChar: 'F',
            seatNo: "01",
            category: 4,
            price: "$208",
        },
        {
            id: 9,
            name: "Taylor Swift | The Eras Tour",
            number: 10000009,
            section: 233,
            rowChar: 'H',
            seatNo: "41",
            category: 4,
            price: "$208",
        },
        {
            id: 10,
            name: "Taylor Swift | The Eras Tour",
            number: 10000010,
            section: 233,
            rowChar: 'K',
            seatNo: "69",
            category: 4,
            price: "$208",
        },
    ]

    // const handleClick = (event) => {
    //     alert("clicked")
    //     buyingEvent.push(event);
    // }

</script>

<Navbar />

<Button href="/#/payment">Go to: Payment</Button>

<h3>Taylor Swift | The Eras Tour</h3>

<ProgressTracker />

<div class="container"> 
	<h4>Available Seats:</h4>

    <div class="seat-options">
        <SeatSection number="227" availability="Available" category='1'/>
        <SeatSection number="229" availability="Unavailable" category="2"/>
        <SeatSection number="231" availability="Unavailable" category="3"/>
        <SeatSection number="233" availability="Available" category="4"/>
        <SeatSection number="235" availability="Available" category="5"/>
        <SeatSection number="237" availability="Unavailable" category="6"/>
        <SeatSection number="239" availability="Available" category="standing"/>
    </div>
</div>

<!--
    Generate a seat details component for every seat in seats array.
    additionally pass in the seat entity as a parameter to display respective values
-->
<div class="section-ticketing">
    {#each seats as seat}
        <Seat {seat}/>
    {/each}
</div>

<style>
	h3 {
		margin: 3vh;
		text-align: center;
	}

    h4 {
        margin: 5%;
    }

	.seat-options {
		display: flex;
		flex-direction: row;
		gap: 1em;
		justify-content: center;
	}

    .section-ticketing {
        display: flex;
        flex-direction: column;
        background-color: pink; /*pink used for debugging will change later*/
        align-items: center;
        margin: 3vh;
        padding: 3vh;
        border-radius: 0.5rem;
        height: 60vh;
        overflow-y: scroll;
    }
</style>

<!-- conditional rendering based on authentication status
{#if authenticated}
    <Navbar />
    {/* Rest of your component content */}
    <Button href="/#/payment">Go to: Payment</Button>
    {/* ... */}
{/if}

<style>
    /* Your styles */
</style> -->