<script>
    import { Button } from "carbon-components-svelte";
    export let event = { ticketCategories: [] }; 
    import { userId } from "../../store/store.js";

    async function queueForTickets(userId) {
    try {
        // Call backend to register user in the queue
        const userIdString = String(userId);
        console.log("Attempting to send userId:", userId);
        console.log("Type of userId:", typeof userId);
        
        // Send POST request to backend
        const response = await fetch("https://www.ticketslave.org/feed/queue", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userIdString })
        });

        console.log("Response:", response);

        // Check the status of the response
        if (response.status === 401) {
            // If the user is not authorized, redirect to the Cognito login page
            window.location.href = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";
        } else if (response.ok) {
            // Successful registration, redirect user to buffer service page to wait
            window.location.href = `https://www.ticketslave.org/buffer`;  // Pass userId as URL parameter
        } else {
            // Handle other responses or errors accordingly
            console.error('Failed to register in queue:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

</script>


<div class="header">
    {#if event}
        <h5>{event.eventName}</h5>
        <h6>{event.startDateTime} | {event.venue}</h6>
        <br />
    {/if}
</div>

<div class="info-bar">
    <strong>Event Details</strong>
    <strong>Ticket Pricing</strong>
    <strong>Exchange & Refund Policy</strong>
    <strong>Admission Policy</strong>
    <Button on:click={queueForTickets($userId)}>Queue for Tickets</Button>
</div>

{#if event && event.ticketCategories}
    {#each event.ticketCategories as cat}
        <div class="ticket">
            <strong>{cat.name}</strong>
            <p>{cat.price}</p>
        </div>
    {/each}
{/if}

<style>
    .header {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: center;
        justify-content: center;
        margin-top: 0.5rem;
    }
    .info-bar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: blanchedalmond;
        padding: 1rem;
        overflow: hidden;
    }

    .info-bar > strong {
        display: table-cell;
        vertical-align: middle;
    }

    .ticket {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        background-color: cornsilk;
        width: 20vw;
        height: 12.5vw;
        padding: 1rem;
        margin: 1rem;
    }
</style>
