<!--
    Reusable input field button ~
    Comes with a customizable label and placeholder text
    Comes with option to disable and mandate input

    Still needs to be put inside a form element
    Does not include submit button
    (for now)
-->

<script>
    export let label = "";
    export let value = "";
    export let type = "text";
    export let placeholder = "";
    export let disabled = false;
    export let required = false;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const handleInput = (e) => {
        value = e.target.value;
        dispatch("input", { value });
    };
</script>

<label>{label}</label>
<input {type} {placeholder} {disabled} {required} on:input={handleInput} />

<style>

</style>
