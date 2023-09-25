<script>
    import { Checkbox } from "carbon-components-svelte";

    export let ticket;
    export let purchase;
    export let purchasedTicketsArray;

    let reservationStatus = ticket.status;
    let sold = ticket.sold;
    let ticketId = ticket.ticketId
    $:console.log(ticketId)

    let buyable = !reservationStatus && !sold;

    /********************STYLING*********************/
    //If fully booked, the section will be faded out
    let opacity = buyable ? "1" : "0.45";
    //If fully booked, the section will not be clickable
    let cursor = buyable ? "pointer" : "default";
    let clickable = buyable ? "auto" : "none";

    let style = `
    opacity: ${opacity};
    cursor: ${cursor};
    pointer-events: ${clickable};
    `;
    /********************STYLING*********************/

    const handleCheck = () => {
        //change the reservation status. if ticket becomes reserved by the user, add it to their cart.
        reservationStatus = !reservationStatus;
        if (reservationStatus) {
            updateDatabase("POST");
            purchasedTicketsArray.push(ticket);
        } 
    };

    //pass in the necessary HTTP request as 'method'
    function updateDatabase(method) {
console.log(ticket)
console.log(ticket.ticketId)
        fetch(
            `http://localhost:8080/purchases/${purchase.purchaseId}/add?ticketId=${ticket.ticketId}`,
            {
                method: method,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("bad response");
                }
                return response.json();
            })
            .then((ticket) => {
console.log(ticket);
            })
            .catch((error) => {
                console.error(error);
            });
    }




    console.log(purchasedTicketsArray + ": chair")
</script>

<Checkbox {style} on:check={handleCheck} />
