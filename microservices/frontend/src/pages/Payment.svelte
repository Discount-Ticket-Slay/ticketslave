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

<div class="main">
    <div class="payment">
        <h3>Payment</h3>
        <Form on:submit>
            <RadioButtonGroup orientation="vertical" selected="standard">
                <RadioButton labelText="Credit Card" value="credit" />
                <RadioButton labelText="Apple Pay" value="apple" />
                <RadioButton labelText="Paypal" value="pp" />
            </RadioButtonGroup>

            <div class="wrapper1">
                <TextInput inline labelText="Name on Card" />
                <TextInput
                    inline
                    labelText="Card Number"
                    placeholder="XXXX XXXX XXXX XXXX"
                />
            </div>

            <div class="wrapper2">
                <TextInput labelText="Expiration Date" placeholder="MM / YY" />
                <TextInput labelText="CVV" placeholder="•••" />
            </div>
        </Form>
    </div>

    <!--Order Summary-->
    <div class="order-summary">
        <div class="order-heading">
            <h4><strong>Order Summary</strong></h4>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <p class="edit-button" on:click={handleEdit}>Edit</p>
        </div>
        <div class="order-details">
            <div class="order-description">
                <strong style="width: 75%;">Taylor Swift | The Eras Tour</strong
                >
                <p>Category 1 | Row 42 | Col 69</p>
            </div>
            <div class="price-qty">
                1x
                <strong>$420</strong>
            </div>
        </div>

        <div class="total-prices">
            <strong class="subtotal">
                Subtotal
                <strong>$420</strong>
            </strong>
            <!-- <div class="discounts">
                Discount
                <TextInput placeholder="Enter Code"/>
            </div> -->
        </div>
        <div class="checkout">
            <Checkbox
                labelText="I confirm that I am at least 18 years old and have read the Privacy Policy."
            />
            <Button on:click={handleCheckout}>Checkout</Button>
        </div>
    </div>
</div>

<style>
    h3 {
        margin-bottom: 0.5em;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5vh;
    }

    .payment {
        width: 45%;
        margin-bottom: 5vh;
        background-color: #e5e5e5;
        padding: 2.5vh;
        border-radius: 10px;
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

    .edit-button {
        text-decoration: underline;
        cursor: pointer;
    }

    .order-summary {
        width: 30%;
        margin-bottom: 5vh;
        background-color: #e5e5e5;
        padding: 2.5vh;
        border-radius: 10px;
        overflow: hidden;
    }

    .order-heading {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .order-description {
        display: flex;
        flex-direction: column;
        margin-right: 10vw;
        width: 75%;
    }

    .order-details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;

        padding: 5vh;
    }

    .price-qty {
        display: flex;
        flex-direction: row;
        gap: 1vw;
    }

    .subtotal {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .checkout {
        margin-top: 3vh;
    }
</style>
