// SPDX-License-Identifier: MIT


pragma solidity ^0.8.9;


contract Inbox {
    string public message;


 

    constructor(string memory initialMessage)  {  //constructor systnax- must add the source(memory) of parameter 
        message = initialMessage;                 //all constructors are public
    }

    function setMessage(string memory newMessage) public { //add source(memory) to function
        message = newMessage;
    }
//////////////////////////////////////////////////////////////////////////////////////

}
