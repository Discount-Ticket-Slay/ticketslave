<script>
    import LoginInput from '../old-components/Login/LoginInput.svelte';
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
    <div class="container py-2">
        <h1>Log In</h1>
        <br><br><br><br>
        <LoginInput />

        <br>
        <p>Don't have an account?</p>
        <a href='/#/signup'>Sign up</a>

        <br><br>
        <a href='/#/signup'>Forgot password?</a>
    </div>
</main>