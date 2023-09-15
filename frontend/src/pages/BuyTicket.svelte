<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import ProgressTracker from '../components/Misc/ProgressTracker.svelte';
    import {Button} from 'carbon-components-svelte';
    import Section from "../components/Ticketing/Section.svelte";
</script>

<Navbar />

<Button href="/#/payment">Go to: Payment</Button>

<h3>Taylor Swift | The Eras Tour</h3>

<ProgressTracker />

<div class="container"> 
	<h4>Available Seats:</h4>

	<div class="ticket-options">
        <Section cate="cat 1"/>
        <Section cate="cat 2"/>
        <Section cate="cat 3"/>
        <Section cate="cat 4"/>
        <Section cate="cat 5"/>
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