//call the main loader
import "../../src/LoaderSupport.js"
//call the STL loader
import "../../src/STLLoader.js"
//call the DDS loader
import "../../src/DDSLoader.js"
//call the mtl loader
import "../../src/MTLLoader.js"
//call the OBJ2 loader
import "../../src/OBJLoader.js"

const hexTypes = ["deepWater", "desert", "forest", "hill", "mountains", "plains", "shallowWater", "swamp"]
let hexModels = {}

let stljLoader = new THREE.STLLoader();
stljLoader.setPath('media/obj/');

let onProgress = ()=>{}
let onError = ()=>{}

let finishLoad = ()=>{
    return hexTypes.reduce((done,id)=>!hexModels[id] || !done ? false : true, true)
}

let objectFactory = (app)=>{
    /*
    // Colored binary STL
    stljLoader.load('shallowWater.stl', function(geometry) {
        let meshMaterial = new THREE.MeshPhongMaterial({color:"gray"})
        if (geometry.hasColors) {
            meshMaterial = new THREE.MeshPhongMaterial({
                opacity: geometry.alpha,
                vertexColors: THREE.VertexColors
            });
        }


        let mesh = new THREE.Mesh(geometry,meshMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        //now add to model data
        hexModels.shallowWater = mesh
        app.introDisplay()
    });
    */
    hexTypes.forEach(id=>{
        let mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('media/obj/');
        //change for each hex 
        mtlLoader.load(id + ".mtl", function(materials) {
            materials.preload();
            //assign materials
            let objLoader = new THREE.OBJLoader();
            objLoader.setPath('media/obj/');
            objLoader.setMaterials(materials);
            //load object
            objLoader.load(id + '.obj', function(object) {
                //now add to model data
                hexModels[id] = object
                //check if complete
                if (finishLoad())
                    app.introDisplay()
            }, onProgress, onError);
        });
    }
    )
    

    app.hexModels = hexModels
}

export {objectFactory}
