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
import {characterFactory} from "./characterFactory.js"
//handle hex creation
import {hexFactory, generateHexes, hexPlacement} from "./hexFactory.js"
//load planes 
import {planeFactory} from "./planeFactory.js"
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
//import {init} from "./threeScene.js"
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
        place : hexPlacement
    }
}

//Set up the simple entity component system 
app.ECS = ECSFactory(app)
//connect to the blockchain
EthereumConnect(app)
//player 
planeFactory(app)
forceFactory(app)
playerFactory(app)
characterFactory(app)

//setup hex meshes
hexFactory(app)

//people & factions 
peopleFactory(app)
outlandsFactory(app)
factionFactory(app)

//initiate scene
//init(app)

//UI
UI(app)




