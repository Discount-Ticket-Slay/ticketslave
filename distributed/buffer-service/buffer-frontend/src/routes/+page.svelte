<script>
	import { onMount } from 'svelte';
	import Navbar from '../components/Essentials/Navbar.svelte';
	import Footer from '../components/Essentials/Footer.svelte';

	// onMount(() => {
	//   console.log(window);
	// });

	/**
	 * TODO: implement the get userID (API calls, copy paste from Waiting.svelte)
	 * TODO: implement function to check admin status which is another API call which returns whether a user is an admin. if is admin, the randomizer will appear
	 * TODO: all are triggered asynchronously onMount

	 * TODO: add the websockets functions (just copy paste)
	 * ? find out about the functions if needed
	 * * USE THE EXACT WEBSOCKET, IF NOT THE FUNCTION WILL FAIL
	*/

	/**
	 * @type {any}
	 */
	let userId;

	if (typeof window !== 'undefined') {
		// Temporarily get userId from query string
		let userId = new URLSearchParams(window.location.search).get('userId');

		onMount(() => {
			const socket = new WebSocket(`ws://localhost:8082/buffer-updates?userId=${userId}`);

			// Listen for messages from the server
			socket.addEventListener('message', async function (event) {
				const data = JSON.parse(event.data);

				console.log(data);

				if (data.userId === userId && data.queueNumber) {
					// Making a POST request to the queue service
					const response = await fetch('http://localhost:8081/queue', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userId: data.userId,
							queueNumber: data.queueNumber
						})
					});

					if (response.ok) {
						// Navigate to the next page without changing the URL.
						// The server should have set the necessary state to recognize this user.
						window.location.replace('http://localhost:8081/queuePage');
					} else {
						console.log('Failed to post data to the queue service');
					}
				}
			});

			// Listen for errors
			socket.addEventListener('error', function (error) {
				console.log('WebSocket Error: ', error);
			});

			// Listen for WebSocket open event
			socket.addEventListener('open', function (event) {
				console.log('WebSocket is open now.');
			});

			// Listen for WebSocket close event
			socket.addEventListener('close', function (event) {
				console.log('WebSocket is closed now.', event.reason);
			});
		});
	}
</script>

<Navbar />
<main>
	<p style="font-size: {50 + 'px'}">We are assigning you a queue number.</p>
	<p style="font-size: {40 + 'px'}">Please wait.</p>
	<div>{userId}</div>
</main>
<Footer />

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		min-height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	p {
		color: #666;
	}
</style>
