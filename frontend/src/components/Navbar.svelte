<!-- Navbar.svelte -->

<script>
    // Import any required data or logic here
    import * as feather from 'feather-icons';
</script>

<style>
    /* Apply CSS styles for the navbar */
    .navbar {
        background-color: #4A6EEB;
        color: white;
        padding: 1rem;
        justify-content: center;
    }

    .navbar a {
        text-decoration: none;
        color: white;
        margin: 0 1rem;
    }

    .search-bar {
        display: inline-block;
        background-color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        margin-left: 1rem;
        font-family: inherit;
    }

    /* Customize other navbar styles as needed */
</style>

<main>
    <div class="navbar navbar-expand nav-line">
        <!-- Navbar content -->
        <a href="/">TixHelp</a>
        <a href="/">About</a>
        <a href="/">Events</a>
        <a href="/">FAQ</a>
    
        <!-- Search bar input -->
        <input type="text" class="search-bar" placeholder="Search...">
    
        <a href="/">Sign up/Log in</a>
    </div>
</main>
