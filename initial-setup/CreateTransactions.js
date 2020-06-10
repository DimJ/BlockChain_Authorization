/*
*	Create and sign transactions. We will also handle wallet-operations.
*/
var CreateTransactions = {

	getTransaction : function(nonce, from, to, value, gas, gasPrice, chainId, data)
	{
		const rawTransaction = {
			"nonce":nonce,
			"from": from,
			"to": to,
			"value": value,
			"gas": gas,
			"gasPrice": gasPrice,
			"chainId": chainId,
			"data":data
		}
		return rawTransaction
	},

	sendTransaction : function( decryptedAccount, rawTransaction, web3 )
	{
		decryptedAccount.signTransaction(rawTransaction)
		.then(signedTx => 
		{
			console.log( signedTx.transactionHash );
			web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		})
		.catch(err => console.log("the err: "+err));	
	}
}

module.exports = CreateTransactions
