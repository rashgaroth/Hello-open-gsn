// SPDX-License-Identifier: none

pragma solidity ^0.8.9;

abstract contract IRelayRecipient {
    function isTrustedForwarder(address forwarder) public virtual view returns(bool);

    function _msgSender() internal virtual view returns (address);

    function _msgData() internal virtual view returns (bytes calldata);

    function versionRecipient() external virtual view returns (string memory);
}