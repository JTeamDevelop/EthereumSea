//localforage
import "../lib/localforage.1.7.1.min.js"
//chance
import "../lib/chance.min.js"
//Simplified ECS 
import {ECSFactory} from "./simpleECS.js"
//names 
import {generateNames} from "./AzgaarNames.js"
//load ethereum 
import {EthereumConnect} from "./EthereumConnect.js"
//player  
import {playerFactory} from "./playerFactory.js"
//characters  
import {CPXData} from "./CPXRPG.js"
import {characterFactory} from "./characterFactory.js"
//handle hex creation
import {hexFactory, generateHexes, hexPlacement, hexDraw} from "./hexFactory.js"
//load planes 
import * as products from "./productLibrary.js"
import {planeFactory} from "./planeFactory.js"
import {ruinFactory} from "./ruinFactory.js"
//creatures 
import * as creatures from "./creatureFactory.js"
//people 
import {peopleFactory} from "./peopleFactory.js"
//jobs 
import {jobFactory} from "./jobFactory.js"
//Outlands
import {outlandsFactory} from "./outlands.js"
//Forces
import {forceFactory} from "./forceFactory.js"
//factions 
import {factionFactory} from "./factionFactory.js"
//scene
import {threeScene} from "./threeScene.js"
//UI
import {UI} from "./UI.js"

let app = {
    seed : ethers.utils.solidityKeccak256(['string','uint256'],["But God.",7000000]), 
    chance : new Chance(),
    //Save db for Indexed DB - localforage
    DB : localforage.createInstance({ name: "EthereumSea", storeName: "EthereumSea" }),
    //name generator
    names : generateNames(),
    //Connect to ethereum
    ETH : {
        main : ethers.getDefaultProvider('homestead'),
        ropsten : ethers.getDefaultProvider('ropsten'),
    },
    UI : {},
    hex : {
        generateHexes : generateHexes,
        place : hexPlacement,
        draw : hexDraw
    },
    creatures : creatures,
    _rarity : [1048576,1572864,1835008,1966080,2031616,2064384,2080768,2088960,2093056,2095104,2096128,2096640,2096896,2097024,2097088,2097120,2097136,2097144,2097148,2097150],
    rarity (hash) {
        let r = parseInt(hash.slice(2,8), 16)%(2097150)
        return 1 + this._rarity.findIndex(v => r < v)               
    },
    planeProducts : products,
    init () {
        app.factions.init()
    }
}

//Set up the simple entity component system 
app.ECS = ECSFactory(app)
threeScene(app)
//connect to the blockchain
EthereumConnect(app)
//setup hex meshes
hexFactory(app)
//people & factions 
CPXData(app)
peopleFactory(app)
factionFactory(app)
//player 
outlandsFactory(app)
planeFactory(app)
ruinFactory(app)
forceFactory(app)
playerFactory(app)
characterFactory(app)


//initiate scene
//init(app)

//UI
UI(app)




