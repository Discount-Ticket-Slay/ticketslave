<script>
	import { onMount } from 'svelte';
	import { writable } from "svelte/store";
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

    let isAdmin = writable(false);

    async function checkAdminStatus() {
        // Call the backend's isAdmin method to check if the user is an admin
        const response = await fetch(
            `https://www.ticketslave.org/buffer/isAdmin`,
            {
                method: "GET", // Changed to GET since we are not submitting data
                credentials: "include", // Include cookies to ensure credentials are sent
            }
        );

        if (response.ok) {
            const isAdminResponse = await response.json();
            isAdmin.set(isAdminResponse); // Update our admin status with the response (true or false)
        } else {
            console.error("Failed to check admin status");
        }
    }

    // Function to trigger the randomiser
    async function triggerRandomiser() {
        // Here we make a POST request to the backend endpoint
        const response = await fetch(
            `https://www.ticketslave.org/buffer/trigger-randomiser`,
            {
                method: "GET", // GET request to trigger the randomiser
                credentials: "include", // Include cookies for authentication
            }
        );

        if (response.ok) {
            console.log("Randomisation process triggered successfully.");
            // Handle successful randomisation trigger if needed
        } else {
            console.error("Failed to trigger randomisation process.");
            // Handle errors if the trigger was unsuccessful
        }
    }

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

	/**
	 * @type any
	 */
    let userId = ""; // Initialized as empty string

    onMount(async () => {
        
        // fetch the user's email from the backend
        userId = await getUserId();

        // check if the user's an admin
        await checkAdminStatus();

        // Now userId is a string, and can be used to establish WebSocket connection
        const socket = new WebSocket(
            `wss://www.ticketslave.org/buffer/buffer-updates?userId=${userId}`
        );

        // Listen for messages from the server
        socket.addEventListener("message", async function (event) {
            const data = JSON.parse(event.data);

            console.log("Message from server ", event.data)
            console.log(data);

            
            // given the correct userID and that we have our queue number, redirect to the queue page
            if (data.userId === userId && data.queueNumber) {

                // Redirect to queue service with the queue number in the query string
                const queueUrl = new URL("https://www.ticketslave.org/queue");
                queueUrl.searchParams.append("queueNumber", data.queueNumber);
                
                console.log(`Redirecting to: ${queueUrl.toString()}`);
                
                // Navigate to the queue page with the queue number as a query parameter
                window.location.replace(queueUrl.toString());
            } 
            
        });

        // Listen for errors
        socket.addEventListener("error", function (error) {
            console.log("WebSocket Error: ", error);
        });

        // Listen for WebSocket open event
        socket.addEventListener("open", function (event) {
            console.log("WebSocket is open now.");
        });

        // Listen for WebSocket close event
        socket.addEventListener("close", function (event) {
            console.log("WebSocket is closed now.", event.reason);
        });
    });
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
