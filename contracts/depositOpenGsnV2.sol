import "./Interfaces/IRelayHub.sol";

// SPDX-License-Identifier: none

pragma solidity ^0.8.9;

contract depositorOpenGsnV2{
  address private immutable relayHub;

  constructor(
    address relayHub_
  ){
    relayHub = relayHub_;
  }

  function deposit(address paymaster) external payable {
    unchecked{
      uint256 valueDeposited = msg.value;
      uint256 getDepoLimit = getMaxDeposit();
      uint256 moduled = valueDeposited % getDepoLimit;
      uint256 valueSubbed = valueDeposited - moduled;
      uint256 loopFor = valueSubbed / getDepoLimit;

      for(uint256 a; a < loopFor; a++){
        IRelayHub(relayHub).depositFor{value: getDepoLimit}(paymaster);
      }

      if(moduled > 0){
        IRelayHub(relayHub).depositFor{value: moduled}(paymaster);
      }
    }
  }

  function getMaxDeposit() private view returns(uint256){
    return IRelayHub(relayHub).getConfiguration().maximumRecipientDeposit;
  }
}