/*
* Model 2: Smart contract handling authorization requests and encoding authorization policies.
* 
* The Agent-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
*/
const http = require('http')
const Agent = require('./agent-side/AgentFunctionsModel2.js') // Behavior of the Agent.

Agent.intialize() // Execute initialize if we have to.

// EVENTS
Agent.Scenario2_PaymentContractEvents.events.RequestEvent( // Listener for Request event.
    {fromBlock: "latest"},
    function(error, result) {
        if (!error)
        {
            console.log("\n");
            console.log("Step 1 complete");
            console.log(" ---- ");
            console.log("Starting Step 1: SetInformation.");
            
            http.get(Agent.scenario2RequestForCWT, (resp) => {
                 let data = '';
                 // A chunk of data has been recieved.
                 resp.on('data', (chunk) => {
                     data += chunk;
                 });
                 // The whole response has been received. Print out the result.
                 resp.on('end', () => {
                     dataInJson = JSON.parse(data)
                     Agent.secretKey = dataInJson.s_key // store the secret key
                     console.log("Secret key is "+Agent.secretKey)
                     delete dataInJson.s_key // remove it, before we send the response to client
                     Agent.step3(dataInJson)
                 });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

            // ---------------------------------------------------------------
        }
        else
        {
            console.log(error);
        }
    }
)

Agent.Scenario2_PaymentContractEvents.events.DepositEvent( // Listener for Deposit event
	{fromBlock: "latest"},
	function(error, result) {
    	if (!error)
        {
            console.log("Step 4 conmplete");
            console.log(result.returnValues)
            console.log(" ---- ");
            console.log("Starting Step 5: Validation and payment.");
            Agent.step5( Agent.secretKey, Agent.paymentAccountAddress )
        }
        else
        {
            console.log(error);
        }
    }
)