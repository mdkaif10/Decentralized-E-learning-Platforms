// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    int counter = 0;
    function count() public {
        counter++;
    }
    function retrive() public view returns (int){
        return counter;
    }
}