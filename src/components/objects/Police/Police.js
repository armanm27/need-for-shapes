import { Group, Vector3, Box3, BoxHelper } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './PUSHILIN_Police_car.glb';


class Police extends Group {
    constructor(parent, x, y, z) {
        // Call parent Group() constructor
        super();

        this.state = {
            boundingBox: new Box3(),
        }

        this.name = 'police';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            // console.log(this);
            // console.log(gltf.scene);
            // gltf.scene.translateX(x);
            // gltf.scene.translateY(y);
            // gltf.scene.translateZ(z);
            this.setPos(gltf, x ,y ,z);
            // console.log(this.getMeshFromGLTF(gltf));
            // this.updateBoundingBox(gltf.scene.children[0].children[0].children[0].children[0].geometry, new Vector3(x,y,z));
            // console.log(gltf);
            // this.position.set(x,y,z);
            // this.setPos(gltf, x, y, z);
            // console.log(this.getMesh());
            
            // let box = new BoxHelper();
            // box.setFromObject(this.getMeshFromGLTF(gltf));
            this.add(gltf.scene);
            // this.add(gltf.scene, box);
        });


        parent.addToUpdateList(this);
    }

    // set the position of the gltf scene & mesh
    setPos(gltf, x, y, z) {
        // let newPos = new Vector3(x,y,z);
        // gltf.scene.translateX(x);
        // gltf.scene.translateY(y);
        // gltf.scene.translateZ(z);
        // console.log(gltf.scene.children[0].children[0].children[0].children[0]);
        // this.updateBoundingBox(gltf.scene.children[0].children[0].children[0].children[0].geometry, newPos);
        let mesh = this.getMeshFromGLTF(gltf);
        // console.log(mesh);
        mesh.position.set(x,y,z);
        mesh.geometry.scale(2.0, 2.0, 2.0);
        mesh.geometry.computeBoundingBox();
        this.state.boundingBox.setFromObject(mesh);

        // set this position
        // this.position.set(newPos);
        // console.log(gltf);
        // let scene = gltf.scene;
        // // set scene position
        // // scene.position.set(newPos);
        // // set mesh position, call compute bounding box, and translate bounding box
        // // scene.children[0].position.set(x,y,z);
        // let sceneChild = scene.children[0];
        // let mesh = sceneChild.children[0].children[0].children[0];
        // // mesh.position.set(newPos);
        // let geometry = mesh.geometry;
        // // geometry.computeBoundingBox();
        // this.updateBoundingBox(geometry, newPos);
        // console.log(mesh);
    }
    // access the mesh from a gltf
    getMeshFromGLTF(gltf) {
        return gltf.scene.children[0].children[0].children[0].children[0];
    }

    // set the bounding box of the mesh to the current position
    updateBoundingBox(geometry, changeVector) {
        geometry.computeBoundingBox();
        geometry.boundingBox.translate(changeVector);
        // geometry.translate(changeVector);
        // geometry.computeBoundingBox();
    }

    // access the mesh from this
    getMesh() {
        console.log(this);
        let c0 = this.children[0];
        console.log(c0);
        let c1 = c0.children[0];
        let c2 = c1.children[0];
        console.log(c2);
    }

    update() {
        // this.rotateY(-0.1);
    }
}

export default Police;
