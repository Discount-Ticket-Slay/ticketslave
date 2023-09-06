<script>
    import {Button} from 'carbon-components-svelte'
    import Navbar from '../components/Essentials/Navbar.svelte';
    import EventCard from '../components/Events/EventCard.svelte'
</script>

<Navbar />
<Button kind="primary" href="/">Go to: Home</Button>
<div class="events">
    <h3>Popular Events</h3>
</div>

<!--this will eventually become the area where backend data is displayed-->
<EventCard />
<!--this will eventually become the area where backend data is displayed-->

<style>
    @import url('https://fonts.googleapis.com/css2?family=Advent+Pro:wght@500&family=Pacifico&display=swap');
    .events {
        margin: 3%;
    }

    h3 {
        font-family: 'Advent Pro', sans-serif;
    }
</style>