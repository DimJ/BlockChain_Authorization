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
	},

	generalVariables : function()
	{
		Client.http = require('http')
		Client.scenario2RequestForCWT = "http://localhost/oauth2_sofie/cborToken.php?typeOfScenario=scenario2"
		Client.privateEthereumHttpEndpoint = "https://rinkeby.infura.io/v3/07b06e4e587148a68c9cc836f97efb4f"
		Client.privateEthereumWsEndpoint = "wss://rinkeby.infura.io/ws/v3/07b06e4e587148a68c9cc836f97efb4f"
    	Client.initialized = "initialized" // This object is initialized.
	}, 
	
	createEthereumVariables : function()
	{
		// The following variables are required for the comminication with the Ethereum node.
		Client.scenario2ContractAbi = require( "../smart-contracts/Scenario2_PaymentContract.js" ) 
		Client.scenario2ContractAddress = "0x602e9d20bdee910a4b75df2b6782c4b67ebab7cc"

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
		Client.Web3Creator = new Client.Creator(Client.privateEthereumHttpEndpoint, Client.privateEthereumWsEndpoint);
		Client.Scenario2_PaymentContract = Client.Web3Creator.createSmartContract(Client.scenario2ContractAbi, Client.scenario2ContractAddress)
		Client.Scenario2_PaymentContractEvents = Client.Web3Creator.createSmartContractForEvents(Client.scenario2ContractAbi, Client.scenario2ContractAddress)
	},

	step1 : function()
	{
		Client.initialize()
		console.log("- (AuthorizationChain) Request ")
		
		Client.Web3Creator.returnWeb3().eth.getTransactionCount( Client.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Client.Scenario2_PaymentContract.methods.request().encodeABI()
			let rawTransaction = Client.CreateTransaction.getTransaction(lastPaymentTrxNumber, Client.myAccountAddress, Client.scenario2ContractAddress, 0, Client.GAS, Client.GAS_PRICE, Client.PAYMENT_PRIVATE_CHAIN_ID, data)
			Client.CreateTransaction.sendTransaction(Client.decryptedAccount, rawTransaction, Client.Web3Creator.returnWeb3() )
		});
	},

	step4 : function(amount)
	{
		Client.initialize()
		console.log("- (PaymentChain) Deposit, amount: "+amount)
		
		Client.Web3Creator.returnWeb3().eth.getTransactionCount( Client.myAccountAddress, function(error, result){
			let lastPaymentTrxNumber = result;
			let data = Client.Scenario2_PaymentContract.methods.deposit().encodeABI()
			let rawTransaction = Client.CreateTransaction.getTransaction(lastPaymentTrxNumber, Client.myAccountAddress, Client.scenario2ContractAddress, amount, Client.GAS, Client.GAS_PRICE, Client.PAYMENT_PRIVATE_CHAIN_ID, data)
			Client.CreateTransaction.sendTransaction(Client.decryptedAccount, rawTransaction, Client.Web3Creator.returnWeb3() )
		});	
	}

}

module.exports = Client
