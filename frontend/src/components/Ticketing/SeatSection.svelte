<!--
    Configurable section component

    the component takes in 4 parameters:
    1) section number as a string
    2) category as a string, from 1-7 and standing
    3) availability as a string: "Available" indicates available, anything else indicates unavailable (for now)
    4) a click handler as a function, which can be implemented in the file this component is called in

    returns a (currently) rectangular clickable field

    Features/Updates to be added:
    Display seat info below
    Custom shape styling
    Color choice optimization
-->

<script>
    export let number;
    export let category;
    export let availability;
    export let onClick;

    //If fully booked, the section will be faded out
    let opacity = availability === "Available" ? "1" : "0.45";

    //If fully booked, the section will not be clickable
    let cursor = availability === "Available" ? "pointer" : "default";
    let clickable = availability === "Available" ? "auto" : "none";

    //Colors corresponding to the seat category
    let bg = "";
    switch (category) {
        case "standing":
            bg = "#f6c2f3";
            break;
        case "1":
            bg = "#ff9aa2";
            break;
        case "2":
            bg = "#ffb7b2";
            break;
        case "3":
            bg = "#F6CA94";
            break;
        case "4":
            bg = "#e20fcb";
            break;
        case "5":
            bg = "#b5ead7";
            break;
        case "6":
            bg = "#c7ceea";
            break;
        default: //this handles cat 7 as well for now
            bg = "#fdffb6";
    }

    let style = `
        opacity: ${opacity};
        cursor: ${cursor};
        background-color: ${bg};
        pointer-events: ${clickable};
    `;

// console.log('opacity:', opacity);
// console.log('cursor:', cursor);
// console.log('clickable:', clickable);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="section" {style} on:click={onClick}>{number}</div>

<style>
    .section {
        color: white;
        padding: 0.5em;
    }
</style>
