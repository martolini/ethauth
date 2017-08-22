const ethUtil = require('ethereumjs-util');
const { Map } = require('immutable');
const uuidv4 = require('uuid/v4');
const sentencer = require('sentencer');

let uuidMap = Map();

const generateSentenceAndUuid = () => {
  const sentence = sentencer.make('{{ an_adjective }} {{ noun }}');
  const uuid = uuidv4()
  uuidMap = uuidMap.set(uuid, sentence);
  setTimeout(() => {
    uuidMap = uuidMap.delete(uuid);
  }, 30000); // Remove UUID/sentence pair after 30 seconds.
  return {
    uuid,
    sentence
  }
}

const getSentenceFromUuid = (uuid) => uuidMap.get(uuid);

const deleteUuid = (uuid) => uuidMap = uuidMap.delete(uuid);

function checkSig(sig, owner, uuid) {
  // Same data as before
  const data = getSentenceFromUuid(uuid);
  if (!data) {
    return {
      error: 'Uid not found, could not challenge string',
      code: 401
    }
  }
  const message = ethUtil.toBuffer(data)
  const msgHash = ethUtil.hashPersonalMessage(message)
  // Get the address of whoever signed this message  
  const signature = ethUtil.toBuffer(sig)
  const sigParams = ethUtil.fromRpcSig(signature)
  const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
  const sender = ethUtil.publicToAddress(publicKey)
  const addr = ethUtil.bufferToHex(sender)
 
  // Determine if it is the same address as 'owner' 
  if (addr === owner) {
    deleteUuid(uuid);
    return {
      success: true,
      address: addr
    }
  } else {
    // If the signature doesn’t match, error out
    return {
      error: 'This was not signed by the correct address',
      code: 401
    }
  }
}

module.exports = {
  checkSig,
  generateSentenceAndUuid,
  getSentenceFromUuid,
  deleteUuid
};
