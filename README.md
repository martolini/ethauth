# ethauth
*Login with ethereum*

An example of using `web3` exposed through MetaMask/MIST/Parity for authenticating users.
- /sentence generates a random sentence and returns a `(uuid, sentence)` pair.
- Client signs the message and sends the signature to /auth along with the uuid
- Server verifies correct signature and responds with a jwt token.

### Credits
Heavily inspired by the following https://hackernoon.com/never-use-passwords-again-with-ethereum-and-metamask-b61c7e409f0d
