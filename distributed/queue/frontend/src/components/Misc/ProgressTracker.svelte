<script>
	import { ProgressBar } from 'carbon-components-svelte';

    export let currentStep = 1;

    function next() {
        if(currentStep < 4) {
            currentStep++;
        }
    }

    function previous() {
        if(currentStep > 1) {
            currentStep--;
        }
    }
</script>

<!--
    since there are 4 steps, the value is calculated by taking currentStep / totalSteps * 100
    where needed, pass the currentStep as a parameter when using this component. otherwise the
    default step is 1.
-->
<div class="progress-tracker">
    {#if currentStep === 1}
        <ProgressBar 
            value={100 * currentStep / 4}
            labelText="Completion Status"
            helperText="Step 1: Select Seat"
        />
    {/if}

    {#if currentStep === 2}
        <ProgressBar 
            value={100 * currentStep / 4}
            labelText="Completion Status"
            helperText="Step 2: Confirm Selection"
        />
    {/if}

    {#if currentStep === 3}
        <ProgressBar 
            value={100 * currentStep / 4}
            labelText="Completion Status"
            helperText="Step 3: Make Payment"
        />
    {/if}

    {#if currentStep === 4}
        <ProgressBar 
            value={100 * currentStep / 4}
            status="finished"
            labelText="Completion Status"
            helperText="Complete!"
        />
    {/if}
</div>

<style>
    @import 'carbon-components-svelte/css/all.css';

    .progress-tracker {
        width: full;
        margin: 5%;
    }
</style>
