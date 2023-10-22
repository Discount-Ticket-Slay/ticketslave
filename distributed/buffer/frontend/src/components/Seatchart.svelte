<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte'
    import SeatchartJS from 'seatchart'
    import Navbar from "./Navbar.svelte"
    import Footer from "./Footer.svelte"

    let element;
    let seatchart;
    let options = {
        map: {
            rows: 7,
            columns: 7,
            seatTypes: {
                default: {
                    label: 'Standing Pen',
                    cssClass: 'standing',
                    price: 10
                }
            }
        }
    };
    
</script>

<body>
    <Navbar />
    <div id="container" bind:this={element}></div>
    <Footer />
</body>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }

    .standing {
        color: white;
        background-color: #43aa8b;
    }
</style>
