const CPXToken = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "value",
    "type": "uint256"
  }],
  "name": "splitCPX",
  "outputs": [{
    "name": "split",
    "type": "uint256[6]"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "from",
    "type": "address"
  }, {
    "name": "to",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalColors",
  "outputs": [{
    "name": "",
    "type": "uint256[6]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "addedValue",
    "type": "uint256"
  }],
  "name": "increaseAllowance",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "to",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "mint",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "account",
    "type": "address"
  }, {
    "name": "i",
    "type": "uint8"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "spendColor",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "value",
    "type": "uint256"
  }],
  "name": "burn",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "account",
    "type": "address"
  }, {
    "name": "values",
    "type": "uint256[2][]"
  }],
  "name": "mintColor",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "account",
    "type": "address"
  }],
  "name": "colorsOf",
  "outputs": [{
    "name": "",
    "type": "uint256[6]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "from",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "burnFrom",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "value",
    "type": "uint256"
  }],
  "name": "joinColors",
  "outputs": [{
    "name": "cpx",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isOwner",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseAllowance",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "to",
    "type": "address"
  }, {
    "name": "value",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_m",
    "type": "address"
  }],
  "name": "isMinter",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_c",
    "type": "address"
  }],
  "name": "setSpenderContract",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_newMinter",
    "type": "address"
  }],
  "name": "setMinter",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "i",
    "type": "uint8"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "ColorBurn",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "minter",
    "type": "address"
  }, {
    "indexed": true,
    "name": "account",
    "type": "address"
  }, {
    "indexed": false,
    "name": "values",
    "type": "uint256[2][]"
  }],
  "name": "ColorsMinted",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "account",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256[6]"
  }],
  "name": "Split",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "account",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Join",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}]
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const ESPlanes = [{
  "constant": false,
  "inputs": [{
    "name": "_ids",
    "type": "uint256[]"
  }],
  "name": "adminAddPlane",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "searchCost",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "planeHash",
  "outputs": [{
    "name": "hash",
    "type": "bytes32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "player",
    "type": "address"
  }, {
    "name": "n",
    "type": "uint256"
  }],
  "name": "giveBonusSearch",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "getCurrentLocation",
  "outputs": [{
    "name": "position",
    "type": "uint256[2]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "getPlaneFinder",
  "outputs": [{
    "name": "finder",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "a",
    "type": "uint256"
  }, {
    "name": "b",
    "type": "uint256"
  }],
  "name": "getDistance",
  "outputs": [{
    "name": "pa",
    "type": "uint256[2]"
  }, {
    "name": "pb",
    "type": "uint256[2]"
  }, {
    "name": "dist",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isOwner",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getPlaneCount",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_c",
    "type": "address"
  }],
  "name": "setCPXContract",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_cost",
    "type": "uint256"
  }],
  "name": "setSearchCost",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getFreeSearchData",
  "outputs": [{
    "name": "last",
    "type": "uint256"
  }, {
    "name": "used",
    "type": "uint8"
  }, {
    "name": "bonus",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "getPlaneSize",
  "outputs": [{
    "name": "size",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "nextEpoch",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_finder",
    "type": "address"
  }],
  "name": "getFinderPlanes",
  "outputs": [{
    "name": "ids",
    "type": "uint256[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "planeExists",
  "outputs": [{
    "name": "exists",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "start",
    "type": "uint256"
  }, {
    "name": "stop",
    "type": "uint256"
  }],
  "name": "getAllPlanes",
  "outputs": [{
    "name": "ids",
    "type": "uint256[]"
  }, {
    "name": "finder",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_id",
    "type": "uint256"
  }],
  "name": "Search",
  "outputs": [{
    "name": "found",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": true,
    "name": "finder",
    "type": "address"
  }, {
    "indexed": false,
    "name": "reward",
    "type": "uint256"
  }],
  "name": "NewPlane",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": true,
    "name": "seeker",
    "type": "address"
  }, {
    "indexed": false,
    "name": "roll",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "req",
    "type": "uint256"
  }],
  "name": "SearchResults",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}]
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const ESForces = [{
  "constant": true,
  "inputs": [{
    "name": "v",
    "type": "uint8"
  }],
  "name": "getUpgradeCost",
  "outputs": [{
    "name": "cost",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getCooldown",
  "outputs": [{
    "name": "cool",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getForce",
  "outputs": [{
    "name": "level",
    "type": "uint8"
  }, {
    "name": "a",
    "type": "uint8[6]"
  }, {
    "name": "stress",
    "type": "uint256"
  }, {
    "name": "xp",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "cost",
    "type": "uint256"
  }],
  "name": "setBaseMoveCost",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getForceOwner",
  "outputs": [{
    "name": "player",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "a",
    "type": "uint8[6]"
  }],
  "name": "buyForce",
  "outputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "stress",
    "type": "uint16"
  }],
  "name": "addStress",
  "outputs": [{
    "name": "remaining",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "kill",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "plane",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "uint8"
  }],
  "name": "setLocation",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "l",
    "type": "uint8"
  }, {
    "name": "a",
    "type": "uint8[6]"
  }],
  "name": "getAttributeBonus",
  "outputs": [{
    "name": "bonus",
    "type": "uint8[6]"
  }],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "a",
    "type": "uint256"
  }, {
    "name": "b",
    "type": "uint256"
  }],
  "name": "getMoveCost",
  "outputs": [{
    "name": "cost",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "owner",
    "type": "address"
  }],
  "name": "getOwnerForces",
  "outputs": [{
    "name": "forces",
    "type": "uint256[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "idTo",
    "type": "uint256"
  }],
  "name": "initialMoveToForce",
  "outputs": [{
    "name": "cool",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newAdmin",
    "type": "address"
  }],
  "name": "setAdmin",
  "outputs": [{
    "name": "isAdmin",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "upgradeForce",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "planes",
    "type": "address"
  }],
  "name": "setPlanes",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getLevel",
  "outputs": [{
    "name": "level",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "cost",
    "type": "uint256"
  }],
  "name": "setForceCost",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isOwner",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "plane",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "uint8"
  }],
  "name": "initialMoveToPlane",
  "outputs": [{
    "name": "cool",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "cool",
    "type": "uint256"
  }],
  "name": "setCooldown",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getMaxStress",
  "outputs": [{
    "name": "max",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }, {
    "name": "plane",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "uint8"
  }],
  "name": "buyMove",
  "outputs": [{
    "name": "cool",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "cpx",
    "type": "address"
  }],
  "name": "setCPX",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "id",
    "type": "uint256"
  }],
  "name": "getForceLocation",
  "outputs": [{
    "name": "plane",
    "type": "uint256"
  }, {
    "name": "i",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "name": "cpx",
    "type": "address"
  }, {
    "name": "planes",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "player",
    "type": "address"
  }, {
    "indexed": false,
    "name": "id",
    "type": "uint256"
  }],
  "name": "NewForce",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "level",
    "type": "uint8"
  }],
  "name": "LevelUp",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": true,
    "name": "plane",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "hexi",
    "type": "uint8"
  }],
  "name": "Move",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "cool",
    "type": "uint256"
  }],
  "name": "Cooldown",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "stress",
    "type": "uint16"
  }],
  "name": "StressTaken",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "id",
    "type": "uint256"
  }],
  "name": "KOed",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}]
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const ABI = {
  CPXToken,
  ESPlanes,
  ESForces
}

const addresses = { 
  "CPXToken" : "0x5fa5ebcefc3330b68a8601cd8b5969da8ab0546a",
  "ESPlanes" : "0x0a400150682e8746c347c402f79210e1aeace280",
  "ESForces" : "0xbd502de7d3e72db980b89812082e100da7c8c006"
}
// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
//let contract = new ethers.Contract(contractAddress,abi,provider);

async function EthereumConnect(app) {
  app.ETH.addresses = addresses
  //function do determine plane has for ids 
  app.planeHash = (id)=>{
    //let result = utils.solidityKeccak256([ 'int8', 'bytes1', 'string' ], [ -1, '0x42', 'hello' ]);
    return ethers.utils.solidityKeccak256(['address','uint256'], [app.ETH.addresses.ESPlanes,id])
  }
  //connection to main chain
  let MP = app.ETH.main
  //see if there is a user id
  let ETH = await app.DB.getItem("ETHData")
  //if no data create user
  if (!ETH) {
    let W = ethers.Wallet.createRandom()
    ETH = {
      lastUser: W.address,
      users: {}
    }
    ETH.users[W.address] = W.mnemonic

    //convert to JSON string and turn to hex 
    ETH = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(ETH)))
    //save 
    app.DB.setItem("ETHData", ETH)
  } else {
    let user = JSON.parse(ethers.utils.toUtf8String(ETH))
    //set up wallet
    let wallet = ethers.Wallet.fromMnemonic(user.users[user.lastUser])
    //now connect to provider
    app.wallets = {
      main: wallet.connect(app.ETH.main),
      ropsten: wallet.connect(app.ETH.ropsten)
    }
    //connect contracts 
    app.ETH.contracts = {}
    // have read-only access to the Contract
    for (let C in addresses) {
      //get address
      let addr = addresses[C]
      //conncet contract to Rposten
      let contract = new ethers.Contract(addr,ABI[C],app.ETH.ropsten);
      //now connect to wallet
      app.ETH.contracts[C] = contract.connect(app.wallets.ropsten);
    }
  }

}

export {EthereumConnect}
