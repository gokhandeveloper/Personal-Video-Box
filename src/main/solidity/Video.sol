pragma solidity ^0.4.0;

contract Video {
    string videoHash;

    function set(string memory _videoHash) public {
        videoHash = _videoHash;
    }

    function get() public view returns (string memory) {
        return videoHash;
    }
}
