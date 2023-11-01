<script>
    import TicketList from '../components/Ticketing/Tickets/TicketList.svelte';
    import Cart from '../components/Ticketing/Cart/Cart.svelte';
    import Navbar from '../components/Essentials/Navbar.svelte'
    import Footer from '../components/Essentials/Footer.svelte'

    //dummy array to store concert tickets. will be replaced with GET request during frontend-backend merge
	let concertTickets = [
		{ id: 1, name: 'Concert Ticket 1', price: '$50', section: "221" },
		{ id: 2, name: 'Concert Ticket 2', price: '$40', section: "223"},
		{ id: 3, name: 'Concert Ticket 3', price: '$60', section: "221" },
        { id: 4, name: 'Concert Ticket 3', price: '$60', section: "223"}
	];

    //stores the tickets that are in the cart
    let cartItems = []

	//adds the selected ticket to the cart
	function addToCart(ticket) {
		cartItems = [...cartItems, ticket];
	}

    //removes the ticket from the cart
    function removeFromCart(item) {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    }
</script>

<div>
    <Navbar />
    <TicketList {concertTickets} {cartItems} {addToCart}/>
    <Cart {cartItems} {removeFromCart}/>
    <Footer/>
</div>
