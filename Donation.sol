/**
 *Submitted for verification at Etherscan.io on 2022-09-21
*/

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Donation {
    mapping (address => uint256) public amountPerWallet;

    event Donated(address indexed sender, address indexed receipt, uint256 amount);
    event Withdrawn(address indexed receipt, uint256 amount);

    function donate(address _receiver) external payable {
        require(_receiver != address(0), "Invalid recipient address");
        amountPerWallet[_receiver] = msg.value;

        emit Donated(msg.sender, _receiver, msg.value);
    }

    function withdraw(uint256 amount) public {
        uint256 balance = amountPerWallet[msg.sender];
        require(amount <= balance, "No enough balance");

        amountPerWallet[msg.sender] -= amount; // block re-entrancy
        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount);
    }
}
