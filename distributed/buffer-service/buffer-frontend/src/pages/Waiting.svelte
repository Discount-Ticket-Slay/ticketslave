<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

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
                method: "POST", // POST request to trigger the randomiser
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

            console.log(data);

            if (data.userId === userId && data.queueNumber) {
                // Making a POST request to the queue service with the correct domain and protocol
                const response = await fetch(
                    "https://www.ticketslave.org/queue",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: data.userId,
                            queueNumber: data.queueNumber,
                        }),
                    }
                );

                if (response.ok) {
                    // Navigate to the next page using a secure protocol
                    window.location.replace(
                        "https://www.ticketslave.org/queue/queuePage"
                    );
                } else {
                    console.log("Failed to post data to the queue service");
                }
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

<main>
    <h1>You are in the queue</h1>
    <p>Please wait while we process your request.</p>
    <p>Please do not close this page</p>
    <p>User: {userId}</p>
    <!-- Conditional rendering for admin button -->
    {#if $isAdmin}
        <button on:click={triggerRandomiser}>Trigger Randomiser</button>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #333;
    }

    p {
        color: #666;
    }
</style>
