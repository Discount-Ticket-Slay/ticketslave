<script>
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';
	import { onMount } from 'svelte';

	let cardNumber = '';
	let cardHolderName = '';
	let expirationDate = '';
	let cvv = '';

	function handleSubmit() {}

	let totalPrice = 0;

	// Function to calculate the totalPrice
	function calculateSubtotal() {
		totalPrice = cart.reduce((total, item) => total + item.price, 0);
	}

	onMount(calculateSubtotal); // Calculate totalPrice when the component mounts

	let cart = [
		{
			section: '233',
			rowChar: 'D',
			seatNo: '12',
			price: 208
		},
		{
			section: '233',
			rowChar: 'G',
			seatNo: '32',
			price: 208
		},
		{
			section: '324',
			rowChar: 'Q',
			seatNo: '99',
			price: 268
		}
	];
</script>

<Navbar />

<strong class="flex w-full justify-center mt-10">Event title goes here</strong>

<div class="flex flex-row justify-center mt-10 p-5">
	<!-- Credit card details -->
	<div class="flex flex-col w-2/4 bg-gray-200 p-2 rounded-md">
        <h2 class="text-lg font-semibold mb-3">Credit Card Details</h2>
		<div class="flex flex-col mb-5">
			<div class="flex items-center mb-2">
				<input
					id="default-radio-1"
					type="radio"
					value=""
					name="default-radio"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="default-radio-1"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PayPal</label
				>
			</div>
			<div class="flex items-center mb-2">
				<input
					checked
					id="default-radio-2"
					type="radio"
					value=""
					name="default-radio"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="default-radio-2"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apple Pay</label
				>
			</div>
			<div class="flex items-center">
				<input
					checked
					id="default-radio-2"
					type="radio"
					value=""
					name="default-radio"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="default-radio-2"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Google Pay</label
				>
			</div>
		</div>

		<form on:submit={handleSubmit}>
			<div class="mb-4 sm:mb-6">
				<label class="font-semibold" for="name">Name on Card</label>
				<input
					type="name"
					id="name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Name on card"
					required
				/>
			</div>
			<div class="mb-4 sm:mb-6">
				<label class="font-semibold" for="number">Card Number</label>
				<input
					type="number"
					id="number"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Card number"
					required
				/>
			</div>
			<div class="grid md:grid-cols-2 md:gap-6 gap-y-4">
				<div class="relative z-0 w-full mb-4 md:mb-6 group">
					<label class="font-semibold" for="exp">Expiry Date</label>
					<input
						type="exp"
						id="exp"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="MM/YY"
						required
					/>
				</div>
				<div class="relative z-0 w-full mb-4 md:mb-6 group">
					<label class="font-semibold" for="cvc">CVC/CVV</label>
					<input
						type="cvc"
						id="cvc"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="CVC"
						required
					/>
				</div>
			</div>

            <p class="font-light mt-1">By completing your purchase, you agree to the Terms of Service.</p>
            <button type="submit" class="bg-gray-600 text-white font-semibold rounded-lg py-2 px-4 mt-4">
                Complete Checkout
            </button>
		</form>
	</div>

	<!-- Order details -->
    <div class="flex flex-col w-1/2">
        <!-- Cart content -->
        <div class="bg-gray-200 ml-3 rounded-md p-3">
            <h2 class="text-lg font-semibold mb-3">Order Details</h2>
            {#each cart as item}
                <div class="flex flex-row justify-between mb-2">
                    <div class="flex flex-row space-x-4">
                        <div>Section: {item.section}</div>
                        <div>Seat: {item.rowChar}{item.seatNo}</div>
                    </div>
                    <strong class="text-green-600">${item.price}</strong>
                </div>
            {/each}
            <hr class="my-2 border-2 border-black">

            <!-- Price calculation -->
            <div class="flex flex-row justify-between">
                Total: <strong>${totalPrice}</strong>
            </div> 
        </div>
    </div>
</div>

<Footer />
