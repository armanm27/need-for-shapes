import { Group, MeshStandardMaterial, Mesh, PlaneBufferGeometry } from 'three';


class Ground extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        // const loader = new GLTFLoader();

        // this.name = 'land';

        // loader.load(MODEL, (gltf) => {
        //     this.add(gltf.scene);
        // });

        let ground = {};
        ground.textures = {};

        // ground material
        ground.material = new MeshStandardMaterial({
            color: 0x404761, //0x3c3c3c,
            // specular: 0x404761, //0x3c3c3c//,
            metalness: 0.3,
        });

        // ground mesh
        ground.geometry = new PlaneBufferGeometry(20000, 20000)
        ground.mesh = new Mesh(ground.geometry, ground.material);
        ground.mesh.position.y = -1;
        ground.mesh.rotation.x = -Math.PI / 2;
        ground.mesh.receiveShadow = true;

        this.add(ground.mesh);
    }
}

export default Ground;

// let ground = {};
//   ground.textures = {};

//   // ground material
//   ground.material = new THREE.MeshStandardMaterial({
//     color: 0x404761, //0x3c3c3c,
//     // specular: 0x404761, //0x3c3c3c//,
//     metalness: 0.3,
//   });

//   // ground mesh
//   ground.geometry = new THREE.PlaneBufferGeometry(20000, 20000)
//   ground.mesh = new THREE.Mesh(ground.geometry, ground.material);
//   ground.mesh.position.y = SceneParams.groundY - 1;
//   ground.mesh.rotation.x = -Math.PI / 2;
//   ground.mesh.receiveShadow = true;

//   // handled in Scene.updateGroundTexture()
//   // needed for ground texture
//   // ground.texture = Scene.loader.load( "textures/terrain/grasslight-big.jpg" );
//   // ground.texture.wrapS = ground.texture.wrapT = THREE.RepeatWrapping;
//   // ground.texture.repeat.set( 25, 25 );
//   // ground.texture.anisotropy = 16;
//   // ground.material.map = ground.texture;
//   // ground.texture = Scene.loader.load( "textures/terrain/drywall.jpg" );
//   // ground.texture.wrapS = ground.texture.wrapT = THREE.RepeatWrapping;
//   // ground.texture.repeat.set( 25, 25 );
//   // ground.texture.anisotropy = 16;
//   // ground.material.map = ground.texture;

//   Scene.scene.add(ground.mesh); // add ground to scene

//   return ground;
// }