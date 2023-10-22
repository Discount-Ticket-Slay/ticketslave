<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import DinoGame from "../components/Boing/DinoGame.svelte";
    import { Button } from "carbon-components-svelte";
    import { onMount } from "svelte";

    let eventId = null;
    // let userId;
    // let queueNumber;
    // temporary fix
    let queueNumber = new URLSearchParams(window.location.search).get("queueNumber");  // Get queueNumber from URL parameter
    let userId = new URLSearchParams(window.location.search).get("userId");  // Get userId from URL parameter

    onMount(async () => {
      // const res = await fetch("getQueueData", {
      //   method: "GET",
      //   credentials: "include", // Important to send cookies
      // });

      // if (res.ok) {
      //   const data = await res.json();
      //   userId = data.userId;
      //   queueNumber = data.queueNumber;

      //   console.log("User ID: , Queue Number: ", userId, queueNumber);

      // } else {
      //   console.log("Failed to fetch data");
      // }
    });
</script>

<main>
    <Navbar />
    <Button href="/#/buy-ticket?id={eventId}">Go to: Ticketing</Button>
    {#if queueNumber && userId}
        <div class="queue-info">
            <h2>Your Queue Number: {queueNumber}</h2>
            <h3>User ID: {userId}</h3>
        </div>
    {/if}
    <div class="centered-div">
      <DinoGame />
    </div>
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.css";

    .centered-div {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        padding: 10px;
    }

    .queue-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
