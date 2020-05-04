import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Ground, Player1 } from 'objects';
import { BasicLights } from 'lights';
// import { Player1 } from '../objects/Player1';
// import { Ground } from '../objects/Ground';

class DemoScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            // rotationSpeed: 1,
            updateList: [],
            upArrowPushed: false,
            downArrowPushed: false,
            leftArrowPushed: false,
            rightArrowPushed: false
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const land = new Land();
        const ground = new Ground();
        const player1 = new Player1(this);
        // const flower = new Flower(this);
        const lights = new BasicLights();
        this.add(ground, player1, lights);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }
    updateKeyPress(event) {
        const updateList = this.state.updateList;
        if (event.key == "ArrowUp") {
            this.state.upArrowPushed = true;
                
        }
        if (event.key == "ArrowDown") {
            this.state.downArrowPushed = true;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }    
        }
        if (event.key == "ArrowLeft") {
            this.state.leftArrowPushed = true;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }    
        }
        if (event.key == "ArrowRight") {
            this.state.rightArrowPushed = true;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }
        }
        for (const obj of updateList) {
            obj.update(this.state);
        }
    }

    updateKeyUp(event) {
        const updateList = this.state.updateList;
        if (event.key == "ArrowUp") {
            this.state.upArrowPushed = false;
            
        }
        if (event.key == "ArrowDown") {
            this.state.downArrowPushed = false;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }    
        }
        if (event.key == "ArrowLeft") {
            this.state.leftArrowPushed = false;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }    
        }
        if (event.key == "ArrowRight") {
            this.state.rightArrowPushed = false;
            // for (const obj of updateList) {
            //     obj.update(event, this.state);
            // }
        }
        for (const obj of updateList) {
            obj.update(this.state);
        }    
    }

    

    // update(event) {
    //     if (event.key == "ArrowUp") {
    //         console.log("up arrow pushed");

    //     }
    //     // const { rotationSpeed, updateList } = this.state;
    //     // this.rotation.y = (rotationSpeed * timeStamp) / 10000;
    //     // updatthis.
    //     // Call update for each object in the updateList
    //     // for (const obj of updateList) {
    //     //     obj.update(event);
    //     // }
    // }
    // update(timeStamp) {
    //     // const { rotationSpeed, updateList } = this.state;
    //     // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    //     // // Call update for each object in the updateList
    //     // for (const obj of updateList) {
    //     //     obj.update(timeStamp);
    //     // }
    // }

}

export default DemoScene;
