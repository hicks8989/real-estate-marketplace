// Test if a new solution can be added for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract('SolnSquareVerifier', accounts => {

  const proof = require("./proof.json");
  const owner = accounts[0];

  describe('Match SolnSquareVerifier spec', () => {
    beforeEach(async function () {
      this.verifier = await Verifier.new({
        from: owner
      });
      this.contract = await SolnSquareVerifier.new(this.verifier.address, {
        from: owner
      });

      this.inputs = proof.inputs;
      this.proof = proof.proof;
    });

    it('Should allow user to mint with a correct solution', async function () {
      try {
        await this.contract.mintAfterVerification(
          owner, 1,
          this.proof.a, this.proof.b,
          this.proof.c, this.inputs,
          {
            from: owner
          });
      } catch(e) {
        console.log(e);
      }
      const result = await this.contract.ownerOf(1);
      assert.equal(result, owner, "Invalid token owner.");
    });
  });
});