<script>
    import {
        ProgressIndicator,
        ProgressStep,
        Button,
    } from "carbon-components-svelte";

    let currentIndex = 1;
    let thirdStepCurrent = false;
</script>

<style>
    .container-small {
        width: 500px;
    }
</style>

<div class="container-fluid py-2 container-small">
    <ProgressIndicator bind:currentIndex>
        <ProgressStep
            complete
            label="Step 1"
            description="The progress indicator will listen for clicks on the steps"
        />
        <ProgressStep
            complete
            label="Step 2"
            description="The progress indicator will listen for clicks on the steps"
        />
        <ProgressStep
            complete
            label="Step 3"
            description="The progress indicator will listen for clicks on the steps"
        />
        <ProgressStep
            complete
            label="Step 4"
            description="The progress indicator will listen for clicks on the steps"
        />
    </ProgressIndicator>

    <div style="margin: var(--cds-layout-02) 0">
        <Button
            kind={"primary"}
            on:click={() => {
                currentIndex = currentIndex + 1;
            }}
        >
            Set currentIndex to
            {currentIndex}
        </Button>
    </div>
    
    <h3>Current index: {currentIndex}</h3>
</div>


