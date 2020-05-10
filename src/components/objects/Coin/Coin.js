import { Group, Vector3, BoxHelper, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './CHAHIN_COIN.glb';

class Coin extends Group {
    constructor(parent, x, y, z) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            boundingBox: new Box3(),
            // gui: parent.state.gui,
            // bob: true,
            // spin: this.spin.bind(this),
            // twirl: 0,
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'coin';
        loader.load(MODEL, (gltf) => {
            // console.log(gltf.scene.children[0]);
            // let newPos = new Vector3(x, y, z);
            this.translateAndRotate(gltf, x, y, z);
            
            // let bounding = new BoxHelper();
            // // console.log(gltf.scene.children[0]);
            // bounding.setFromObject(gltf.scene.children[0]);
            this.state.boundingBox.setFromObject(gltf.scene.children[0]);
            // console.log(gltf.scene.children[0]);
            // this.add(gltf.scene, bounding);
            this.add(gltf.scene);
        });


        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    translateAndRotate(gltf, x, y, z) {
        // gltf.scene.translate(newPos);
        // gltf.scene.translateX(x);
        // gltf.scene.translateY(y);
        // gltf.scene.translateZ(z);
        let mesh = gltf.scene.children[0];
        
        
        mesh.geometry.rotateX(-Math.PI / 2);
        mesh.geometry.scale(6,6,6);
        mesh.position.set(x,y,z);
        // mesh.geometry.translate(x,y,z);

        mesh.geometry.computeBoundingBox();
        // mesh.geometry.boundingBox.setFromObject(mesh);
        // mesh.geometry.computeBoundingSphere();
        // console.log(mesh);
    }

    // spin() {
    //     // Add a simple twirl
    //     this.state.twirl += 6 * Math.PI;

    //     // Use timing library for more precice "bounce" animation
    //     // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
    //     // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
    //     const jumpUp = new TWEEN.Tween(this.position)
    //         .to({ y: this.position.y + 1 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.Out);
    //     const fallDown = new TWEEN.Tween(this.position)
    //         .to({ y: 0 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.In);

    //     // Fall down after jumping up
    //     jumpUp.onComplete(() => fallDown.start());

    //     // Start animation
    //     jumpUp.start();
    // }

    update(timeStamp) {
        // if (this.state.bob) {
        //     // Bob back and forth
        //     this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        // }
        // if (this.state.twirl > 0) {
        //     // Lazy implementation of twirl
        //     this.state.twirl -= Math.PI / 8;
        //     this.rotation.y += Math.PI / 8;
        // }
        // console.log("called");
        // debugger;
        // if (this.children[0] == undefined) {
        //     return;
        // }
        // let copy = this.position.clone();
        // // let origin = new Vector3(0,this.position.y,0);
        // // this.position.sub(copy);
        // // this.rotateY(-0.01);
        // // this.position.add(copy);
        // // console.log(this.children[0]);
        // // this.children[0].children[0].setRotationFromAxisAngle(new Vector3(0,1,0), -0.1);
        // // console.log(this);
        // let mesh = this.children[0].children[0];

        // mesh.position.sub(copy); // remove the offset
        // mesh.position.applyAxisAngle(new Vector3(0,0,0), -1); // rotate the POSITION
        // mesh.position.add(copy); // re-add the offset

        // mesh.rotateOnAxis(new Vector3(0,0,0), -1); // rotate the OBJECT

    

        // // Advance tween animations, if any exist
        // TWEEN.update();
    }

}

export default Coin;
