<script>
    import { RadioButtonGroup, RadioButton } from "carbon-components-svelte";
</script>

<style>
    .container-small {
        width: 500px;
    }

    .container-large {
        width: 1170px;
    }
</style>

<div class="container-fluid py-5 container-small">
    <RadioButtonGroup selected="standard">
        <RadioButton labelText="Free (1 GB)" value="free" />
        <RadioButton labelText="Standard (10 GB)" value="standard" />
        <RadioButton labelText="Pro (128 GB)" value="pro" />
    </RadioButtonGroup>
</div>
