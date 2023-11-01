<!-- 
    Overlay component when a section is selected, which will display all available tickets belonging to that section.
-->

<script>
    export let section;
    export let closeOverlay;

    function close() {
        closeOverlay();
    }
</script>

<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Section: {section}</h2>
        <!-- Add content for the section overlay here -->
        <button class="bg-blue-500 text-white rounded-sm p-2" on:click={close}>Close</button>
    </div>
</div>
