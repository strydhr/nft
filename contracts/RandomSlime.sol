// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "base64-sol/base64.sol";

contract Spunggy is ERC721URIStorage,VRFConsumerBase{

  bytes32 public keyHash;
  uint256 public fee;

  constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash, uint256 _fee) VRFConsumerBase() ERC721 ("Spunggy","SPUNGGY"){
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    keyHash = _keyHash;
    fee = _fee;

  }

  function create() public return (bytes32 requestId){
    requestId = requestRandomness(keyHash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomNumber)internal override{
    
  }

}
