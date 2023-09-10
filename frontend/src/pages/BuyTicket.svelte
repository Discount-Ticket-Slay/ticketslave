<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte'
    import TicketButton from "../components/Ticketing/TicketButton.svelte";
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
        <TicketButton text="Cat 1 | Row 42 | Col 69" onClick={handleClick}/>
        <TicketButton text="Cat 1 | Row 42 | Col 69" onClick={handleClick}/>
        <TicketButton text="Cat 1 | Row 42 | Col 69" onClick={handleClick}/>
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