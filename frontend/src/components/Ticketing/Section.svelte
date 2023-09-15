<script>

    export let cate = "test";

	import Modal from './Modal.svelte';
    import SeatSection from './SeatSection.svelte';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}> {cate} </button>

<Modal bind:showModal>
	<h2 slot="header">
		<h2>Category : {cate}</h2>
		

        <div class="ticket-options">
            <SeatSection number="227" availability="Available" category='1'/>
            <SeatSection number="229" availability="Unavailable" category="2"/>
            <SeatSection number="231" availability="Unavailable" category="3"/>
            <SeatSection number="233" availability="Available" category="4"/>
            <SeatSection number="235" availability="Available" category="5"/>
            <SeatSection number="237" availability="Unavailable" category="6"/>
            <SeatSection number="239" availability="Available" category="standing"/>
        </div>
	</h2>
</Modal>

<style> 
.ticket-options {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: center;
}
</style>