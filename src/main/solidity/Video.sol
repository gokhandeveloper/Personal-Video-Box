pragma solidity ^0.4.0;

contract Video {
    string videoHash;

    function setVideo(string memory _videoHash) public {
        videoHash = _videoHash;
    }

    function getVideo() public view returns (string memory) {
        return videoHash;
    }
}
