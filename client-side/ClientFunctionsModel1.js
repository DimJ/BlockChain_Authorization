/*
* Model 1: Authorization Grants are linked to Blockchain payments and the hashes of the authorization
* information exchanged are recorded on the blockchain for verification, in the case of disputes.
*
* The Client-side of the protocol. This module will pay for JWS/CWT tokens.
* This script includes the funtions.
*/

var Client = {
	
	intialize : function()
	{
		if (typeof Client.initialized === "undefined") 
	    {	
	    	Client.generalVariables()
	    	Client.createEthereumVariables()
	    	Client.createEthereumObjects()
		}
		else 
			console.log("- Object Initialized")	
	},

	generalVariables : function()
	{
		Client.http = require('http')
		Client.scenario1RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario1"
		Client.privateEthereumHttpEndpoint = "http://localhost:8572"
		Client.privateEthereumWsEndpoint = "ws://localhost:8574"
    	Client.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the comminication with the Ethereum node.
		Client.scenario1ContractAbi = require( "../smart-contracts/Scenario1_PaymentContract.js" ) 
		Client.scenario1ContractAddress = "0x63b85ebb403ea8924001b508cd808cd37d5303e5"
		Client.myAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d" 
		Client.myAccountPassword = "t0phost4m3*"
		Client.paymentAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d"
		Client.Creator = require( "../initial-setup/CreateContracts.js" )
	},
	
	createEthereumObjects : function()
	{
		Client.Web3Creator = new Client.Creator(Client.privateEthereumHttpEndpoint, Client.privateEthereumWsEndpoint);
		Client.Scenario1_PaymentContract = Client.Web3Creator.createSmartContract(Client.scenario1ContractAbi, Client.scenario1ContractAddress)
		Client.Scenario1_PaymentContractEvents = Client.Web3Creator.createSmartContractForEvents(Client.scenario1ContractAbi, Client.scenario1ContractAddress)
	},

	sendHttpRequest : function(serverHttpRequest)
	{
		Client.http.get(serverHttpRequest, (resp) => {
			let data = '';
			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
			    data += chunk;
			});
			// The whole response has been received. Print out the result.
			resp.on('end', () => {
			    console.log(JSON.parse(data));
			});
		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		});
	},

	step4 : function( amount )
	{
		Client.Web3Creator.returnWeb3().eth.personal.unlockAccount( Client.myAccountAddress, Client.myAccountPassword, 600)
		.then( () => {
			console.log("Send transaction.")
			Client.Scenario1_PaymentContract.methods.deposit().send({from:Client.myAccountAddress, value:amount});
		})
	}

}

module.exports = Client
