<script>
    export let notAvail; //boolean
    import { Checkbox } from "carbon-components-svelte";
console.log(notAvail)
    //If fully booked, the section will be faded out
    let opacity = !notAvail ? "1" : "0.45";

    //If fully booked, the section will not be clickable
    let cursor = !notAvail ? "pointer" : "default";
    let clickable = !notAvail ? "auto" : "none";

    let style = `
        opacity: ${opacity};
        cursor: ${cursor};
        pointer-events: ${clickable};
    `;

    /*FOR DEBUGGING RESERVATION STATUS*/
    let reserved = notAvail ? "resereved" : "free for all my dudes"
    const handleCheck = () => {
        alert(`reservation status changed to ${reserved}`)
    }
    /*FOR DEBUGGING RESERVATION STATUS*/
</script>


<Checkbox {style} checked={notAvail} on:check={handleCheck}></Checkbox>


