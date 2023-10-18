<script>
	import Navbar from '../../components/Navbar.svelte';
    import Footer from '../../components/Footer.svelte';
	import Searchbar from '../../components/others/Searchbar.svelte';

	let tickets = [
		{
			id: 1,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 2,
			name: 'Taylor Swift | The Eras Tour',
			number: 100002,
			section: 233,
			rowChar: 'A',
			seatNo: '02',
			category: 4,
			price: '$208'
		},
		{
			id: 3,
			name: 'Taylor Swift | The Eras Tour',
			number: 100003,
			section: 233,
			rowChar: 'Y',
			seatNo: '03',
			category: 4,
			price: '$208'
		},
		{
			id: 4,
			name: 'Taylor Swift | The Eras Tour',
			number: 100004,
			section: 233,
			rowChar: 'B',
			seatNo: '13',
			category: 4,
			price: '$208'
		},
		{
			id: 5,
			name: 'Taylor Swift | The Eras Tour',
			number: 100005,
			section: 233,
			rowChar: 'C',
			seatNo: '21',
			category: 4,
			price: '$208'
		},
		{
			id: 6,
			name: 'Taylor Swift | The Eras Tour',
			number: 100006,
			section: 233,
			rowChar: 'D',
			seatNo: '06',
			category: 4,
			price: '$208'
		},
		{
			id: 7,
			name: 'Taylor Swift | The Eras Tour',
			number: 100007,
			section: 233,
			rowChar: 'E',
			seatNo: '24',
			category: 4,
			price: '$208'
		},
		{
			id: 8,
			name: 'Taylor Swift | The Eras Tour',
			number: 100008,
			section: 233,
			rowChar: 'F',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 9,
			name: 'Taylor Swift | The Eras Tour',
			number: 100009,
			section: 233,
			rowChar: 'H',
			seatNo: '41',
			category: 4,
			price: '$208'
		},
		{
			id: 10,
			name: 'Taylor Swift | The Eras Tour',
			number: 100010,
			section: 233,
			rowChar: 'K',
			seatNo: '69',
			category: 4,
			price: '$208'
		},
		{
			id: 11,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 12,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 13,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 14,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 15,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 16,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
		{
			id: 17,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
        {
			id: 17,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
        {
			id: 17,
			name: 'Taylor Swift | The Eras Tour',
			number: 100001,
			section: 233,
			rowChar: 'G',
			seatNo: '01',
			category: 4,
			price: '$208'
		},
	];

	let seatSectionAndNumberStyle = 'text-2xl';

	const addToCart = () => {
		alert("add to cart");
	}
</script>

<Navbar />

<!-- Event Title and Search Bar -->
<div class="flex flex-col justify-center items-center space-y-5 m-12 md:m-16 lg:m-20 text-xl">
	<strong>Event Title Goes Here</strong>
	<Searchbar />
</div>

<!-- Ticket Listing -->
<div class="flex justify-center items-center h-screen m-12 md:m-16 lg:m-24 bg-slate-200 relative rounded-2xl overflow-y-auto">
    <p class="absolute top-5 left-5 font-semibold">Available Tickets</p>

    <!-- Display grid renders each ticket in an element -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 mx-auto h-full mt-28">
        {#each tickets as ticket}
            <!-- Single ticket element -->
            <div class="bg-white p-4 rounded-lg h-32 lg:h-40 relative cursor-pointer">
                <!-- Ticket Number -->
                <div />
                <div class="flex flex-row items-center overflow-hidden">
                    <div class="overflow-ellipsis">Ticket:&nbsp;</div>
                    <div>{ticket.number}</div>
                </div>

                <div class="flex flex-col justify-center mt-2">
                    <!-- Section and Seat Number -->
                    <div class="flex justify-around w-full sm:mt-0 lg:mt-5">
                        <div class={seatSectionAndNumberStyle}>
                            {ticket.section}
                        </div>
                        <div class={seatSectionAndNumberStyle}>
                            {ticket.rowChar}{ticket.seatNo}
                        </div>
                    </div>

                    <!-- Price -->
                    <div class="absolute bottom-2 right-2 italic">{ticket.price}</div>
                </div>
            </div>

        {/each}
    </div>
</div>


<Footer />
