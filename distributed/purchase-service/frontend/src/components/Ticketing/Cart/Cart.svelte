<script>
    export let cartItems;
</script>

<div class="p-4">
    <h2 class="text-lg font-semibold mb-2">Cart</h2>
    <ul class="grid gap-4 grid-cols-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
        {#each cartItems as cartItem (cartItem.id)}
            <li>
                <div>{cartItem.name} - {cartItem.price}</div>
            </li>
        {/each}
    </ul>
</div>