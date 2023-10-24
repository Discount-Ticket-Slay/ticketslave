<script>
	import Navbar from '../components/Essentials/Navbar.svelte';
	import Footer from '../components/Essentials/Footer.svelte';
	import Seatmap from '../components/Ticketing/Seatmap.svelte';
	import Section from '../components/Ticketing/Section.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<Navbar />

	<!-- <Seatmap /> -->
    <div class="flex justify-center items-center mt-20 -rotate-30">
        <div class="grid grid-rows-3 grid-cols-3 gap-1 w-fit">
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080" isInvisible=true/>
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080"/>
            <Section sectionNumber="233" color="#008080" isInvisible=true/>
            <Section sectionNumber="233" color="#008080"/>
        </div>
    </div>

	<Footer />
</div>

<style>
</style>
