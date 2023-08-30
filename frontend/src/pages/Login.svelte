<script>
    import Checkbox from '../components/Checkbox.svelte';
    import LoginInput from '../components/LoginInput.svelte';
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.css';
</style>

<!-- Rest of app content -->
<main>
    <div class="container-fluid py-2">
        <h1>Log In</h1>
        <LoginInput />
        <Checkbox />

        <p>Don't have an account?</p>
        <a href='/#/signup'>Sign up</a>

        <br><br>

        <a href='/#/signup'>Forgot password?</a>
    </div>
</main>