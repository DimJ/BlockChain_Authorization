/*
* Model 1: Authorization Grants are linked to Blockchain payments and the hashes of the authorization
* information exchanged are recorded on the blockchain for verification, in the case of disputes.
* 
* The Agent-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
*/
const http = require('http')
const port = 3000
const host = '127.0.0.1'
const Agent = require('./agent-side/AgentFunctionsModel1.js') // Behavior of the Agent.

const server = http.createServer( Agent.serveRequest ); // Create the HTTP server.
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)

Agent.intialize(1, 2) // Execute initialize first.

// EVENTS
// Agent.Scenario1_PaymentContractEvents.events.DepositEvent( // Listener for Deposit event
// 	{fromBlock: "latest"},
// 	function(error, result) {
//     	if (!error)
//         {
//             console.log("Step 4 complete");
//             console.log(result.returnValues)
//             console.log(" ---- ");
//             console.log("Starting Step 5: Validation and payment.");
//             Agent.step5( Agent.sectetKey, Agent.paymentAccountAddress )
//         }
//         else
//         {
//             console.log(error);
//         }
//     }
// )

