pragma solidity ^0.4.25;
 
contract Scenario1_PaymentContract {
    
    bytes32 _h;
    bytes32 _rest_of_info;
    address _client;
    bool refund = false;
    
    function setHashLock( bytes32 h, bytes32 rest_of_payment ) public {  // STEP_3
        _h = h;
        _rest_of_info = rest_of_payment;
        emit SetHashLockEvent(true);
    }
    
    function setHashLock2( bytes32 h, bytes32 rest_of_payment ) external {  // STEP_3
        _h = h;
        _rest_of_info = rest_of_payment;
        emit SetHashLockEvent(true);
    }
    
    event SetHashLockEvent (
       bool result
    );
    
    function deposit() payable public {   // STEP_4
        _client = msg.sender;
        refund = true;
        emit DepositEvent(true);
    }
    
    function deposit2() payable external {   // STEP_4
        _client = msg.sender;
        refund = true;
        emit DepositEvent(true);
    }
    
    event DepositEvent (
       bool result
    );
    
    function validationAndPayment( string s_key, address resource_owner ) public {   // STEP_5
        bytes32 h = keccak256(abi.encodePacked(s_key));
        if( h==_h )
        {
            resource_owner.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent(true, s_key);
        }
        else
        {
            _client.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent(false, "error during validation");
        }
    }
    
    function validationAndPayment2( string s_key, address resource_owner ) external {   // STEP_5
        bytes32 h = keccak256(abi.encodePacked(s_key));
        if( h==_h )
        {
            resource_owner.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent(true, s_key);
        }
        else
        {
            _client.transfer( address(this).balance );
            refund = false;
            emit ValidationAndPaymentEvent(false, "error during validation");
        }
    }
    
    event ValidationAndPaymentEvent (   // STEP_6
       bool validationResult,
       string key
    );
    
    function refundClient() public {
        if(refund)
            _client.transfer( address(this).balance );
    }
    
}

