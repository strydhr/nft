// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract Slime is ERC721URIStorage{
  uint256 public tokenCounter;
  event CreatedSlimNFT(uint256 indexed tokenId, string tokenURI);

  constructor() ERC721 ("Slime","SLIME"){
    tokenCounter = 0;

  }
  function create(string memory svg) public{
    _safeMint(msg.sender, tokenCounter);
    //imageURI
    string memory imageURI = svgToImageURI(svg);
    string memory tokenURI = formatTokenURI(imageURI);
    _setTokenURI(tokenCounter,tokenURI);
    emit CreatedSlimNFT(tokenCounter,tokenURI);
    tokenCounter = tokenCounter + 1;
  }

  function svgToImageURI(string memory svg)public pure returns (string memory){
    string memory baseURL = "data:image/svg+xml;base64,";
    string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
    string memory imageURI = string(abi.encodePacked(baseURL, svgBase64Encoded));

    return imageURI;
  }

  function formatTokenURI(string memory imageURI)public pure returns(string memory){
    string memory baseURL = "data:application/json;base64,";
    return string(abi.encodePacked(
      baseURL,
      Base64.encode(
          bytes(abi.encodePacked(
            '{"name":"SLIME",',
            '"description":"Sats NFT",',
            '"attributes":"",',
            '"image":"',imageURI,'"}'
          ))
      )
    ));
  }

}
