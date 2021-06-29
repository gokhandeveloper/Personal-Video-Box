# 🚀 Video of the Day
This is a JAVA DApp which allows users to upload a video
The video is stored in a decentralised storage.
The reference(the video file hash) to the video is stored on the blockchain.
Use cases:
- User uploads a video to the website via the UI.
- The video gets uploaded to a storage.
- Storage service generates a hash file.
- The system then stores the hash of the video file to a Blockchain(Eth in this case)
- The hash can then be retrieved using user's wallet credentials and can display the saved video on the website.
Technologies used so far:

Web Framework
- Spark Java https://sparkjava.com/
  
UI
- React+ Webpack for UI
  https://reactjs.org/
  
Blockchain
- Web3j - ETH API.
  https://github.com/web3j/web3j
  
Decentralised Storage
- IPFS
  https://ipfs.io/
  
Requirements
Node14
Java11