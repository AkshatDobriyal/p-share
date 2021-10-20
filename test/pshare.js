const { assert } = require('console');
const { isTypedArray } = require('util/types');

const PShare = artifacts.require('./PShare.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('PShare', ([deployer, author, tipper]) => {
    let PShare

    before(async() => {
        pShare = await PShare.deployed() 
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await pShare.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await pShare.name()
            assert.equal(name, "PShare")
        })
    })
})