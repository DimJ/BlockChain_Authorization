/*
* Model 1: Authorization Grants are linked to Blockchain payments and the hashes of the authorization
* information exchanged are recorded on the blockchain for verification, in the case of disputes.
*
* The Client-side of the protocol. This module will pay for JWS/CWT tokens.
* This script includes the funtions.
*/

var Client = {
	
	intialize : function(myAccountCode, myPaymentAccount)
	{
		if (typeof Client.initialized === "undefined") 
	    {	
	    	Client.AccountsManagement = require( "../account-management/accountManagement.js" ) 
	    	Client.AccountsManagement.initialize()
			
			Client.myAccountAddress = Client.AccountsManagement.getAccountWithCode(myAccountCode)[0]
			Client.myAccountPassword = Client.AccountsManagement.getAccountWithCode(myAccountCode)[1]
			Client.myAccountKeystore = Client.AccountsManagement.getAccountWithCode(myAccountCode)[2]

			Client.paymentAccountAddress = Client.AccountsManagement.getAccountWithCode(myPaymentAccount)[0]

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
		Client.privateEthereumHttpEndpoint = "https://rinkeby.infura.io/v3/07b06e4e587148a68c9cc836f97efb4f"
		Client.privateEthereumWsEndpoint = "wss://rinkeby.infura.io/ws/v3/07b06e4e587148a68c9cc836f97efb4f"
    	Client.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the comminication with the Ethereum node.
		Client.scenario1ContractAbi = require( "../smart-contracts/Scenario1_PaymentContract.js" ) 
		Client.scenario1ContractAddress = "0x302c5573c0a164a7927f3addad0f9b64de971937"

		Client.Creator = require( "../initial-setup/CreateContracts.js" )
		Client.CreateTransaction = require( "../initial-setup/CreateTransactions.js" )

		Client.GAS = 3000000
		Client.GAS_PRICE = 50000000000
		Client.RINKEBY_CHAIN_ID = 4
		Client.AUTHORIZATION_PRIVATE_CHAIN_ID = 30
		// ClientDistributed.PAYMENT_PRIVATE_CHAIN_ID = 31
		Client.PAYMENT_PRIVATE_CHAIN_ID = 4 

		/* We store the secret key, in order to send it after Deposit event */
		Client.sectetKey = "" 
	},
	
	createEthereumObjects : function()
	{
		Client.Web3Creator = new Client.Creator(Client.privateEthereumHttpEndpoint, Client.privateEthereumWsEndpoint)
		Client.Scenario1_PaymentContract = Client.Web3Creator.createSmartContract(Client.scenario1ContractAbi, Client.scenario1ContractAddress)
		Client.Scenario1_PaymentContractEvents = Client.Web3Creator.createSmartContractForEvents(Client.scenario1ContractAbi, Client.scenario1ContractAddress)
	
		Client.decryptedAccount = Client.Web3Creator.returnWeb3().eth.accounts.decrypt(Client.myAccountKeystore, Client.myAccountPassword)

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
		Client.Web3Creator.returnWeb3().eth.getTransactionCount( Client.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Client.Scenario1_PaymentContract.methods.deposit().encodeABI()
			let rawTransaction = Client.CreateTransaction.getTransaction(lastPaymentTrxNumber, Client.myAccountAddress, Client.scenario1ContractAddress, amount, Client.GAS, Client.GAS_PRICE, Client.PAYMENT_PRIVATE_CHAIN_ID, data)
			Client.CreateTransaction.sendTransaction(Client.decryptedAccount, rawTransaction, Client.Web3Creator.returnWeb3() )
		});
	}

}

module.exports = Client
