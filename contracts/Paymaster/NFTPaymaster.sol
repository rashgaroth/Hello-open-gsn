//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "../Interfaces/IERC1155Limit.sol";
import "./AcceptEverythingPaymaster.sol";

contract NftPaymaster is AcceptEverythingPaymaster {
    address public immutable nftTarget;

    constructor(
        address nft_
    ){
        nftTarget = nft_;
    }

    function preRelayedCall(
        GsnTypes.RelayRequest calldata relayRequest,
        bytes calldata signature,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    )
    external
    override
    virtual
    returns (bytes memory context, bool revertOnRecipientRevert) {
        (signature, maxPossibleGas);
        require(approvalData.length == 0, "approvalData: invalid length");
        require(relayRequest.relayData.paymasterData.length == 0, "paymasterData: invalid length");

        address fromTx = relayRequest.request.from;
        address targetTx = relayRequest.request.to;

        require(targetTx == nftTarget, "target is not targetted to nft address");
        require(
            IERC1155Limit(nftTarget).totalGaslessUsage(fromTx) <
            IERC1155Limit(nftTarget).maxGaslessUsage(), "from gasless quota has been exceeded"
        );
        
        return ("", false);
    }
}
