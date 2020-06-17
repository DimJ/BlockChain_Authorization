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
	    	Agent.AccountsManagement = require( "../account-management/accountManagement.js" ) 
	    	Agent.AccountsManagement.initialize()
			
			Agent.myAccountAddress = Agent.AccountsManagement.getAccountWithCode(myAccountCode)[0]
			Agent.myAccountPassword = Agent.AccountsManagement.getAccountWithCode(myAccountCode)[1]
			Agent.myAccountKeystore = Agent.AccountsManagement.getAccountWithCode(myAccountCode)[2]

			Agent.paymentAccountAddress = Agent.AccountsManagement.getAccountWithCode(myPaymentAccount)[0]

	    	Agent.generalVariables()
	    	Agent.createEthereumVariables()
	    	Agent.createEthereumObjects()
		}
	},

	generalVariables : function()
	{
		Agent.http = require('http')
		Agent.scenario2RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario2"
		Agent.privateEthereumHttpEndpoint = "https://rinkeby.infura.io/v3/07b06e4e587148a68c9cc836f97efb4f"
		Agent.privateEthereumWsEndpoint = "wss://rinkeby.infura.io/ws/v3/07b06e4e587148a68c9cc836f97efb4f"
    	Agent.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the communication with the Ethereum node.
		Agent.scenario2ContractAbi = require( "../smart-contracts/Scenario2_PaymentContract.js" ) 
		Agent.scenario2ContractAddress = "0x0c36278f46e4e7e5b927c217cbd90d5d73b7b9f8"

		Agent.Creator = require( "../initial-setup/CreateContracts.js" )
		Agent.CreateTransaction = require( "../initial-setup/CreateTransactions.js" )

		Agent.GAS = 3000000
		Agent.GAS_PRICE = 50000000000
		Agent.RINKEBY_CHAIN_ID = 4
		Agent.AUTHORIZATION_PRIVATE_CHAIN_ID = 30
		// AgentDistributed.PAYMENT_PRIVATE_CHAIN_ID = 31
		Agent.PAYMENT_PRIVATE_CHAIN_ID = 4 

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

		Agent.Web3Creator.returnWeb3().eth.getTransactionCount( Agent.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let hashOfKey = "0x"+jsonInput.h;
			let data = Agent.Scenario2_PaymentContract.methods.setInformation(jsonInput.e_thing_pop, jsonInput.e_s_token, jsonInput.e_client_pop, hashOfKey, jsonInput.price).encodeABI()
			let rawTransaction = Agent.CreateTransaction.getTransaction(lastPaymentTrxNumber, Agent.myAccountAddress, Agent.scenario2ContractAddress, 0, Agent.GAS, Agent.GAS_PRICE, Agent.PAYMENT_PRIVATE_CHAIN_ID, data)
			Agent.CreateTransaction.sendTransaction(Agent.decryptedAccount, rawTransaction, Agent.Web3Creator.returnWeb3() )
		});

	},

	step5 : function(secretKey, paymentAccountAddress)
	{
		Agent.intialize()
		console.log("- (PaymentChain) Validation and Payment for secret-key: "+secretKey)
		
		Agent.Web3Creator.returnWeb3().eth.getTransactionCount( Agent.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Agent.Scenario2_PaymentContract.methods.validationAndPayment(secretKey, paymentAccountAddress).encodeABI()
			let rawTransaction = Agent.CreateTransaction.getTransaction(lastPaymentTrxNumber, Agent.myAccountAddress, Agent.scenario2ContractAddress, 0, Agent.GAS, Agent.GAS_PRICE, Agent.PAYMENT_PRIVATE_CHAIN_ID, data)
			Agent.CreateTransaction.sendTransaction(Agent.decryptedAccount, rawTransaction, Agent.Web3Creator.returnWeb3() )
		});
	}


}

module.exports = Agent
