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

    describe('images', async() => {
        let result, imageCount
        const imageHash = "QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb"

        before(async() => {
            result = pShare.uploadImage(imageHash, "Image Description", {from: author})
            imageCount = pShare.imageCount()
        })

        // check event
        it('uploads images', async() => {

            // SUCCESS
            assert.equal(imageCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), imageCount.toNumber(), "id is correct")
            assert.equal(event.imageHash, imageHash, "Image hash is correct")
            assert.equal(event.description, "Image Description", "Image description is correct")
            assert.equal(event.tipAmount, '0', "Tip amount is correct")
            assert.equal(event.author, author, "Author is correct")

            // FAILURE: Image must have hash
            await pShare.uploadImage("", "Image Description", {from: author}).should.be.rejected;

            // FAILURE: Image must have description
            await pShare.uploadImage(imageHash, "", {from: author}).should.be.rejected;

        })

        // check from Struct
        it('lists images', async() => {
            const image = await pShare.images(imageCount)
            assert.equal(image.id.toNumber(), imageCount.toNumber(), "id is correct")
            assert.equal(image.imageHash, imageHash, "Image hash is correct")
            assert.equal(image.description, "Image Description", "Image description is correct")
            assert.equal(image.tipAmount, '0', "Tip amount is correct")
            assert.equal(image.author, author, "Author is correct")
        })

        it('allows users to tip images', async() => {

            // trak the author balance before purchase
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await pShare.tipImageOwner(imageCount, {from: tipper, value: web3.utils.toWei('1', 'Ether')} )

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), imageCount.toNumber(), "id is correct")
            assert.equal(event.imageHash, imageHash, "Image hash is correct")
            assert.equal(event.description, "Image Description", "Image description is correct")
            assert.equal(event.tipAmount, '1000000000000000000', "Tip amount is correct")
            assert.equal(event.author, author, "Author is correct")

            // check if author received funds
            let newAuthorBalance
            newAuthorBlaance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipImageOwner
            tipImageOwner = await web3.utils.toWei('1', 'Ether')
            tipImageOwner = new web3.utils.BN(tipImageOwner)

            const expectedBalance = oldAuthorBalance.add(tipImageOwner)

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

            // FAILURE: Try to tip an image that does not exist
            await pShare.tipImageOwner(99, {from: tipper, value: web3.utils.toWei('1', 'Ether')} ).should.be.rejected;
        })
    })
})