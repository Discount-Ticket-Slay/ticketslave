<!--
    Component that displays all tickets that are currently inside the cart. 
    Takes in 2 parameters:
    1. the list of items currently inside the cart.
    2. the function to remove the ticket from the cart, which is executed inside the main page.
-->

<script>
	import CartItem from "./CartItem.svelte";

    export let cartItems;
    export let removeFromCart
</script>

<div class="p-4">
    <h2 class="text-lg font-semibold mb-2">Cart</h2>
    <ul class="grid gap-4 grid-cols-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
        <!--notifies the user if their cart is empty-->
        {#if cartItems.length === 0}
            <p>Your cart is empty {":("}.</p>
        {/if}

        <!--if there are items in the cart, display each item in a CartItem.svelte-->
        {#each cartItems as cartItem (cartItem.id)}
            <li>
                <CartItem {cartItem} onRemove={removeFromCart}/>
            </li>
        {/each}
    </ul>
</div>