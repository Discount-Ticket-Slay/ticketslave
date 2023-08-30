<script>
    import {
        FluidForm,
        TextInput,
        PasswordInput,
        ButtonSet,
        Button,
        Checkbox
    } from "carbon-components-svelte";

    let password = "";
    let invalid = false;

    // Add logic to check whether the password is the same as in the db
    $: invalid = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/.test(password);
</script>

<style>
    .container-small {
        width: 500px;
    }
</style>

<div class="container-fluid py-2 container-small">
    <FluidForm>
        <TextInput 
            labelText="User name" 
            placeholder="Enter user name..." 
            required 
        />

        <PasswordInput
            bind:value={password}
            {invalid}
            invalidText="Wrong password. Try again or click ‘Forgot password’ to reset it."
            required
            type="password"
            labelText="Password"
            placeholder="Enter password..."
        />
    </FluidForm>

    <Checkbox labelText="Keep me logged in"/>

    <ButtonSet stacked>
        <Button>Log in</Button>
    </ButtonSet>
</div>

