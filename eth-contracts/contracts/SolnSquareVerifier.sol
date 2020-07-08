pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract solnSquareVerifier is ERC721Mintable {
  struct Solution {
    uint256 index;
    address adr;
    bool submitted;
  }

  Solution[] solutions;
  uint256 counter = 1;

  mapping(bytes32 => Solution) uniqueSolutions;

  event AddedSolution(uint256 index, address adr);

  modifier isUniqueSolution(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  ) {
    bytes32 key = getSolutionKey(a, b, c, input);
    require(!uniqueSolutions[key].submitted, "Solution already submitted.");
    _;
  }

  function addSolution(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  ) public isUniqueSolution(a, b, c, input) {
    bytes32 key = getSolutionKey(a, b, c, input);
    uniqueSolutions[key] = Solution({
      index: counter,
      adr: msg.sender,
      submitted: true
    });

    counter += 1;
    emit AddedSolution(uniqueSolutions[key].index, msg.sender);
  }

  function mintAfterVerification(
    address to,
    uint256 tokenId,
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  ) public isUniqueSolution(a, b, c, input) {
    addSolution(a, b, c, input);
    super.mint(to, tokenId);
  }

  function getSolutionKey(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  ) internal pure returns(bytes32) {
    return keccak256(abi.encodePacked(a, b, c, input));
  }
}
