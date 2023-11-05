<!--
    Component that displays all tickets that are currently inside the cart. 
    Takes in 2 parameters:
    1. the list of items currently inside the cart.
    2. the function to remove the ticket from the cart, which is executed inside the main page.
-->

<!--Cart.svelte-->
<script>
	import CartItem from "./CartItem.svelte";

    export let cartItems;
    export let removeFromCart;
</script>

<div class="min-h-screen px-8 py-10 w-full ">
    <h2 class="text-xl font-semibold mb-2">Cart ({cartItems.length})</h2>

    <hr class="my-4 border-t border-gray-300">

    {#if cartItems.length === 0}
        <p>Your cart is empty {":("}</p>
    {/if}

    <ul class="grid gap-4 grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
        <!--notifies the user if their cart is empty-->
        <div class="flex justify-between mb-5">
            <!--if there are items in the cart, display each item in a CartItem.svelte-->
            {#each cartItems as cartItem (cartItem.id)}
                <li>
                    <CartItem {cartItem} onRemove={removeFromCart}/>
                </li>
            {/each}
        </div>
    </ul>

    <div class="border-t mt-8">
        {#if cartItems.length === 0}
            <button class="bg-gray-600 font-semibold py-3 text-sm text-white w-full col-span-full h-10 rounded disabled" style="line-height: 12px;">
                Checkout
            </button>
        {:else}
            <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white w-full col-span-full h-10 rounded" style="line-height: 12px;">
                Checkout
            </button>
        {/if}
    </div>

    
</div>

<style>
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>