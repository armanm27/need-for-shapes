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
            startingPos: new Vector3(0,1,0),
            velocity: new Vector3(0,0,0),
            terminalVelocity: new Vector3(100,100,100),
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
        sphere.mesh.position.copy(pos);
        sphere.position = pos.clone();
        sphere.prevPosition = pos.clone();
      
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

    update(parentState) {
        const keyMap = {
            ArrowUp: new Vector3(0,  0,  1),
            ArrowDown: new Vector3(0,  0,  -1),
            ArrowLeft: new Vector3(1,  0,  0),
            ArrowRight: new Vector3(-1,  0,  0),
        };
        this.state.velocity.set(0,0,0);
            if (parentState.upArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowUp);
            }
            // else {
            //     this.state.velocity.sub(keyMap.ArrowUp);
            // }
            if (parentState.downArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowDown);
            }
            // else {
            //     this.state.velocity.sub(keyMap.ArrowDown);
            // }
            if (parentState.leftArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowLeft);
            }
            // else {
            //     this.state.velocity.sub(keyMap.ArrowLeft);
            // }
            if (parentState.rightArrowPushed == true) {
                this.state.velocity.add(keyMap.ArrowRight);
            }
            // else {
            //     this.state.velocity.sub(keyMap.ArrowRight);
            // }
        console.log(this.state.velocity);
        this.position.add(this.state.velocity);

    }

}

export default Player1;