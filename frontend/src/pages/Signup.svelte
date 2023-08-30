<script>
    import Checkbox from '../components/Checkbox.svelte';
    import SignupInput from '../components/SignupInput.svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->
<main>
    <h1>Sign up</h1>
    <SignupInput />
	<Checkbox />

    <a href="/#/login">Log in here!</a>
</main>