/*
* 	The abi for Scenario1_PaymentContract.
*/

var Scenario2PaymentContract_ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "request",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "s_key",
				"type": "string"
			},
			{
				"name": "resource_owner",
				"type": "address"
			}
		],
		"name": "validationAndPayment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "refundClient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "EthingPoP",
				"type": "string"
			},
			{
				"name": "EsToken",
				"type": "string"
			},
			{
				"name": "EclientPoP",
				"type": "string"
			},
			{
				"name": "h",
				"type": "bytes32"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "setInformation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "result",
				"type": "bool"
			}
		],
		"name": "RequestEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "SetInformationEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "result",
				"type": "bool"
			}
		],
		"name": "DepositEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "result",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_EthingPoP",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_EsToken",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_EclientPoP",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_s_key",
				"type": "string"
			}
		],
		"name": "ValidationAndPaymentEvent",
		"type": "event"
	}
];

module.exports = Scenario2PaymentContract_ABI