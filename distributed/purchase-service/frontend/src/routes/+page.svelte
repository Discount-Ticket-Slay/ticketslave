<script>
    import TicketList from '../components/Ticketing/Tickets/TicketList.svelte';
    import Cart from '../components/Ticketing/Cart/Cart.svelte';
    import Navbar from '../components/Essentials/Navbar.svelte'
    import Footer from '../components/Essentials/Footer.svelte'

	let concertTickets = [
		{ id: 1, name: 'Concert Ticket 1', price: '$50' },
		{ id: 2, name: 'Concert Ticket 2', price: '$40' },
		{ id: 3, name: 'Concert Ticket 3', price: '$60' }
	];

    let cartItems = []

	// Function to add tickets to the cart
	function addToCart(ticket) {
		cartItems = [...cartItems, ticket];
	}
</script>

<div>
    <Navbar />
    <TicketList tickets={concertTickets} {cartItems} {addToCart}/>
    <Cart {cartItems} />
    <Footer/>
</div>
