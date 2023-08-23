<!-- Navbar.svelte -->

<script>
    // Import any required data or logic here
    import * as feather from 'feather-icons';
    import InfoCard from './InfoCard.svelte';
    import InputBox from './InputBox.svelte';
</script>

<style>
    /* Apply CSS styles for the navbar */
    .navbar {
        display: flex;
        background-color: #4A6EEB;
        color: white;
        padding: 1rem;
        justify-content: space-between;
    }

    .navbar a {
        text-decoration: none;
        color: white;
        margin: 0 1rem;
    }

    .search-bar {
        width: 30%;
        display: inline-block;
        background-color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        margin-left: 1rem;
        font-family: inherit;
    }

    .wrapper1 {
        display: flex;
        width: 40%;
        justify-content: space-around;
    }

    .icon {
        position: relative;
        margin-left: 64px;
        font-weight: bold;
        cursor: pointer;
        color: brown !important;
    }

    main {
        min-width: 800px;
    }

    /* Customize other navbar styles as needed */
</style>

<main>
    <div class="navbar navbar-expand nav-line">
        <a href="/" class="icon">
            Tix
        </a>

        <div class="wrapper1">
            <!-- Navbar content -->
            <a href="/">Help</a>
            <a href="/">About</a>
            <a href="/">Events</a>
            <a href="/">FAQ</a>
        </div>
    
        <!-- Search bar input -->
        <input type="text" class="search-bar" placeholder="Search...">
    
        <a href="/">Sign up/Log in</a>
    </div>

</main>
