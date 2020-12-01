pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";

/// @title A membership ERC721 token
/// @author tian0
/// @notice You can use this contract for basic member enrollment and verification
/// @dev All function calls are currently implemented without side effects
contract Membership is ERC721, Ownable, Pausable {

    constructor() public {
        owner();
        newMember();
    }

    address[] public members;
    mapping (address => uint) public tokenId;
    mapping (address => bool) public enrolled;

    
    modifier notMember (address _address) { 
        require (!enrolled[_address]); 
        _;}
    modifier isMember (address _address) { 
        uint _token = tokenId[_address];
        address _member = members[_token];
        require (msg.sender == _member); 
        _;}

    event LogMember(address member);
    event LogGift(address member);

    /// @notice Enroll new member only if they are not already enrolled
    /// @dev Minted new member token approvals are not given, token becomes untransferrable and unsellable
    function newMember()
    public notMember(msg.sender) whenNotPaused()
    {
        require(members.length < 2**256-1 );
        tokenId[msg.sender] = members.length;
        members.push(msg.sender);
        emit LogMember(msg.sender);
        enrolled[msg.sender] = true;

        _mint(msg.sender, tokenId[msg.sender]);
    }

    /// @notice Gift membership to new member from existing member, only if they are not already enrolled
    /// @dev Minted new member token approvals are cleared, token becomes untransferrable and unsellable
    /// @param _member The new membership recipient address
    function giftMembership(address _member) 
    public isMember(msg.sender) notMember(_member) whenNotPaused()
    {
        require(members.length < 2**256-1 );
        tokenId[_member] = members.length;
        members.push(_member);
        emit LogGift(_member);
        emit LogMember(_member);
        enrolled[_member] = true;

        _mint(_member, tokenId[_member]);
    }

    /// @notice Get members address array
    /// @dev Returns existing members
    /// @return members
    function getMembers() 
    public view 
    returns(address[] memory) {
        return members;
    }

    /// @notice Get members address array length
    /// @dev Returns existing members count
    /// @return members array length
    function getMembersLength() 
    public view 
    returns(uint256) {
        return members.length;
    }
    
    /// @notice Remove member by first setting enrolled to false, deleting from members array, then burn tokenId
    /// @dev Only contract owner can remove member
    /// @param _member The existing member address to be removed
    function removeMember(address _member)
    public onlyOwner()
    {
        uint _token = tokenId[_member];
        enrolled[_member] = false;
        delete members[_token];
        _burn(_member, tokenId[_member]);
    }

    /// @notice Self-destruct or kill contract 
    /// @dev Only contract owner can kill contract
    function kill() 
    public onlyOwner()
    {
        selfdestruct(address(uint160(owner()))); // cast owner to address payable
    }

    function fallback() external payable {
        revert();
    }
}