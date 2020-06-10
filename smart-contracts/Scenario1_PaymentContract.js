/*
* 	The abi for Scenario1_PaymentContract.
*/

var Scenario1PaymentContract_ABI = [
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
		"inputs": [],
		"name": "deposit2",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"inputs": [
			{
				"name": "h",
				"type": "bytes32"
			},
			{
				"name": "rest_of_payment",
				"type": "bytes32"
			}
		],
		"name": "setHashLock",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "h",
				"type": "bytes32"
			},
			{
				"name": "rest_of_payment",
				"type": "bytes32"
			}
		],
		"name": "setHashLock2",
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
		"name": "SetHashLockEvent",
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
		"name": "validationAndPayment2",
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
				"name": "validationResult",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "key",
				"type": "string"
			}
		],
		"name": "ValidationAndPaymentEvent",
		"type": "event"
	}
];

module.exports = Scenario1PaymentContract_ABI