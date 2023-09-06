<script>
    import { ProgressBar } from "carbon-components-svelte";
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
    <ProgressBar helperText="Loading..." />
</div>

