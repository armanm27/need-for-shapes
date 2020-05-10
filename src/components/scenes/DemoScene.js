import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import { Ground, Player1, Target, Scoreboard, Police } from 'objects';
import { BasicLights } from 'lights';
import Coin from '../objects/Coin/Coin';


class DemoScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            //gui: new Dat.GUI(), // Create GUI for scene
            // rotationSpeed: 1,
            updateList: [],
            upArrowPushed: false,
            downArrowPushed: false,
            leftArrowPushed: false,
            rightArrowPushed: false,
            player1Position: new Vector3(0,0,0),
            activeTargets: [],
            activeEnemies: [],
            fieldSize: 250,
            numTargets: 50,
            numEnemies: 25,
            targetSize: 3,
            grid: [],
            scoreboard: null,
            score: 0,
            timeStamp:0.0,
            prevTimeStamp: 0.0,
            frozen: false,
            frozenStart: 0,
            frozenPenalty: 5000
        };

        const scoreboard = new Scoreboard(0,60);
        this.state.scoreboard = scoreboard;
        // console.log(scoreboard);
        // console.log(this.state.scoreboard);

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const land = new Land();
        const ground = new Ground();
        const player1 = new Player1(this);
        // const police = new Police(this, 2, 0, 10);
        const lights = new BasicLights();
        // const coin = new Coin(this, 2, 0, 2);
        this.add(player1, ground, lights);
        // this.add(player1, ground, lights);

        // initialize grid
        this.initGrid();
        
        // Populate playing field with targets
        this.populateTargets();
        // Populate enemies
        this.populateEnemies();
    }
    // helper function to initialize grid to false at beginning of round
    initGrid() {
        let size = Math.floor(this.state.fieldSize / this.state.targetSize);
        // set all grid spaces to false
        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                // let oneD = index(i,j);
                // don't place on top of player1
                if (i >= size / 2 - 1 && i <= size / 2 + 1 && j >= size / 2 - 1 && j<= size / 2 + 1) {
                    this.state.grid.push(true);
                    continue;
                }
                this.state.grid.push(false);
            }
        }
    }
    // helper function to relate 2d grid to 1d array
    // * inclusive *
    index(i, j) {
        let size = Math.floor(this.state.fieldSize / this.state.targetSize);
        return i + j * (size + 1);
    }
    // fills in every grid spot touched by coordinates
    updateGrid(x, z) {
        let size = Math.floor(this.state.fieldSize / this.state.targetSize);
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = z - 1; j <= z + 1; j++) {
                if (i < 0 || i > size || j < 0 || j > size) {
                    continue;
                }
                this.state.grid[this.index(i,j)] = true;
            }
        }
    }
    // function that 
    spotFromCoord(x,z) {
        let spaceSize = Math.floor(this.state.fieldSize / this.state.targetSize);
        // find center x & z coords
        let midX = x + (this.state.targetSize / 2);
        let midZ = z + (this.state.targetSize / 2);

        let i = Math.floor(midX + (this.state.fieldSize / 2) / spaceSize);
        let j = Math.floor(midZ + (this.state.fieldSize / 2) / spaceSize);
        return [i,j];
    }


    // populate targets using semi-random sampling
    // populateTargets() {
    //     var min = -1 * this.state.fieldSize / 2;
    //     var max = this.state.fieldSize / 2;
    //     for (let i = 0; i < this.state.numTargets; i++) {
    //         let x = (Math.random() * (max - min)) + min;
    //         let z = (Math.random() * (max - min)) + min;
    //         // console.log(x);
    //         // console.log(z);
    //         // check if danger close to any grid spaces that are already taken up
    //         let coords = this.spotFromCoord(x,z);
    //         while (this.state.grid[this.index(coords[0], coords[1])]) {
    //             x = (Math.random() * (max - min)) + min;
    //             z = (Math.random() * (max - min)) + min;
    //             coords = this.spotFromCoord(x,z);
    //         }
    //         const target = new Target(this, x, 0, z);
    //         this.updateGrid(coords[0], coords[1]);
    //         this.add(target);
    //         this.state.activeTargets.push(target);
    //     }
    // }

    populateTargets() {
        var min = -1 * this.state.fieldSize / 2;
        var max = this.state.fieldSize / 2;
        for (let i = 0; i < this.state.numTargets; i++) {
            let x = (Math.random() * (max - min)) + min;
            let z = (Math.random() * (max - min)) + min;
            // console.log(x);
            // console.log(z);
            // check if danger close to any grid spaces that are already taken up
            let coords = this.spotFromCoord(x,z);
            while (this.state.grid[this.index(coords[0], coords[1])]) {
                x = (Math.random() * (max - min)) + min;
                z = (Math.random() * (max - min)) + min;
                coords = this.spotFromCoord(x,z);
            }
            const coin = new Coin(this, x, 0, z);
            this.updateGrid(coords[0], coords[1]);
            this.add(coin);
            this.state.activeTargets.push(coin);
        }
    }

    populateEnemies() {
        let num = this.state.numEnemies;
        var min = -1 * this.state.fieldSize / 2;
        var max = this.state.fieldSize / 2;
        for (let i = 0; i < num; i++) {
            let x = (Math.random() * (max - min)) + min;
            let z = (Math.random() * (max - min)) + min;
            
            const enemy = new Police(this, x, 0, z);
            this.add(enemy);
            this.state.activeEnemies.push(enemy);
        }
    }

    // update targets after collision detected
    updateSceneAfterHit(hitTarget, index) {
        this.state.activeTargets.splice(index, 1);
        this.remove(hitTarget);
        this.state.numTargets--;
        this.state.score++;
        this.state.scoreboard.updateScore(this.state.score);
        // console.log(this.state.activeTargets);
        // console.log(this.state.numTargets);
    }
    // update scene after collision with enemy
    // remove enemy, set state to frozen, set frozenStart to timeStamp
    updateSceneAfterEnemyHit(hitEnemy, index) {
        this.state.activeEnemies.splice(index, 1);
        // probably need better disposal
        this.remove(hitEnemy);
        this.state.frozen = true;
        this.state.frozenStart = this.state.timeStamp;
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
        // for (const obj of updateList) {
        //     obj.update(this);
        // }
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
        // for (const obj of updateList) {
        //     obj.update(this);
        // }    
    }

    updateTime() {
        // console.log('being called');
        this.state.scoreboard.updateTime();
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
    update(timeStamp) {
        // console.log("called");
        if (this.state.prevTimeStamp != this.state.timeStamp) {
            this.state.prevTimeStamp = this.state.timeStamp;
            this.state.timeStamp = timeStamp;
        }
        else {
            this.state.timeStamp = timeStamp;
        }
        // check if frozen
        if (this.state.frozen == true) {
            let frozenEnd = this.state.frozenStart + this.state.frozenPenalty;
            if (timeStamp < frozenEnd) {
                return;
            }
            this.state.frozen = false;
            this.state.frozenStart = 0;
        }

        // console.log(this.state.timeStamp);
        if (this.state.timeStamp > 3000) {
            for (const obj of this.state.updateList) {
                obj.update(this);
            }
        }
        // console.log(this.state.timeStamp)
        // const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // // Call update for each object in the updateList
        // for (const obj of updateList) {
        //     obj.update(timeStamp);
        // }
    }

}

export default DemoScene;
