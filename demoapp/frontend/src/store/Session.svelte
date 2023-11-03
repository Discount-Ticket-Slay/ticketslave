<!-- Session.svelte -->
<script>
    // Import the writable function from Svelte
    import { writable } from "svelte/store";

    // Create a writable store to hold your session data
    const session = writable({
        user: null,
        isAuthenticated: false,
        customVariable: null, // Add your custom variable here
    });

    // Function to update session data
    function updateSession(newUser, isAuthenticated, customData) {
        session.set({
            user: newUser,
            isAuthenticated,
            customVariable: customData,
        });
    }
</script>
