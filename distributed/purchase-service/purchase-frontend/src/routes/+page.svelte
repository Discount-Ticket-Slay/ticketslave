<!--
    TODO:
    -> create a ready-to-go function that stores the cart to be sent to the payment service
    -> improve styling, fix styling errors
-->

<script>
	import TicketList from '../components/Ticketing/Tickets/TicketList.svelte';
	import Cart from '../components/Ticketing/Cart/Cart.svelte';
	import Navbar from '../components/Essentials/Navbar.svelte';
	import Footer from '../components/Essentials/Footer.svelte';
	import { onMount } from 'svelte';
	import { userId } from "../store/store.js";

	//dummy array to store concert tickets. will be replaced with GET request during frontend-backend merge
	let concertTickets = [];

	let buyingEvent = []; // MAKE PURCHASE POST REQUEST TO DB HERE

	let eventId = null;

	let isLoading = true;

	async function fetchData() {
		try {
			// Attempt to fetch userId as plain text
            const userIdResponse = await fetch(
                "https://www.ticketslave.org/feed/email"
            );
            if (userIdResponse.ok) {
                const textData = await userIdResponse.text();
                // Set userId as text
                $userId = textData; 
                showUserIdComponent = true; // Show the component
            } else {
                // Handle non-OK response
                showUserIdComponent = false;
                console.error(
                    "Error fetching user ID:",
                    userIdResponse.statusText
                );
            }

			const response = await fetch(`https://www.ticketslave.org/purchase/ticketcategory`);
			const json_data = await response.json();
			for (let i in json_data) {
				if (json_data[i].eventId === 1){
					// json_data[i][1].price = json_data[i].price
					console.log(json_data[i].tickets);
                    for (let j in json_data[i].tickets) {
                        //add price to the ticket itself
                        json_data[i].tickets[j].price = json_data[i].price;
                        json_data[i].tickets[j].name = json_data[i].name;
                        concertTickets.push(json_data[i].tickets[j]);
                        console.log(json_data[i].tickets[j]);
                    }
                }
				// concertTickets.push(json_data[i][1]);
			}
			console.log(concertTickets);
			isLoading = false; // Data is loaded, set loading state to false
		} catch (error) {
			console.error(error);
		}
	}

	onMount(fetchData);

	//stores the tickets that are in the cart
	let cartItems = [];

	// adds the selected ticket to the cart
	function addToCart(ticket) {
		// Check if the ticket is not already in the cartItems
		if (!cartItems.some((item) => item.ticketId === ticket.ticketId)) {
			cartItems = [...cartItems, ticket]; // Add the selected ticket to cartItems
		}
	}

	//removes the ticket from the cart
	function removeFromCart(item) {
		cartItems = cartItems.filter((cartItem) => cartItem.ticketId !== item.ticketId);
	}
</script>

<Navbar />
	{#if isLoading}
		<!-- Display a loading message while data is being fetched -->
		<div class="loading">
			<p>Loading...</p>
		</div>
	{:else if concertTickets.length !== 0}
		<!-- Display the data once it's available -->
		<div class="flex flex-row">
			<TicketList {concertTickets} {addToCart} {cartItems} />

			<div class="w-1/2">
				<Cart {cartItems} {removeFromCart} />
			</div>
		</div>
	{:else}
		<div class="category">
			<p>No Categories Available Right Now. Check Back Soon!</p>
		</div>
	{/if}
<Footer />


<style>
</style>
