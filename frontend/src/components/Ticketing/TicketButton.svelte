<script>
    import {Button} from 'carbon-components-svelte'
    export let text = "Invalid Ticket";
    export let onClick = () => {};
</script>

<Button on:click={onClick}>{text}</Button>

<style>

</style>