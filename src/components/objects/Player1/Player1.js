import { Group, SphereGeometry, Mesh, MeshPhongMaterial, DoubleSide, Vector3 } from 'three';


class Player1 extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // states: position, acceleration vector, current velocity

        // Init state
        this.state = {
            gui: parent.state.gui,
            // bob: true,
            // spin: this.spin.bind(this),
            // twirl: 0,
            // position: new Vector3(0, 1, 0),
            acceleration: new Vector3(0,0,0),
            startingPos: new Vector3(0,0,0),
            velocity: new Vector3(0,0,0),
            terminalVelocity: new Vector3(100,100,100)
        };
        this.name = 'player1';

        let sphere = {};
        sphere.radius = 1;
        sphere.geometry = new SphereGeometry(sphere.radius, 20, 20);
        // sphere material
        sphere.material = new MeshPhongMaterial({
          color: 0xaaaaaa,
          side: DoubleSide,
          transparent: false,
          opacity: 0.15, // clipping is an issue, so set low opacity
        });
      
        // sphere mesh
        sphere.mesh = new Mesh(sphere.geometry, sphere.material);
        sphere.mesh.castShadow = true;
        sphere.mesh.receiveShadow = true;
      
        let pos = this.state.startingPos;
        this.position.copy(pos);
        sphere.mesh.position.copy(pos);
        sphere.position = pos.clone();
        sphere.prevPosition = pos.clone();
        sphere.mesh.geometry.computeBoundingSphere();
        sphere.mesh.geometry.boundingSphere.translate(this.state.startingPos);
        // console.log(this);
      
        this.add(sphere.mesh); // add sphere to scene

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    // updateKeyDown(event) {
    //     // const updateList = this.state.updateList;
    //     if (event.key == "ArrowUp") {
    //         console.log("up arrow pushed p1");
    //         // console.log(this.state.upArrowPushed);
    //         // this.state.upArrowPushed = true;
    //         // console.log(this.state.upArrowPushed);
    //     }
    // }

    // updateKeyUp(event) {
    //     // const updateList = this.state.updateList;
    //     if (event.key == "ArrowUp") {
    //         console.log("up arrow released p1");
    //         // console.log(this.state.upArrowPushed);
    //         // this.state.upArrowPushed = false;
    //         // console.log(this.state.upArrowPushed);
    //     }
    // }

    update(parent) {
        const keyMap = {
            ArrowUp: new Vector3(0,  0,  1),
            ArrowDown: new Vector3(0,  0,  -1),
            ArrowLeft: new Vector3(1,  0,  0),
            ArrowRight: new Vector3(-1,  0,  0),
        };
        this.state.velocity.set(0,0,0);
            if (parent.state.upArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowUp);
            }

            if (parent.state.downArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowDown);
            }

            if (parent.state.leftArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowLeft);
            }

            if (parent.state.rightArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowRight);
            }
        this.position.add(this.state.velocity);
        this.getSphere().position.copy(this.position);
        // console.log(this.getSphere().geometry.boundingSphere);
        // parentState.player1Position.set(this.position);
        // check if collision with target
        this.targetDetection(parent);
        this.getSphere().geometry.boundingSphere.translate(this.state.velocity);
    }
    // check if player1 collided with any active targets
    targetDetection(parent) {
        var sphere = this.getSphere().geometry.boundingSphere;
        var targets = parent.state.activeTargets;
        // console.log(sphere);
        // console.log(this.getBox(targets[0]));
        // console.log(targets[0]);
        // console.log(this.getSphere());
        for (let i = 0; i < targets.length; i++) {
            if (sphere.intersectsBox(this.getBox(targets[i]))) {
                console.log("hit");
                parent.updateSceneAfterHit(targets[i], i);
            }
        }
    }
    // helper function to get sphere object
    getSphere() {
        return this.children[0];
    }
    // helper function to get the bounding box of a target
    getBox(target) {
        return target.children[0].geometry.boundingBox;
    }

}

export default Player1;