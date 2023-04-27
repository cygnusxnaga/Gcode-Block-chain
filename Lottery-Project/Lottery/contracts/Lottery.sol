pragma solidity ^0.4.17;


contract Lottery {
    address public manager;  //make varible public so I can create front-end java application to access this
  
    address[] public players;

    function Lottery() public { //set address that creates contract as manager
        //Global Variable .msg object -- properties address that called contract and transation information
        manager = msg.sender;
    }
 

    function enter() public payable { //make payable to the contracts balance
    
        require(msg.value > .01 ether);//require method //
        players.push(msg.sender); //push address of account that calls this function into array (address datatype)
    }

    function random() private view returns (uint256){  //function creates and returns a random number-- uses difficulty,time,
       return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint winner = random() % players.length;  //use random number gnerator to create index number with %
        players[winner].transfer(this.balance);  //0xsDfbzsFGfdFbnifsdhodsisdof
        players = new address[](0);//empty players array = set equal to new dynamic array 

    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]){
        return players;
        
    }
}