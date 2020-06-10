/*
* Model 2: Smart contract handling authorization requests and encoding authorization policies.
*
* The agent-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
* This script includes the funtions.
*/
var Agent = {
	
	intialize : function()
	{
		if (typeof Agent.initialized === "undefined") 
	    {	
	    	Agent.generalVariables()
	    	Agent.createEthereumVariables()
	    	Agent.createEthereumObjects()
		}
	},

	generalVariables : function()
	{
		Agent.http = require('http')
		Agent.scenario2RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario2"
		Agent.privateEthereumHttpEndpoint = "http://localhost:8572"
		Agent.privateEthereumWsEndpoint = "ws://localhost:8574"
    	Agent.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the communication with the Ethereum node.
		Agent.scenario2ContractAbi = require( "../smart-contracts/Scenario2_PaymentContract.js" ) 
		Agent.scenario2ContractAddress = "0x602e9d20bdee910a4b75df2b6782c4b67ebab7cc"
		Agent.myAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d"
		Agent.myAccountPassword = "t0phost4m3*"
		Agent.paymentAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d"
		Agent.Creator = require( "../initial-setup/CreateContracts.js" )

		/* We store the secret key, in order to send it after Deposit event */
		Agent.sectetKey = "" 
	},
	
	createEthereumObjects : function()
	{
		Agent.Web3Creator = new Agent.Creator(Agent.privateEthereumHttpEndpoint, Agent.privateEthereumWsEndpoint);
		Agent.Scenario2_PaymentContract = Agent.Web3Creator.createSmartContract(Agent.scenario2ContractAbi, Agent.scenario2ContractAddress)
		Agent.Scenario2_PaymentContractEvents = Agent.Web3Creator.createSmartContractForEvents(Agent.scenario2ContractAbi, Agent.scenario2ContractAddress)
	},

	step3 : function( jsonInput )
	{
		Agent.intialize()
		console.log("- (AuthorizationChain) Set Information ")
		Agent.Web3Creator.returnWeb3().eth.personal.unlockAccount( Agent.myAccountAddress, Agent.myAccountPassword, 600)
		.then( () => {
			let hashOfKey = "0x"+jsonInput.h;	        
			Agent.Scenario2_PaymentContract.methods.setInformation(jsonInput.e_thing_pop, jsonInput.e_s_token, jsonInput.e_client_pop, hashOfKey, jsonInput.price).send({from:Agent.myAccountAddress, gas:3000000})		 
		})
	},

	step5 : function(secretKey, paymentAccountAddress)
	{
		Agent.intialize()
		console.log("- (PaymentChain) Validation and Payment for secret-key: "+secretKey)
		Agent.Web3Creator.returnWeb3().eth.personal.unlockAccount( Agent.myAccountAddress, Agent.myAccountPassword, 600)
		.then( () => {
			Agent.Scenario2_PaymentContract.methods.validationAndPayment(secretKey, paymentAccountAddress).send({from:Agent.myAccountAddress, gas:3000000})
		})
	}


}

module.exports = Agent
