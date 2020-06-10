/*
* Model 1: Authorization Grants are linked to Blockchain payments and the hashes of the authorization
* information exchanged are recorded on the blockchain for verification, in the case of disputes.
*
* The Client-side of the protocol. This module will pay for JWS/CWT tokens.
*/
const http = require('http'); // use http protocol for server and client
const serverHttpRequest = "http://localhost:3000" // Agent's  address
const Client = require('./client-side/ClientFunctionsModel1.js') // Behavior of the Agent. 

Client.intialize() // Execute initialize if we have to.

Client.sendHttpRequest(serverHttpRequest) // Step 1 : Request for token from server.

// EVENTS
Client.Scenario1_PaymentContractEvents.events.SetHashLockEvent( // Listener for SetHashlock event
	{fromBlock: "latest"},
	function(error, result) {
    	if (!error)
        {
            console.log("Step 3 complete");
            console.log(result.returnValues)
            console.log(" ---- ");
            console.log("Starting Step 4: Deposit event.");
            
            // Send Deposit Transaction
            let amountToSend = 5000000000 // 5GWei
            Client.step4( amountToSend )
        }
        else
        {
            console.log(error);
        }
    }
)

Client.Scenario1_PaymentContractEvents.events.ValidationAndPaymentEvent( // Listener for ValidationAndPayment event
	{fromBlock: "latest"},
	function(error, result) {
    	if (!error)
        {
            console.log("Step 5 complete");
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
