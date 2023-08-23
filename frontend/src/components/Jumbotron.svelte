<!-- Jumbotron.svelte -->
<script>
    let name = "Taylor Swift | The Eras Tour";
</script>


<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<style>
    .jumbotron {
        background-color: #f8f9fa;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>

<main>
    <div class="container py-4">
        <h1>Buying tickets for {name}</h1>
    </div>

    <div class="container py-4">
        <div class="p-5 mb-4 rounded-4 jumbotron">
            <div class="container-fluid py-5">
                <h2>EVENT DETAILS</h2>
                <p>Lorem ep ipsum</p>
            </div>
        </div>
    </div>
</main>