import "./BaseRelayRecipient.sol";

// SPDX-License-Identifier: none

pragma solidity ^0.8.9;

abstract contract Managable is BaseRelayRecipient {
    address private _owner;

    mapping (address => bool) private _manager;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ImplementManager(address indexed user, bool indexed status);

    constructor() {
        _transferOwnership(_msgSender());
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function isManager(address user) public view virtual returns (bool) {
        return _manager[user];
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Managable: caller is not the owner");
        _;
    }

    modifier onlyManager() {
        require(
            owner() == _msgSender() ||
            isManager(_msgSender()),
            "Managable: caller is not the Manager");
        _;
    }

    function setManager(address user, bool status) public virtual onlyOwner {
        _manager[user] = status;
        emit ImplementManager(user, status);
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Managable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}