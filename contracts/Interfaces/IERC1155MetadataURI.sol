import "./IERC1155.sol";

// SPDX-License-Identifier: none

pragma solidity ^0.8.9;

interface IERC1155MetadataURI is IERC1155 {
    function uri(uint256 id) external view returns (string memory);
}