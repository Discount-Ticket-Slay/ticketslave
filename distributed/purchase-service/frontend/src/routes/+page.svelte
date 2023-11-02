<!--
    TODO:
    when a Ticket is selected, the Ticket is added to the Cart.
    the Ticket's "Select" button in TicketList will be set to "In Cart", and become not clickable.
    when the Ticket is removed from the Cart, the Ticket's "In Cart" button is set back to "Select"
-->


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

    //removes the ticket from the cart
    function removeFromCart(item) {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    }

    // adds the selected ticket to the cart
    function addToCart(ticket) {
    // Check if the ticket is not already in the cartItems
        if (!cartItems.some((item) => item.id === ticket.id)) {
            cartItems = [...cartItems, ticket]; // Add the selected ticket to cartItems
        }
    }
</script>

<div>
    <Navbar />
    <div class="flex flex-row">
        <TicketList {concertTickets} {addToCart} {cartItems}/>
        <Cart {cartItems} {removeFromCart}/>
    </div>
    <Footer/>
</div>
