# 🚀 Personal Video Box
This is a JAVA DApp which allows users to upload a video.

The video is stored in a decentralised storage(IPFS for now) which means it cannot be deleted or censored.
The reference(the video file hash) to the video is stored on the blockchain(Ethereum for now).
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
  
Blockchain API
- Web3j - ETH API.
  https://github.com/web3j/web3j
  
Decentralised Storage
- IPFS
  https://ipfs.io/
  
## Requirements
- Nodejs 14
- Java 11
- Ganache to spin up a local blockchain
- Metamask on your web browser

## Java Development
Gradle>build to build the project for production
## Solidity Development

Smart contracts are located under src/main/solidity folder

Run the gradle task generateContractWrappers to generate contracts.
## UI Development
Go to ui/ui-react folder and run the following:
npm install

The following will start the watch server where you can make changes to ui code and the browser will refresh automatically if a change is detected.
npx webpack serve --mode development --env development

### Test video 1 credit:
https://www.videvo.net/video/car-driving-through-icelandic-landscape/452786/

https://www.videvo.net/profile/videvo/