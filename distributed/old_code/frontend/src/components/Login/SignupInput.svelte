<script>
    import {
        FluidForm,
        TextInput,
        PasswordInput,
        ButtonSet,
        Button,
        Checkbox
    } from "carbon-components-svelte";

    let username = "";
    let usernameInvalid = false;

    // Add check to see whether the username is duplicate or not (exists already in the db)

    let password = "";
    let passwordInvalid = false;

    $: passwordInvalid = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/.test(password);

    let passwordConfirmation = "";
    let passwordConfirmationInvalid = false;

    // idk whether this works lol
    $: passwordConfirmationInvalid = passwordConfirmation == password;
</script>

<style>
    .container-small {
        width: 500px;
    }
</style>

<div class="container-fluid py-2 container-small">
    <FluidForm>
        <TextInput 
            bind:value={username}
            {usernameInvalid}
            invalidText="That username is taken. Please try another."
            labelText="User name" 
            placeholder="Enter user name..." 
            required 
        />

        <PasswordInput
            bind:value={password}
            {passwordInvalid}
            invalidText="Your password must be at least 8 characters as well as contain at least one uppercase, one lowercase, and one number."
            required
            type="password"
            labelText="Password"
            placeholder="Enter password..."
        />

        <PasswordInput
            bind:value={passwordConfirmation}
            {passwordConfirmationInvalid}
            invalidText="Your passwords don't match."
            required
            type="password"
            labelText="Confirm password"
            placeholder="Confirm password..."
        />
    </FluidForm>

    <br><br>

    <ButtonSet stacked>
        <Button>Sign up</Button>
    </ButtonSet>
</div>

