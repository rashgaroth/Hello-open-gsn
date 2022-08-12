// SPDX-License-Identifier: none

pragma solidity ^0.8.9;

interface IERC1155Limit{
  function balanceOf(address account,uint256 id) external view returns(uint256);
  function balanceOfBatch(address[] memory accounts,uint256[] memory ids) external view returns(uint256[] memory);
  function burn(uint256 id,uint256 value) external;
  function burnBatch(uint256[] memory ids,uint256[] memory values) external;
  function claimNft() external;
  function exists(uint256 id) external view returns(bool);
  function isApprovedForAll(address account,address operator) external view returns(bool);
  function isTrustedForwarder(address forwarder) external view returns(bool);
  function maxGaslessUsage() external pure returns(uint256);
  function name() external view returns(string memory);
  function safeBatchTransferFrom(address from,address to,uint256[] memory ids,uint256[] memory amounts,bytes memory data) external;
  function safeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes memory data) external;
  function setApprovalForAll(address operator,bool approved) external;
  function supportsInterface(bytes4 interfaceId) external view returns(bool);
  function symbol() external view returns(string memory);
  function totalGaslessUsage(address user) external view returns(uint256);
  function totalSupply() external view returns(uint256);
  function totalSupply(uint256 id) external view returns(uint256);
  function trustedForwarder() external view returns(address);
  function uri(uint256 id) external view returns(string memory);
  function versionRecipient() external view returns(string memory);
}