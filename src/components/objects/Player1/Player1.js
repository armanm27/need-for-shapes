import { Group, BoxHelper, SphereGeometry, Mesh, MeshPhongMaterial, DoubleSide, Vector3, Box3Helper, Box3, PerspectiveCamera } from 'three';


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
            // position: parent.state.player1Position.clone(),
            acceleration: new Vector3(0,0,0),
            startingPos: new Vector3(0,0,0),
            velocity: new Vector3(0,0,0),
            terminalVelocity: 0.2,
            mass: 50,
            // standardForce: 0.00015,
            standardForce: 0.0015,
            frictionFactor: 0.3, 
            camera: null,
        };
        this.name = 'player1';

        let sphere = {};
        sphere.radius = 2;
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
        sphere.mesh.castShadow = false;
        sphere.mesh.receiveShadow = false;
              
        let pos = parent.state.player1Position.clone();
        // let pos = this.state.position;
        // this.position.copy(pos);
        sphere.mesh.position.copy(pos);
        // sphere.position = pos.clone();
        // sphere.prevPosition = pos.clone();
        sphere.mesh.geometry.computeBoundingBox();
        sphere.mesh.geometry.computeBoundingSphere();
        // sphere.mesh.geometry.boundingSphere.translate(this.state.startingPos);
        // console.log(this);
      
        // create camera 

        var camera = new PerspectiveCamera();
        camera.position.set(0, 50, -60);
        camera.lookAt(sphere.mesh.position);
        sphere.mesh.add(camera);
        this.state.camera = camera;

        // let bounding = new BoxHelper();
        // bounding.setFromObject(sphere.mesh);
        // this.add(sphere.mesh, bounding); 
        
        // add sphere to scene
        sphere.mesh.frustumCulled = false;
        this.add(sphere.mesh);
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
        // if (!this.state.acceleration.equals(new Vector3(0,0,0))) {
        //     debugger;
        // }
        // console.log("called");
        // const keyMap = {
        //     ArrowUp: new Vector3(0,  0,  1),
        //     ArrowDown: new Vector3(0,  0,  -1),
        //     ArrowLeft: new Vector3(1,  0,  0),
        //     ArrowRight: new Vector3(-1,  0,  0),
        // };
        this.updateAcceleration(parent);
        this.updateVelocity(parent);
        this.updatePosition(parent);
        // this.state.velocity.set(0,0,0);
            // if (parent.state.upArrowPushed == true) {
            //     this.state.velocity.add(keyMap.ArrowUp);
            // }

            // if (parent.state.downArrowPushed == true) {
            //     this.state.velocity.add(keyMap.ArrowDown);
            // }

            // if (parent.state.leftArrowPushed == true) {
            //     this.state.velocity.add(keyMap.ArrowLeft);
            // }

            // if (parent.state.rightArrowPushed == true) {
            //     this.state.velocity.add(keyMap.ArrowRight);
            // }
        // this.position.add(this.state.velocity);
        // this.getSphere().position.copy(this.position);
        // this.children[0].po
        parent.state.player1Position.copy(this.getSphere().position);
        var box = new Box3();
        box.setFromObject(this.getSphere());
        this.targetDetection(parent, box);
        this.enemyDetection(parent, box);
        // let t = parent.state.timeStamp - parent.state.prevTimeStamp;
        // let translationVec = this.state.velocity.clone().multiplyScalar(t);
        // this.getSphere().geometry.boundingSphere.translate(translationVec);
    }
    
    // update the acceleration state
    updateAcceleration(parent) {
        // const ACC_DUE_TO_GRAVITY = 
        const keyMap = {
            ArrowUp: new Vector3(0,  0,  2),
            ArrowDown: new Vector3(0,  0,  -2),
            ArrowLeft: new Vector3(2,  0,  0),
            ArrowRight: new Vector3(-2,  0,  0),
        };
        let standardForce = this.state.standardForce;
        let totalForce = new Vector3();
        // let acceleration = this.state.acceleration.clone();
        if (parent.state.upArrowPushed == true) {
            totalForce.addScaledVector(keyMap.ArrowUp, standardForce);
            // this.state.velocity.add(keyMap.ArrowUp);
        }

        if (parent.state.downArrowPushed == true) {
            totalForce.addScaledVector(keyMap.ArrowDown, standardForce);
            // this.state.velocity.add(keyMap.ArrowDown);
        }

        if (parent.state.leftArrowPushed == true) {
            totalForce.addScaledVector(keyMap.ArrowLeft, standardForce);
            // this.state.velocity.add(keyMap.ArrowLeft);
        }

        if (parent.state.rightArrowPushed == true) {
            totalForce.addScaledVector(keyMap.ArrowRight, standardForce);
            // this.state.velocity.add(keyMap.ArrowRight);
        }
        // let eps = 0.05;
        // if (!(this.state.velocity.length() < eps)) {
        //     let frictionForce = this.state.mass * 9.8 * this.state.frictionCoeff;
        //     let frictionDirection = this.state.velocity.clone().normalize();
        //     frictionDirection.x = -1 * frictionDirection.x;
        //     frictionDirection.y = -1 * frictionDirection.y;
        //     frictionDirection.z = -1 * frictionDirection.z;
        //     frictionDirection.multiplyScalar(frictionForce);
        //     frictionDirection.divideScalar(this.state.mass);
        //     totalForce.add(frictionDirection);
        //     // this.state.acceleration.add(frictionDirection);
        //     // this.state.velocity.copy(v0.addScaledVector(a,t));
        // }
        // let time = parent.state.timeStamp - parent.state.prevTimeStamp;
        // let fPerFrame = totalForce.multiplyScalar(time);
        // // this.state.acceleration.add(fPerFrame.divideScalar(this.state.mass));
        // this.state.acceleration.copy(fPerFrame.divideScalar(this.state.mass));
        this.state.acceleration.copy(totalForce.divideScalar(this.state.mass));
    }

    // update velocity based on Acceleration
    updateVelocity(parent) {
        let a = this.state.acceleration;
        // let v0 = this.state.velocity.copy();
        let t = parent.state.timeStamp - parent.state.prevTimeStamp;
        let v0 = this.state.velocity.clone();
        this.state.velocity.addScaledVector(a, t);
        // apply friction if necessary
        // let eps = 0.05;
        // if (this.state.velocity.length() > eps) {
            // let frictionForce = this.state.mass * 9.8 * this.state.frictionCoeff;
            let frictionForce = this.state.velocity.length();
            let frictionDirection = this.state.velocity.clone().normalize();
            frictionDirection.x = -1 * frictionDirection.x;
            frictionDirection.y = -1 * frictionDirection.y;
            frictionDirection.z = -1 * frictionDirection.z;
            frictionDirection.multiplyScalar(frictionForce);
            frictionDirection.divideScalar(this.state.mass);
            // this.state.acceleration.add(frictionDirection);
            this.state.velocity.add(frictionDirection);
        // }
        // check terminal velocity
        if (this.state.velocity.length() > this.state.terminalVelocity) {
            this.state.velocity.normalize();
            this.state.velocity.multiplyScalar(this.state.terminalVelocity);
        }
        // let x = this.state.velocity.x;
        // let z = this.state.velocity.z;
        // let tv = this.state.terminalVelocity;
        // if (x > tv) {
        //     x = tv;
        // }
        // if (x < -1 * tv) {
        //     x = -1 * tv;
        // }
        // if (z > tv) {
        //     z = tv;
        // }
        // if (z < -1 * tv) {
        //     z = -1 * tv;
        // }
        // this.state.velocity.set(x,0,z);
        // console.log(this.state.velocity);
        // reset acceleration
        this.state.acceleration.set(0,0,0);
    }

    // update position based on velocity
    updatePosition(parent) {
        let t = parent.state.timeStamp - parent.state.prevTimeStamp;
        this.children[0].position.addScaledVector(this.state.velocity, t);
        // this.position.addScaledVector(this.state.velocity, t);
    }

    // Enemy Detection
    enemyDetection(parent, box) {
        var enemies = parent.state.activeEnemies;
        for (let i = 0; i < enemies.length; i++) {
            if (box.intersectsBox(this.getBox(enemies[i]))) {
                // console.log("enemy hit");
                parent.updateSceneAfterEnemyHit(enemies[i], i);
            }
        }
    }






    // check if player1 collided with any active targets
    targetDetection(parent, box) {
        // var sphere = this.getSphere().geometry.boundingSphere;
        // this.children[1].update();
        var targets = parent.state.activeTargets;
        for (let i = 0; i < targets.length; i++) {
            // if (sphere.intersectsSphere(this.getTargetSphere(targets[i]))) {
            //     console.log("hit");
            //     parent.updateSceneAfterHit(targets[i], i);
            // }
            // debugger;
            if (box.intersectsBox(this.getBox(targets[i]))) {
                // console.log("hit");
                parent.updateSceneAfterHit(targets[i], i);
            }
        }
        // return;
    }



    // helper function to get sphere object
    getSphere() {
        return this.children[0];
    }
    getTargetSphere(target) {
        return target.children[0].children[0].geometry.boundingSphere;
    }
    // helper function to get the bounding box of a target
    getBox(target) {
        // debugger;
        // console.log(target);
        // console.log(target.children[0]);
        // console.log(target.children[0].children[0]);
        // return null;
        // console.log(target.state.boundingBox);
        return target.state.boundingBox;
        // return target.children[0].children[0].geometry.boundingBox;
    }
    // helper to get the mesh
    // getMesh() {

    // }

}

export default Player1;