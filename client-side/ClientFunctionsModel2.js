/*
* Model 2: Smart contract handling authorization requests and encoding authorization policies.
*
* The Client-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
* This script includes the funtions.
*/
var Client = {
	
	initialize : function()
	{
		if (typeof Client.initialized === "undefined") 
	    {	
	    	Client.generalVariables()
	    	Client.createEthereumVariables()
	    	Client.createEthereumObjects()
		}
	},

	generalVariables : function()
	{
		Client.http = require('http')
		Client.scenario2RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario2"
		Client.privateEthereumHttpEndpoint = "http://localhost:8572"
		Client.privateEthereumWsEndpoint = "ws://localhost:8574"
    	Client.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the comminication with the Ethereum node.
		Client.scenario2ContractAbi = require( "../smart-contracts/Scenario2_PaymentContract.js" ) 
		Client.scenario2ContractAddress = "0x602e9d20bdee910a4b75df2b6782c4b67ebab7cc"
		Client.myAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d" 
		Client.myAccountPassword = "t0phost4m3*"
		Client.paymentAccountAddress = "0x097eb023e45f37160eab845302527b987689f33d"
		Client.Creator = require( "../initial-setup/CreateContracts.js" )
	},
	
	createEthereumObjects : function()
	{
		Client.Web3Creator = new Client.Creator(Client.privateEthereumHttpEndpoint, Client.privateEthereumWsEndpoint);
		Client.Scenario2_PaymentContract = Client.Web3Creator.createSmartContract(Client.scenario2ContractAbi, Client.scenario2ContractAddress)
		Client.Scenario2_PaymentContractEvents = Client.Web3Creator.createSmartContractForEvents(Client.scenario2ContractAbi, Client.scenario2ContractAddress)
	},

	step1 : function()
	{
		Client.initialize()
		console.log("- (AuthorizationChain) Request ")
		Client.Web3Creator.returnWeb3().eth.personal.unlockAccount( Client.myAccountAddress, Client.myAccountPassword, 600)
		.then( () => {
			Client.Scenario2_PaymentContract.methods.request().send({from:Client.myAccountAddress})
		});	
	},

	step4 : function(amount)
	{
		Client.initialize()
		console.log("- (PaymentChain) Deposit, amount: "+amount)
		Client.Web3Creator.returnWeb3().eth.personal.unlockAccount( Client.myAccountAddress, Client.myAccountPassword, 600)
		.then( () => {	      
			Client.Scenario2_PaymentContract.methods.deposit().send({from:Client.myAccountAddress, value:amount, gas:3000000})
		});	
	}

}

module.exports = Client
