// SPDX-License-Identifier: none
pragma solidity ^0.8.9;

import "../Abstracts/BaseRelayRecipient.sol";

contract CaptureTheFlags is BaseRelayRecipient {
  event FlagCaptured(address previousHolder, address currentHolder);

  constructor(address forwarder_) {
    _setTrustedForwarder(forwarder_);
  }

  address public currentHolder = address(0);
  
  function captureTheFlags() external {
    address previousHolder = currentHolder;
    currentHolder = _msgSender();
    emit FlagCaptured(previousHolder, currentHolder);
  }

  function getCurrentHolder() public view virtual returns(address) {
    return currentHolder;
  }
}