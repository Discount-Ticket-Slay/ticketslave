<script>
    import { Checkbox } from "carbon-components-svelte";

    export let ticket;
    export let purchasedTicketsArray;

    let reservationStatus = ticket.status;
    let sold = ticket.sold;
    let ticketId = ticket.ticketId
    $:console.log(ticketId)

    let buyable = !reservationStatus && !sold;

    /********************STYLING*********************/
    //If fully booked, the section will be faded out
    let color = buyable ? "#111" : "#ff0000";
    //If fully booked, the section will not be clickable
    let cursor = buyable ? "pointer" : "default";
    let clickable = buyable ? "auto" : "none";

    let style = `
    color: ${color};
    cursor: ${cursor};
    pointer-events: ${clickable};
    `;
    /********************STYLING*********************/

    const handleCheck = () => {
        //change the reservation status. if ticket becomes reserved by the user, add it to their cart.
        reservationStatus = !reservationStatus;
        if (reservationStatus) {
console.log("post pre")
            updateDatabase("POST", `http://www.ticketslave.org/tickets/${ticket.ticketId}/reserve`);
console.log("post post")
            purchasedTicketsArray.push(ticket);
        }
        else{
            updateDatabase("PUT", `http://www.ticketslave.org/tickets/${ticket.ticketId}/undoReserve`);
            purchasedTicketsArray.filter(item => item !== ticket);
        }
    };

    //pass in the necessary HTTP request as 'method'
    async function updateDatabase(method, uri) {
console.log(ticket)
console.log(ticket.ticketId)
        fetch(
            uri,
            {
                method: method,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("bad response");
                }
                //return response.json();
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

<Checkbox {style} on:check={handleCheck} checked={!buyable}/>


<style>
</style>
