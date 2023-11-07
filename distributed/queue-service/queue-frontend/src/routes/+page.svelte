<script>
    // import Navbar from "../components/Essentials/Navbar.svelte";
    // import Footer from "../components/Essentials/Footer.svelte";
    // import DinoGame from "../components/Game/DinoGame.svelte";
    // import { onMount } from 'svelte';
    // import { page } from '$app/stores';

    // let QueueNo;
    // let userId = ""; // Initialized as empty string
    // let fontSize = 20;

    // onMount(async () => {
    //     // Unsubscribe when the component is destroyed
    //     const unsubscribe = page.subscribe(($page) => {
    //         const urlParams = new URLSearchParams($page.url.search);
    //         QueueNo = urlParams.get('queueNumber') || 'Not Available';
    //     });
        
    //     // Fetch the user's unique identifier from the backend
    //     userId = await getUserId();


    //     // // Establish the WebSocket connection
    //     // const socket = establishWebSocketConnection(userId);

    //     // // Handle WebSocket events
    //     // setupWebSocketListeners(socket);

    //     // // Send queue number to server via web sockets
    //     // sendQueueNumber();

    //     // redirect the person to purchase based on time algorithm
        
    //     return unsubscribe;
    // });

    // async function getUserId() {
    //     const response = await fetch(
    //         "https://www.ticketslave.org/queue/user/email",
    //         {
    //             credentials: "include", // Important to include cookies in the request
    //         }
    //     );
    //     if (response.ok) {
    //         const email = await response.text();
    //         return email;
    //     } else {
    //         console.log("Failed to get user email, redirecting to login");
    //         redirectToLogin();
    //     }
    // }

    // function redirectToLogin() {
    //     window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
    // }

    // // redirect based on queue number (time based)
    // function redirectToPurchase() {

    //     // get queue number from header


    // }

    import Navbar from "../components/Essentials/Navbar.svelte";
    import Footer from "../components/Essentials/Footer.svelte";
    import DinoGame from "../components/Game/DinoGame.svelte";
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let QueueNo;
    let userId = ""; // Initialized as empty string
    let fontSize = 15;

    onMount(async () => {
        // Unsubscribe when the component is destroyed
        const unsubscribe = page.subscribe(($page) => {
            const urlParams = new URLSearchParams($page.url.search);
            QueueNo = urlParams.get('queueNumber') || 'Not Available';
        });

        // Fetch the user's unique identifier from the backend
        userId = await getUserId();

        // If the queue number is present, we will use it to redirect after the calculated delay
        if (QueueNo !== 'Not Available') {
            redirectToPurchase();
        }

        return unsubscribe;
    });

    async function getUserId() {
        const response = await fetch(
            "https://www.ticketslave.org/queue/user/email",
            {
                credentials: "include", // Important to include cookies in the request
            }
        );
        if (response.ok) {
            const email = await response.text();
            return email;
        } else {
            console.log("Failed to get user email, redirecting to login");
            redirectToLogin();
        }
    }

    function redirectToLogin() {
        window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
    }

    // Redirect based on queue number (time-based)
    function redirectToPurchase() {
        if (QueueNo && !isNaN(QueueNo)) {
            const delayTime = parseInt(QueueNo) * 10000; // QueueNo times 10 seconds
            setTimeout(() => {
                // Replace 'yourDestinationURL' with the actual URL you want to redirect to
                window.location.href = 'https://www.ticketslave.org/purchase';
            }, delayTime);
        } else {
            console.error('Queue number is not available or invalid');
        }
    }


    // function establishWebSocketConnection(userId) {
    //     return new WebSocket(`wss://www.ticketslave.org/queue/queue-updates?userId=${userId}`);
    // }

    // function setupWebSocketListeners(socket) {
    //     socket.addEventListener("message", function (event) {
    //         const data = JSON.parse(event.data);
    //         console.log("Message from server: ", data);
    //         console.log("Current User ID: ", userId);

    //         if (data.userId == userId) {
                
    //             // Redirect to queue service with the queue number in the query string
    //             const queueUrl = new URL("https://www.ticketslave.org/purchase");
    //             queueUrl.searchParams.append("queueNumber", data.queueNumber);
                
    //             console.log(`Redirecting to: ${queueUrl.toString()}`);
                
    //             // Navigate to the queue page with the queue number as a query parameter
    //             window.location.replace(queueUrl.toString());
                
    //         }

    //     });

    //     socket.addEventListener("error", function (error) {
    //         console.error("WebSocket Error: ", error);
    //     });

    //     socket.addEventListener("open", function () {
    //         console.log("WebSocket is open now.");
    //     });

    //     socket.addEventListener("close", function (event) {
    //         console.log("WebSocket is closed now.", event.reason);
    //     });
    // }

</script>


<Navbar />
<div class="min-h-screen flex flex-col">
    <div class="centered-div">
        <p class="queue-text" style="font-size: {fontSize + 'px'}">Your Queue Number: {QueueNo}</p>

        <DinoGame />
    </div>
    
    <!-- <Button href="/#/buy-ticket?id={eventId}">Go to: Ticketing</Button> -->
    <!-- <div class="centered-div">
    </div> -->
</div>

<Footer/>

<style>

    .queue-text {
            margin-bottom: 100px; /* Adjust this value to control the separation */
        }

    .centered-div {
        position: absolute;
        top: 50%; /* Adjust this value to control the vertical position */
        left: 50%;
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        padding: 10px;
        text-align: center;
    }
</style>
