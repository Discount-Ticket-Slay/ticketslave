<script>
    import Navbar from '../components/Essentials/Navbar.svelte';
    import {Button} from 'carbon-components-svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->
<main>
    <Navbar />

    <div class="container py-2">
        <Button kind="primary" href="/Login">Go to: Login</Button>
        <Button kind = "secondary" href="/Feed">Go to: Feed</Button>
        <h1>This is the homepage.</h1>
    </div>
</main>