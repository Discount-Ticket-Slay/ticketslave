<script>
    import { Checkbox } from "carbon-components-svelte";
    export let ticket

    let reservationStatus = ticket.status
    let sold = ticket.sold

    let buyable = !reservationStatus && !sold

    /********************STYLING*********************/
    //If fully booked, the section will be faded out
    let opacity = buyable ? "1" : "0.45";
    //If fully booked, the section will not be clickable
    let cursor = buyable ? "pointer" : "default";
    let clickable = buyable ? "auto" : "none";

    let style = `
    opacity: ${opacity};
    cursor: ${cursor};
    pointer-events: ${clickable};
    `;
    /********************STYLING*********************/



    /*ADDS PURCHASE OBJECT TO BACKEND*/
    const handleCheck = () => {
        
    }

</script>


<Checkbox {style} checked={!buyable} on:check={handleCheck} />


