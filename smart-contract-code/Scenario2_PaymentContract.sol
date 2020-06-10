pragma solidity ^0.4.25;
 
contract Scenario2_PaymentContract {
   
    string _EthingPoP;
    string _EsToken;
    string _EclientPoP;
    uint256 _price;
    bytes32 _h;
    address _client;
    bool refund = false;
   
    bytes random;
   
    function request() public // STEP_1
    {
        emit RequestEvent(true);   
    }
   
    event RequestEvent ( // STEP_2
       bool result
    );
   
    function setInformation( string EthingPoP, string EsToken, string EclientPoP,  bytes32 h, uint256 price  ) public // STEP_3
    {
        _EthingPoP = EthingPoP;
        _EsToken = EsToken;
        _EclientPoP = EclientPoP; 
        _h = h;
        _price = price;
       
        emit SetInformationEvent(price);
    }
   
    event SetInformationEvent(  // STEP_4
        uint256 price
    );
   
    function deposit() payable public   // STEP_5
    {
        if( _price != msg.value )
            revert();
        _client = msg.sender;
        _price = msg.value;
        refund = true;
        emit DepositEvent(true);   
    }
   
    event DepositEvent (
       bool result
    );
   
    function validationAndPayment( string s_key, address resource_owner  ) public // STEP_6
    {
        bytes32 h = keccak256(abi.encodePacked(s_key));
       
        if( h ==_h )
        {
            resource_owner.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent( true, _EthingPoP, _EsToken, _EclientPoP, s_key );
        }
        else
        {
            _client.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent( false, "", "", "", "" );
        }
    }
   
    event ValidationAndPaymentEvent ( // STEP 7
        bool result,
        string _EthingPoP,
        string _EsToken,
        string _EclientPoP,
        string _s_key
    );
   
    function refundClient() public {
        if(refund)
            _client.transfer( address(this).balance );
    }
   
}