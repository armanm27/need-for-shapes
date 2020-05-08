import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DemoScene } from 'scenes';

class Gameplay {

    constructor() {
        
    }

    run() {

        // Initialize core ThreeJS components
        const scene = new DemoScene();
        const camera = new PerspectiveCamera();
        const renderer = new WebGLRenderer({ antialias: true });

        console.log(scene);
        // let pos = new Vector3(scene.state.player1Position.x, scene.state.player1Position.y + 3, scene.state.player1Position.z - 10);
        // Set up camera
        camera.position.set(0, 3, -10);
        camera.lookAt(0,0,0);
        // camera.lookAt(scene.state.player1Position);

        // Set up renderer, canvas, and minor CSS adjustments
        renderer.setPixelRatio(window.devicePixelRatio);
        const canvas = renderer.domElement;
        canvas.style.display = 'block'; // Removes padding below canvas
        document.body.style.margin = 0; // Removes margin around page
        document.body.style.overflow = 'hidden'; // Fix scrolling
        document.body.appendChild(canvas);

        // Set up controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 4;
        controls.maxDistance = 16;
        controls.update();

        window.setInterval(function() { scene.updateTime() }, 1000);

        // Direction Handler
        const keyPressed = (event) => {
            if (event) {
                if (event.key  == "ArrowUp" || event.key  == "ArrowDown" || event.key  == "ArrowLeft" || event.key  == "ArrowRight") {
                    // console.log(event.key);
                    scene.updateKeyPress(event);
                    // var score = scoreboard.getScore();
                    // scoreboard.updateScore(score + 1);
                }
            }
        };
        keyPressed();
        window.addEventListener('keydown', keyPressed, false);

        const keyReleased = (event) => {
            if (event) {
                if (event.key  == "ArrowUp" || event.key  == "ArrowDown" || event.key  == "ArrowLeft" || event.key  == "ArrowRight") {
                    // console.log(event.key);
                    scene.updateKeyUp(event);
                }
            }
        };
        keyReleased();
        window.addEventListener('keyup', keyReleased, false);

        // Render loop
        const onAnimationFrameHandler = (timeStamp) => {
            controls.update();
            renderer.render(scene, camera);
            scene.update && scene.update(timeStamp);
            window.requestAnimationFrame(onAnimationFrameHandler);
        };
        window.requestAnimationFrame(onAnimationFrameHandler);

        // Resize Handler
        const windowResizeHandler = () => {
            const { innerHeight, innerWidth } = window;
            renderer.setSize(innerWidth, innerHeight);
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
        };
        windowResizeHandler();
        window.addEventListener('resize', windowResizeHandler, false);
    }
}

export default Gameplay;