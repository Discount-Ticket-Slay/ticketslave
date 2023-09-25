<script>
    import Navbar from "../components/Essentials/Navbar.svelte";
    import {
        RadioButtonGroup,
        RadioButton,
        Form,
        TextInput,
        Button,
        Checkbox,
    } from "carbon-components-svelte";
    import ProgressTracker from "../components/Misc/ProgressTracker.svelte";

    const handleEdit = () => {
        alert("editing order");
    };

    const handleCheckout = () => {
        alert("checked out pog");
    };
</script>

<Navbar />

<ProgressTracker currentStep={3} />

<main>
    <!--Payment-->
	<div class="payment">
		<Form on:submit>
			<RadioButtonGroup orientation="vertical" selected="standard">
				<RadioButton labelText="Credit Card" value="credit" />
				<RadioButton labelText="Apple Pay" value="apple" />
				<RadioButton labelText="Paypal" value="pp" />
			</RadioButtonGroup>

			<div class="wrapper1">
				<TextInput inline labelText="Name on Card" />
				<TextInput inline labelText="Card Number" placeholder="XXXX XXXX XXXX XXXX" />
			</div>

			<div class="wrapper2">
				<TextInput labelText="Expiration Date" placeholder="MM / YY" />
				<TextInput labelText="CVV" placeholder="•••" />
			</div>
		</Form>
	</div>

    <!--Order Summary-->
	<div class="order-summary">
		<h4>Order Summary</h4>
		<div class="payment-details">
			<div class="tickets-column">
				<div>Ticket Number 1</div>
				<div>Ticket Number 2</div>
				<div>Ticket Number 3</div>
			</div>
			<div class="prices-column">
				<div>Price 1</div>
				<div>Price 2</div>
				<div>Price 3</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5vh;
	}

	.payment, .order-summary {
		width: max-content;
		height: max-content;
		margin-bottom: 5vh;
		background-color: #e5e5e5;
		padding: 2.5vh;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.order-summary {
		flex-direction: column;
	}

	.payment-details {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.wrapper1 {
		width: full;
		margin-top: 3vh;
	}

	.wrapper2 {
		display: flex;
		flex-direction: row;
		gap: 2vw;
		margin-top: 3vh;
	}


	.order-summary {
		width: 30%;
		margin-bottom: 5vh;
		background-color: #e5e5e5;
		padding: 2.5vh;
		border-radius: 10px;
        overflow: hidden;
	}

</style>
