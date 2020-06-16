class Creator {
	
	constructor(httpEndpoint, wsEndpoint)
	{
		this.Web3 = require('web3');
		//this.Personal = require('web3-eth-personal');

		this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(httpEndpoint))
		this.web3Ws = new this.Web3(wsEndpoint);
		//this.personal = new this.Personal("ws://localhost:8573")		
	}

	returnWeb3()
	{
		return this.web3;
	}

	// returnWeb3()
	// {
	// 	return this.web3Ws;
	// }

	// returnPersonal()
	// {
	// 	return this.personal;
	// }

	createSmartContract( abi, address )
	{
		return (new this.web3.eth.Contract( abi , address ));
	}

	createSmartContractForEvents( abi, address )
	{
		return (new this.web3Ws.eth.Contract( abi , address ));
	}
}

module.exports = Creator