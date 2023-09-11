<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte'
    import SeatSection from "../components/Ticketing/SeatSection.svelte";
    import {Button} from 'carbon-components-svelte'

    let buyingEvent = [];

    const handleClick = () => {
        alert("clicked")
        buyingEvent.push(event1);
    }
</script>

<Navbar />

<Button href="/#/payment">Go to: Payment</Button>

<h3>Taylor Swift | The Eras Tour</h3>

<ProgressTracker />

<div class="container">
	<h4>Available Seats:</h4>
	<div class="ticket-options">
        <SeatSection number="227" availability="Available" category='1'/>
        <SeatSection number="229" availability="Unavailable" category="2"/>
        <SeatSection number="231" availability="Unavailable" category="3"/>
        <SeatSection number="233" availability="Available" category="4"/>
        <SeatSection number="235" availability="Available" category="5"/>
        <SeatSection number="237" availability="Unavailable" category="6"/>
        <SeatSection number="239" availability="Available" category="standing"/>
	</div>
</div>

<div class="selection">
    Selected seat shows here
</div>

<style>
	h3 {
		margin: 3vh;
		text-align: center;
	}

    h4 {
        margin: 5%;
    }

	.ticket-options {
		display: flex;
		flex-direction: row;
		gap: 1em;
		justify-content: center;
	}

    .selection {
        background-color: #ebebeb;
        margin-top: 5%;
        height: 256px;
    }
</style>