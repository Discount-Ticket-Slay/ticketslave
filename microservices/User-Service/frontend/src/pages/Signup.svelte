<script>
    import Checkbox from '../components/Checkbox.svelte';
    import SignupInput from '../components/SignupInput.svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
    }
</style>

<!-- Rest of app content -->
<main>
    <div class="container">
        <h1>Sign up</h1>
        <br><br><br><br>
        <SignupInput />

        <br>
        <a href="/#/login">Log in here!</a>
    </div>
</main>