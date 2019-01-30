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
        place : hexPlacement
    }
}

//Set up the simple entity component system 
app.ECS = ECSFactory(app)
threeScene(app)
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

//make it 
//let a = app.chance.pickone(["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","0x742d35cc6634c0532925a3b844bc454e4438f44e","0x53d284357ec70ce289d6d64134dfac8e511c8a3d","0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67","0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e","0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae","0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0","0x2140efd7ba31169c69dfff6cdc66c542f0211825"])



