<script>
	import { onMount } from 'svelte';
	import Navbar from '../components/Essentials/Navbar.svelte';
	import Footer from '../components/Essentials/Footer.svelte';

	/**
	 * TODO: implement the get userID (API calls, copy paste from Waiting.svelte)
	 * TODO: implement function to check admin status which is another API call which returns whether a user is an admin. if is admin, the randomizer will appear
	 * TODO: all are triggered asynchronously onMount

	 * TODO: add the websockets functions (just copy paste)
	 * ? find out about the functions if needed
	 * * USE THE EXACT WEBSOCKET, IF NOT THE FUNCTION WILL FAIL
	*/

	/**
	 * @type any
	 */
	let userId = "";

	async function getUserId() {
		const response = await fetch(
            "https://www.ticketslave.org/buffer/user/email",
            {
                credentials: "include", // Important to include cookies in the request
            }
        );
        if (response.ok) {
            const email = await response.text();
            return email;
        } else {
            console.log("Failed to get user email, redirecting to login");
            window.location.href =
                "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
        }
	}

	onMount(async () => {
		userId = await getUserId()
console.log(userId)
	})
</script>

<Navbar />

<div
	class="bg-blue-100 p-4 rounded-lg shadow-lg text-center min-h-screen flex items-center justify-center"
>
	<div>
		<p class="text-2xl font-bold mb-4">Please Wait</p>
		<p class="text-lg">You are being assigned a queue number.</p>
		<p class="text-lg">Please do not refresh or exit the page.</p>
		<!--displays the user ID-->
		<p class="text-lg">Your User ID: {userId}</p>
	</div>
</div>

<Footer />

<style>

</style>
