var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // mint multiple tokens:
            for(let i = 1; i <= 3; i++) {
                await this.contract.mint(account_one, i, {
                    from: account_one
                });
            }
        });

        it('should return total supply', async function () {
            const result = await this.contract.totalSupply.call();
            assert.equal(result, 3, "Invalid supply count");
        })

        it('should get token balance', async function () {
            const result = await this.contract.balaceOf.call(account_one, {
                from: account_one
            });
            assert.equal(result, 3, "Invalid account balance");
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const result = await this.contract.tokenURI.call(1);
            assert.equal(result, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Invalid token URI");
        })

        it('should transfer token from one owner to another', async function () {
            try {
                await this.contract.transferFrom(account_one, account_two, 1, {
                    from: account_one
                });
            } catch(e) {

            }
            const result = await this.contract.ownerOf.call(1);

            assert.equal(result, account_two, "Invalid token owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let reverted = false;
            try {
                await this.contract.mint(account_two, 4, {
                    from: account_two
                });
            } catch(e) {
                reverted = true;
            }

            assert(reverted, "Invalid mint.");
        })

        it('should return contract owner', async function () {
            const result = await this.contract.getOwner.call();
            assert(result, account_one, "Invalid owner");
        });

    });
})