<!--
    Component that displays details of a single item currently in the cart
    Takes in 2 parameters:
    1. the ticket in the cart
    2. the function to remove the ticket itself fromthe cart, which is executed in Cart.svelte
-->

<!--CartItem.svelte-->
<script>
    export let cartItem;
    export let onRemove;

    function handleRemove() {
        onRemove(cartItem);
    }
</script>

<div class="border p-2 m-2 flex items-center justify-between space-x-4">
    <span class="font-semibold">{cartItem.name}</span>
    <span class="font-semibold">{cartItem.price}</span>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10" on:click={handleRemove}>Remove</button>
</div>