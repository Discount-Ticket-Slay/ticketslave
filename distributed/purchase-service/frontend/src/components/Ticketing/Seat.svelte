<!-- 
    Individual Seat component
-->

<script>
	//checks and sets whether a seat is available
	let isAvailable = true;
	const toggleAvailability = () => {
		isAvailable = !isAvailable;
	};

	//checks whether a seat is reserved
	let isReserved = false;
	//stores a message that displays the reservability(?) of a seat to the user
	let reservationNotice = '';
	//triggers on click of the Reserve/Reserved button
	const toggleReservationStatus = (event) => {
		//stopPropagation prevents inner button from triggering the outer button
		event.stopPropagation();
		//toggles the reservation status of an available seat and alerts the user of change
		if (isAvailable) {
			isReserved = !isReserved;
			reservationNotice = isReserved ? 'Seat has been reserved.' : 'Seat is now available.';
		} else {
			//the user cannot reserve an unavailable seat
			reservationNotice = 'Seat is not available for reservation.';
		}
	};
</script>

<!-- inside the class of this tag, the double ternary sets the button color based on availability and reservation status:
        available: green
        reserved: amber
        not available: red
-->
<button
	class="flex flex-row justify-between items-center {isReserved
		? 'bg-amber-500'
		: isAvailable ? 'bg-green-400' : 'bg-red-500'} 
    transition-colors duration-200 ease-in text-white p-4 m-2 w-1/5 rounded-md cursor-pointer"
	on:click={toggleAvailability}
>
	{isReserved ? 'Reserved' : isAvailable ? 'Available' : 'Not Available'}
	<button
		class="bg-gray-500 text-black p-2 rounded-md"
		on:click|stopPropagation={toggleReservationStatus}
	>
		{isReserved ? 'Reserved' : 'Reserve'}
	</button>
</button>

<!--reservation status will not be displayed if it is cleared-->
{#if reservationNotice}
	<div class="text-red-500 text-sm mt-2">{reservationNotice}</div>
{/if}
