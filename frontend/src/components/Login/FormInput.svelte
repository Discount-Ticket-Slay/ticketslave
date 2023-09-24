<script>
    import {
        FluidForm,
        TextInput,
        PasswordInput,
        ButtonSet,
        Button
    } from "carbon-components-svelte";
</script>

<style>
    .container-small {
        width: 500px;
    }
</style>

<div class="container-fluid py-2 container-small">
    <FluidForm>
        <TextInput labelText="Email" placeholder="Enter email..." required />
        <PasswordInput
            required
            type="password"
            labelText="Password"
            placeholder="Enter password..."
        />
    </FluidForm>

    <ButtonSet stacked>
        <Button>Log in</Button>
        <Button kind="ghost">Sign up</Button>
    </ButtonSet>
</div>

