/*
This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "truffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
*/
let Membership = artifacts.require('Membership.sol')
let { catchRevert } = require("./exceptionsHelpers.js")

contract('Membership', function(accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const chad = accounts[3]

    let instance

    beforeEach(async () => {
      instance = await Membership.new()
    })

    it("should make Owner a member upon deployment", async() => {
      const checkOwner = await instance.enrolled.call(owner);
      assert.equal(checkOwner, true, 'Owner does not match the expected member address value')
    })

    it("should emit a LogMember event when a new member is added", async()=> {
        let eventEmitted = false     
        const tx = await instance.newMember({from: alice})
        if (tx.logs[0].event == "LogMember") {
            eventEmitted = true
        }
        assert.equal(eventEmitted, true, 'adding a member should emit a LogMember event')
    })

    it("should emit a LogGift event when a new membership is gifted", async()=> {
        let eventEmitted = false
        const tx = await instance.giftMembership(alice, {from: owner})
        if (tx.logs[0].event == "LogGift") {
            eventEmitted = true
        }
        assert.equal(eventEmitted, true, 'gifting membership should emit a LogGift event')
    })

    it("should allow Alice, Bob and Chad to become members", async() => {
        await instance.newMember({from: alice});
        const checkAlice = await instance.enrolled.call(alice);
        await instance.newMember({from: bob})
        const checkBob = await instance.enrolled.call(bob);
        await instance.newMember({from: chad})
        const checkChad = await instance.enrolled.call(chad);

        const tokenIdAlice = await instance.tokenId(alice);
        const tokenIdBob = await instance.tokenId(bob); 
        const tokenIdChad = await instance.tokenId(chad); 

        const checkAliceAgain = await instance.members(tokenIdAlice);
        const checkBobAgain = await instance.members(tokenIdBob);
        const checkChadAgain = await instance.members(tokenIdChad);

        assert.equal(checkAlice, true, 'Alice is not enrolled')
        assert.equal(checkBob, true, 'Bob is not enrolled')
        assert.equal(checkChad, true, 'Chad is not enrolled')
        assert.equal(checkAliceAgain, alice, 'Alice token Id does not correspond to their address')
        assert.equal(checkBobAgain, bob, 'Bob token Id does not correspond to their address')
        assert.equal(checkChadAgain, chad, 'Chad token Id does not correspond to their address')
    })

    it("should allow Owner to remove a member", async() => {
        await instance.newMember({from: alice});
        await instance.newMember({from: bob});
        await instance.newMember({from: chad});

        const theMembersBefore = await instance.getMembers({from: owner});
        await instance.removeMember(bob, {from: owner});
        const theMembersAfter = await instance.getMembers({from: owner});
        const tokenIdBob = await instance.tokenId(bob); 
        const memberBob = await instance.members(tokenIdBob);

        assert.notEqual(memberBob, bob, "Member bob was not removed from member array")
        assert.notEqual(theMembersBefore, theMembersAfter, "Member Bob should have been removed")
    })

    it("should error if address that is not Owner tries to remove a member", async() => {
        await instance.newMember({from: alice});
        await instance.newMember({from: bob});
        await instance.newMember({from: chad});

        // const theMembersBefore = await instance.getMembers({from: alice});
        await catchRevert(instance.removeMember(bob, {from: alice}));
        // const theMembersAfter = await instance.getMembers({from: alice});
    })

    it("should error if address that is not a member tries to gift membership", async() => {
        await catchRevert(instance.giftMembership(alice, {from: bob}));
    })

    it("should not allow member to transfer token", async() => {
        await instance.newMember({from: alice});
        const tokenIdAlice = await instance.tokenId(alice);
        const tx = await catchRevert(instance.transferFrom(alice, owner, tokenIdAlice));
    })
})

