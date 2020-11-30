#  Design Pattern Decisions

○  	Implemented a circuit breaker (emergency stop) pattern: 
   [Pausable.sol] (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/lifecycle/Pausable.sol)
    Openzepellin's pausable was implemented via inheritance for the owner to use in case gas costs become too high to issue new memberships, or in the event there is a major vulnerability discovered. This would allow other contract functions that may be of use to the owner or external contracts to migrate existing users to a revised or upgraded contract version.

○  	What other design patterns have you used / not used? 
   [Ownable.sol] (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/ownership/Ownable.sol)
    Openzepellin's ownable contract was implemented via inheritance to give contract owner the ability to Pause and Kill the contract, as well removing existing members.


   [ERC721.sol] (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC721/ERC721.sol)
    Openzepellin's ERC721 was implemented via inheritance to issue a membership token with no monetary value and whose approvals could be restricted such that these memberships are not transferrable, thus avoiding a secondary market for the membership if there were ever a price set by the owner. Notice the _mint() function is called upon enrolling new members but approve() is not. When a member is removed, the _burn() function assigns their tokenId to the burn address.

   [kill()] A kill function was implemented to allow the contract owner to call selfdestruct from their designated address

    ```bash
    function kill() 
    public onlyOwner()
    {
        selfdestruct(address(uint160(owner()))); // cast owner to address payable
    }
    ```
   [fallback()]
    A fallback() function which reverts was implemented to not allow accidental deposits into the contract, to prevent funds from becoming locked in the contract, and to protect the owner and members from trouble if funds were ever locked in a working membership contract.

    ```bash
    function fallback() external payable {
        revert();
    }
    ```

■  	Why did I choose the patterns?
    These patterns were chosen to reduce and mitigate attack vectors. The Openzepellin libraries are tried and tested, so they were preferred to modifiers that could serve similar purposes. 

■  	Why not others?
    It was relatively simple to import Openzepellin libraries with respect to others. The responsibilities of the owner were also taken into account, and an effort was made to reduce potential headaches. The purpose was building a rudimentary membership that can help users learn to interact with contracts Ethereum, Metamask, and the testnets without risking any funds. These design patterns allow to fulfill that purpose.