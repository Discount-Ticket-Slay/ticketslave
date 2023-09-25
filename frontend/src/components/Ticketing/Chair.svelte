<script>
    export let notAvail; //boolean
    import { Checkbox } from "carbon-components-svelte";
console.log(notAvail)
    //If fully booked, the section will be faded out
    let opacity = notAvail === false ? "1" : "0.45";

    //If fully booked, the section will not be clickable
    let cursor = notAvail === false ? "pointer" : "default";
    let clickable = notAvail === false ? "auto" : "none";

    let style = `
        opacity: ${opacity};
        cursor: ${cursor};
        pointer-events: ${clickable};
    `;
</script>


<Checkbox {style} checked={notAvail}></Checkbox>


