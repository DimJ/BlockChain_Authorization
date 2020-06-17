/*
* Model 1: Authorization Grants are linked to Blockchain payments and the hashes of the authorization
* information exchanged are recorded on the blockchain for verification, in the case of disputes.
* 
* The Agent-side of the protocol. This module connects with the Authorization-Server to get JWS/CWT tokens.
* This script includes the funtions.
*/

var Agent = {
	
	intialize : function(myAccountCode, myPaymentAccount)
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
		else 
			console.log("- Object Initialized")	
	},

	generalVariables : function()
	{
		Agent.http = require('http')
		Agent.scenario1RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario1"
		Agent.privateEthereumHttpEndpoint = "https://rinkeby.infura.io/v3/07b06e4e587148a68c9cc836f97efb4f"
		Agent.privateEthereumWsEndpoint = "wss://rinkeby.infura.io/ws/v3/07b06e4e587148a68c9cc836f97efb4f"
    	Agent.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the comminication with the Ethereum node.
		Agent.scenario1ContractAbi = require( "../smart-contracts/Scenario1_PaymentContract.js" ) 
		Agent.scenario1ContractAddress = "0x302c5573c0a164a7927f3addad0f9b64de971937"

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
		Agent.Web3Creator = new Agent.Creator(Agent.privateEthereumHttpEndpoint, Agent.privateEthereumWsEndpoint)
		Agent.Scenario1_PaymentContract = Agent.Web3Creator.createSmartContract(Agent.scenario1ContractAbi, Agent.scenario1ContractAddress)
		Agent.Scenario1_PaymentContractEvents = Agent.Web3Creator.createSmartContractForEvents(Agent.scenario1ContractAbi, Agent.scenario1ContractAddress)
	
		Agent.decryptedAccount = Agent.Web3Creator.returnWeb3().eth.accounts.decrypt(Agent.myAccountKeystore, Agent.myAccountPassword)

	},

	serveRequest : function(request, response)
	{
		Agent.intialize()

		if (request.method == 'GET') 
		{
			console.log("Request came");
					
			Agent.http.get(Agent.scenario1RequestForCWT, (resp) => {
				let data = '';
				// A chunk of data has been recieved.
				resp.on('data', (chunk) => {
					data += chunk;
				});
				// The whole response has been received. Print out the result.
				resp.on('end', () => {
			   		//console.log(JSON.parse(data));
			   		dataInJson = JSON.parse(data)
			   		Agent.sectetKey = dataInJson.s_key // store the secret key
			   		console.log("Secret key is "+Agent.sectetKey)
			   		delete dataInJson.s_key // remove it, before we send the response to client

			   		response.statusCode = 200
					response.setHeader('Content-Type', 'text/plain')
					response.end(JSON.stringify(dataInJson))
					Agent.step3(dataInJson)

					console.log();
				});
			}).on("error", (err) => {
				console.log("Error: " + err.message);
			});

		}
	},

	step3 : function( jsonInput )
	{
		Agent.intialize()

		let hashOfKey = "0x"+jsonInput.h;
	    let hashOfRestInfo = "0x"+jsonInput.rest_of_info_hash;

		Agent.Web3Creator.returnWeb3().eth.getTransactionCount( Agent.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Agent.Scenario1_PaymentContract.methods.setHashLock(hashOfKey, hashOfRestInfo).encodeABI()
			let rawTransaction = Agent.CreateTransaction.getTransaction(lastPaymentTrxNumber, Agent.myAccountAddress, Agent.scenario1ContractAddress, 0, Agent.GAS, Agent.GAS_PRICE, Agent.PAYMENT_PRIVATE_CHAIN_ID, data)
			Agent.CreateTransaction.sendTransaction(Agent.decryptedAccount, rawTransaction, Agent.Web3Creator.returnWeb3() )
		});

	},

	step5 : function( secretKey, paymentAccountAddress )
	{
		Agent.intialize()

		Agent.Web3Creator.returnWeb3().eth.getTransactionCount( Agent.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Agent.Scenario1_PaymentContract.methods.validationAndPayment(secretKey, paymentAccountAddress).encodeABI()
			let rawTransaction = Agent.CreateTransaction.getTransaction(lastPaymentTrxNumber, Agent.myAccountAddress, Agent.scenario1ContractAddress, 0, Agent.GAS, Agent.GAS_PRICE, Agent.PAYMENT_PRIVATE_CHAIN_ID, data)
			Agent.CreateTransaction.sendTransaction(Agent.decryptedAccount, rawTransaction, Agent.Web3Creator.returnWeb3() )
		});
	}

}

module.exports = Agent
