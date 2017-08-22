# ethauth
*Login with ethereum*

An example auth/challenge server that uses `crypto` and `ethereumjs-util` to very signatures through web3.

- `/sentence` generates a random sentence and returns a `(uuid, sentence)` pair.
- Client signs the message and sends the signature to `/auth` along with the uuid
- Server verifies correct signature and responds with a jwt token.

### Demo
A simple demo can be located at https://ethauth.surge.sh with the respective git repo at https://github.com/martolini/ethauth-demo

### Try it

[dotenv](https://github.com/motdotla/dotenv) is used for local environment variables.

- `git clone git@github.com:martolini/ethauth.git`
- `npm install`
- For firebase, you need two things. An environment variable `DATABASE_URL` from firebase, and a service account/pk file (.json) with the name `firebase-pk.json` in the root folder.
- For JWT, set `JWT_SECRET` as an environment variable.
- `npm start`

### Credits
Heavily inspired by following https://hackernoon.com/never-use-passwords-again-with-ethereum-and-metamask-b61c7e409f0d
