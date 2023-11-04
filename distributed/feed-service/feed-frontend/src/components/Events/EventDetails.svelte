<!--EventDetailsOverlay.svelte-->
<script>
    // export let event
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    function closeDetails() {
        dispatch("close")
    }
</script>

<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-lg shadow-lg h-3/4 w-3/4">
        hello world
        <button class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" on:click={closeDetails}>Close</button>
    </div>
</div>