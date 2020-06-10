/*
*	Handle accounts
*/
var AccountsManagement = {

	initialize : function()
	{
		AccountsManagement.account1 = "0x924dcb24d990b65040beec2476d36082f0cf3d5e"
		AccountsManagement.account1password = "t0phost4m3*"
		AccountsManagement.account1keystore = '{"address":"924dcb24d990b65040beec2476d36082f0cf3d5e","crypto":{"cipher":"aes-128-ctr","ciphertext":"032919cb31007a9e9ebddc8ff77a6562c4b09f721e6ae53ccae95e70cc40e961","cipherparams":{"iv":"92a45e4e8de94c0da48bad59d586a6b7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"09f6451ee86f168499955c2c5ccc5c5a4484390e27d260d89649ebc0356cc112"},"mac":"6cb0ce2679b7877aa0a6be78a10ef3d5185750d33dc15d252c94ec84dd88f99a"},"id":"b41e8141-b298-4ae5-9c37-33e5d8c5ee2c","version":3}'
		
		AccountsManagement.account2 = "0x0da5ff16859be641680389b92086f75aba77b543"
		AccountsManagement.account2password = "t1phost4m3*"
		AccountsManagement.account2keystore = '{"address":"0da5ff16859be641680389b92086f75aba77b543","crypto":{"cipher":"aes-128-ctr","ciphertext":"e9bd0e5ee53a3178d8107cd8d007efcaf4db4297d313755d31397064cd7e74a6","cipherparams":{"iv":"5f61c8c7bb2c999b9c6bace18965a17e"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"73c98e5e7cdab573b61b5fdc1010694cd79c7d7f41f696ef8dc30e7844bd2eee"},"mac":"7701b8627f41e3cc746ba9c542ba288591ab9625ed5e7b30da719440f1fdc2cc"},"id":"6574a465-8942-45e2-b12d-6120ec6160f1","version":3}'
	
		AccountsManagement.account3 = "0xfd7266e8a13c68049c713f4c4c4ed224bb5b0404"
		AccountsManagement.account3password = "t2phost4m3*"
		AccountsManagement.account3keystore = '{"address":"fd7266e8a13c68049c713f4c4c4ed224bb5b0404","crypto":{"cipher":"aes-128-ctr","ciphertext":"4ed9481194dd5300d094339bed7c17fa705b39906bda3b57883d41ad49f58ea4","cipherparams":{"iv":"cff2f8cbcbe0579d9b461c332827a2af"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"c2a443f61c5e4b26f52fa76d7aaf572626a482976c801ea0327b9cc80150fc39"},"mac":"a66a01199ef1850d1b3b02f53e544018a6ffed392b13a03e7c84324975034421"},"id":"a5e76bdd-8962-49ef-b316-df2500b5d57b","version":3}'
	
		AccountsManagement.account4 = "0xf290b1159723dd7f7313787905f19cb4b96d5367"
		AccountsManagement.account4password = "t3phost4m3*"
		AccountsManagement.account4keystore = '{"address":"f290b1159723dd7f7313787905f19cb4b96d5367","crypto":{"cipher":"aes-128-ctr","ciphertext":"7a05d13a5ce1a18c2bc75f261ff4c1f066f2859b17e34d71f4a7282c82132836","cipherparams":{"iv":"9edfa5bef094995900e387a5ce6e2e3d"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"c92466464107d46b6583946c3e281d816a41bc4313192da4eb6948e1b9e6b5ac"},"mac":"9ab8a02990a3a817c52b3ce2233c12f872e0b11e724f83937ca868c0171bbe5c"},"id":"adf6da4e-f686-4c78-8b12-f8ada2670450","version":3}'
				
		AccountsManagement.account5 = "0x49888089b3f045bd4a7f44c5bd905ed89a460187"
		AccountsManagement.account5password = "t4phost4m3*"
		AccountsManagement.account5keystore = '{"address":"49888089b3f045bd4a7f44c5bd905ed89a460187","crypto":{"cipher":"aes-128-ctr","ciphertext":"34597d22f6e4a29ff965a0fc96a016c96a6432cd1b0f91a5ba5a0173fb70eb8b","cipherparams":{"iv":"0bb195eaa0c2bc1d4b012b2893036c95"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"fb7a533a660458b938090dd9abe8db217eca969bbd02f0363326838406fb9e47"},"mac":"08984a6c4f97d9be4790848f7bd681d4c6e5b1e426339e141aff9a1f8ec3bd19"},"id":"b69f187a-ee29-40d4-bec7-7eb7c355d731","version":3}'
	
		AccountsManagement.account6 = "0x6107f25efd43c0bd915d75c3aef08ed58b7dedc1"
		AccountsManagement.account6password = "t5phost4m3*"
		AccountsManagement.account6keystore = '{"address":"6107f25efd43c0bd915d75c3aef08ed58b7dedc1","crypto":{"cipher":"aes-128-ctr","ciphertext":"da147fb8a94cc96b0b252701911632cd6c7501d66e67896cfc9e64a8a4bb2bc3","cipherparams":{"iv":"ac5b82f979991b8801613560daa17b9d"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"3c754a282eaaa0fc626b4ef42c47429099c9ab2c1af578c2ca17bcaa435134b2"},"mac":"760abd58478fbc36c55b50421c4253168fea3c0eb6a5f3a499c201819a1b5402"},"id":"b4695adf-572a-4e1c-81da-6a3c2b0eb486","version":3}'
	
		AccountsManagement.account7 = "0x857d560581e89ab5f84f2f69788254194b13249c"
		AccountsManagement.account7password = "t6phost4m3*"
		AccountsManagement.account7keystore = '{"address":"857d560581e89ab5f84f2f69788254194b13249c","crypto":{"cipher":"aes-128-ctr","ciphertext":"155c4963e3594b96aadb5508c0cfe186e52e81d106a96cafb7c048a536832fda","cipherparams":{"iv":"0813dc6d96a4625ff9833857bb8317a6"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"59fdbff0b330d693084c6a737afc262be378097bd02d310dfbb1ebea1c099901"},"mac":"d7e80a13e61f42fd85cb5200b04d81f3f3546ec14d6109623164667cdd329656"},"id":"422a61b3-6ddd-4d64-960e-b68c766062a4","version":3}'
	
		AccountsManagement.account8 = "0xb7c2af43bea04c085b81be8eeaeca64a7d290327"
		AccountsManagement.account8password = "t7phost4m3*"
		AccountsManagement.account8keystore = '{"address":"b7c2af43bea04c085b81be8eeaeca64a7d290327","crypto":{"cipher":"aes-128-ctr","ciphertext":"47452951f154cd1032f6dda18f78da84efa1ab3470a447d24211612ef784e356","cipherparams":{"iv":"6ed6517c2af52a3e47532af4df323bf6"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"160ba03cbe59e720cf83a105d74ab08aef6ff46a2bf95c17f96f324667667243"},"mac":"90737fa9c0eff390622f3f49fa6ad1217e91e23af6295fe7fd0e1ab2067a37cc"},"id":"cea5a99c-fdc1-427d-8a21-8c92d4f5cb49","version":3}'
	
		AccountsManagement.account9 = "0xea7f1604d23b1f70c8f1099901c489e602562265"
		AccountsManagement.account9password = "t0phost4m3*"
		AccountsManagement.account9keystore = '{"address":"ea7f1604d23b1f70c8f1099901c489e602562265","crypto":{"cipher":"aes-128-ctr","ciphertext":"b945c615c2b47079c248d5f7328357ba9d62fbf5eb2e6be5b1db3b1226525e9e","cipherparams":{"iv":"595e7c3be02dc09923fee2db852426ee"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"e37376e7fd8df351ec1685288c4fa6eed98125d6f04f88d256da1c17d66644f7"},"mac":"3b0c6a1a3a4188628662b494a3bff2e77547a85264b944858709c831e39ee8d5"},"id":"b60fe082-82f7-4649-b78d-c714aafc0f46","version":3}'
	
	},

	getAccountWithCode : function(code)
	{
		if(code==1)
			return [AccountsManagement.account1, AccountsManagement.account1password, AccountsManagement.account1keystore];
		else if(code==2)
			return [AccountsManagement.account2, AccountsManagement.account2password, AccountsManagement.account2keystore];
		else if(code==3)
			return [AccountsManagement.account3, AccountsManagement.account3password, AccountsManagement.account3keystore];
		else if(code==4)
			return [AccountsManagement.account4, AccountsManagement.account4password, AccountsManagement.account4keystore];
		else if(code==5)
			return [AccountsManagement.account5, AccountsManagement.account5password, AccountsManagement.account5keystore];
		else if(code==6)
			return [AccountsManagement.account6, AccountsManagement.account6password, AccountsManagement.account6keystore];
		else if(code==7)
			return [AccountsManagement.account7, AccountsManagement.account7password, AccountsManagement.account7keystore];
		else if(code==8)
			return [AccountsManagement.account8, AccountsManagement.account8password, AccountsManagement.account8keystore];
	}

}

module.exports = AccountsManagement
