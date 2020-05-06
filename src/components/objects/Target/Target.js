import { Group, BoxGeometry, Mesh, MeshPhongMaterial, DoubleSide, Vector3, Box3 } from 'three';


class Target extends Group {
    constructor(parent, x, y, z) {
        // Call parent Group() constructor
        super();

        // states: position, acceleration vector, current velocity

        // Init state
        this.state = {
            acceleration: new Vector3(0,0,0),
            startingPos: new Vector3(x,y,z),
            velocity: new Vector3(0,0,0),
            terminalVelocity: new Vector3(100,100,100),
            // boundingBox: new Box3(0,0,0),
        };
        this.name = 'target';

        let box = {}

        // create a box mesh
        // box.geometry = new THREE.BoxGeometry(250, 100, 250);\
        box.geometry = new BoxGeometry(parent.state.targetSize, parent.state.targetSize, parent.state.targetSize);
        box.material = new MeshPhongMaterial({
          color: 0xaaaaaa,
          side: DoubleSide,
          transparent: false,
          opacity: 0.15, // clipping is an issue, so set a low opacity
        });
        box.mesh = new Mesh(box.geometry, box.material);
        this.position.set(x,y,z);
        box.mesh.position.copy(this.position);
        // box.mesh.position.x = x;
        // box.mesh.position.y = y;
        // box.mesh.position.z = z;
        box.mesh.receiveShadow = true;
        box.mesh.castShadow = true;
      
        box.mesh.geometry.computeBoundingBox();
        // translate bounding box
        box.mesh.geometry.boundingBox.translate(new Vector3(x,y,z));
        box.boundingBox = box.geometry.boundingBox.clone();
        // this.boundingBox.setFromObject(box);
        // console.log(this);
        // console.log(box);
        // this.boundingBox = box.geometry.boundingBox.clone();
      
        this.add(box.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(parent) {
        return;
    }

}

export default Target;