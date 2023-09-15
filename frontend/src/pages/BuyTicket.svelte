<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
<<<<<<< HEAD
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte'
    import SeatSection from "../components/Ticketing/SeatSection.svelte";
    import {Button} from 'carbon-components-svelte'
    import Seat from "../components/Ticketing/Seat.svelte";

    let buyingEvent = [];

    // const handleClick = (event) => {
    //     alert("clicked")
    //     buyingEvent.push(event);
    // }

    const handleClick = () => {
        alert("clicked")
    }
=======
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte';
    import {Button} from 'carbon-components-svelte';
    import Section from "../components/Ticketing/Section.svelte";
>>>>>>> 2ddc02a039fe8bd29eaa708f9fe813223228a34a
</script>

<Navbar />

<Button href="/#/payment">Go to: Payment</Button>

<h3>Taylor Swift | The Eras Tour</h3>

<ProgressTracker />

<div class="container"> 
	<h4>Available Seats:</h4>

	<div class="ticket-options">
<<<<<<< HEAD
        <SeatSection number="227" availability="Available" category='1' onClick={handleClick}/>
        <SeatSection number="229" availability="Unavailable" category="2" onClick={handleClick}/>
        <SeatSection number="231" availability="Unavailable" category="3" onClick={handleClick}/>
        <SeatSection number="233" availability="Available" category="4" onClick={handleClick}/>
        <SeatSection number="235" availability="Available" category="5" onClick={handleClick}/>
        <SeatSection number="237" availability="Unavailable" category="6" onClick={handleClick}/>
        <SeatSection number="239" availability="Available" category="standing" onClick={handleClick}/>
=======
        <Section cate="cat 1"/>
        <Section cate="cat 2"/>
        <Section cate="cat 3"/>
        <Section cate="cat 4"/>
        <Section cate="cat 5"/>
>>>>>>> 2ddc02a039fe8bd29eaa708f9fe813223228a34a
	</div>

    <Seat />
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