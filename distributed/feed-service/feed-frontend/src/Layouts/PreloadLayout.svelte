<script>
    import { preload } from '@sveltejs/kit';
    import Page from '../routes/+page.svelte';
    import FeedPage from '../routes/Feed/+page.svelte';

    // Preload both pages
    preload(Page);
    preload(FeedPage);
</script>

<main>
    <slot />
</main>