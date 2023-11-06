<!--
    TODO: the checkout button should route the user to the payment service

    TODO: the In Cart status is not working properly (styling)
    TODO: the navbar and page styling seems to conflict with each other
    ? could be deprecated styles again

    TODO: fix Cart styling
-->

<!--Cart.svelte-->
<script>
	import CartItem from "./CartItem.svelte";

    export let cartItems;
    export let removeFromCart;
    import { userId } from "../../routes/store/store.js";

    async function checkoutOrder() {
        /**
         * this method will contain the logic to send the cart as a purchase object to the backend
        */
        try {
            // Attempt to fetch userId as plain text
            const userIdResponse = await fetch(
                "https://www.ticketslave.org/feed/email"
            );
            if (userIdResponse.ok) {
                const textData = await userIdResponse.text();
                // Set userId as text
                $userId = textData; 
            } else {
                console.error(
                    "Error fetching user ID:",
                    userIdResponse.statusText
                );
            }

            let purchase = fetch(`https://www.ticketslave.org/purchase/purchases/${userId}`)
            const purchaseId = purchase.PurchaseId
    
            const response = await fetch("https://www.ticketslave.org/payment", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({purchaseId})
            })

            if(response.status === 401) {
                window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
            } else if(response.ok) {
                window.location.href = `https://www.ticketslave.org/payment`;
            } else {
                throw new Error("failed to connect to backend", response.statusText)
            }
        } catch(error) {
            console.error("something went wrong: ", error)
        }
    }
</script>

<div class="min-h-screen px-8 py-10 w-full ">
    <h2 class="text-xl font-semibold mb-2">Cart ({cartItems.length})</h2>

    <hr class="my-4 border-t border-gray-300">

    {#if cartItems.length === 0}
        <p>Your cart is empty {":("}</p>
    {/if}

    <ul class="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!--notifies the user if their cart is empty-->
        <div class="flex justify-between mb-5">
            <!--if there are items in the cart, display each item in a CartItem.svelte-->
            {#each cartItems as cartItem (cartItem.ticketId)}
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
            <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 cursor-pointer py-3 text-sm text-white w-full col-span-full h-10 rounded" style="line-height: 12px;"
            on:click={checkoutOrder}>
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