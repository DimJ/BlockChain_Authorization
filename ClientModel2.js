/*
* Model 2: Smart contract handling authorization requests and encoding authorization policies.
*
* The Client-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
*/
const http = require('http')
const Client = require('./client-side/ClientFunctionsModel2.js') // Behavior of the Client.

Client.initialize() // Execute initialize if we have to.

Client.step1() // Start the protocol.

Client.Scenario2_PaymentContractEvents.events.SetInformationEvent( 
    {fromBlock: "latest"},
    function(error, result) {
        if (!error)
        {
            console.log("Step 3 conmplete");
            console.log(result.returnValues)
            console.log(" ---- ");
            console.log("Starting Step 4: Deposit.");
            Client.step4(result.returnValues.price)
        }
        else
        {
            console.log(error);
        }
    }
)

Client.Scenario2_PaymentContractEvents.events.ValidationAndPaymentEvent( 
    {fromBlock: "latest"},
    function(error, result) {
        if (!error)
        {
            console.log("Step 6 conmplete");
            console.log(result.returnValues)
            console.log(" ---- The protocol is complete. ");
            process.exit() // STOP THE CURRENT SCRIPT
        }
        else
        {
            console.log(error);
        }
    }
)
