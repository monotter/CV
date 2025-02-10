import * as THREE from 'three';
import { WorldRoot } from "$lib/modules/3D/WorldRoot";
import { MeshPart } from "$lib/modules/3D/MeshPart";

const sc = new WorldRoot();
const obj = new MeshPart("Models/languagecube/model.obj", "Models/languagecube/uvmap.mtl", sc.Scene);
sc.Scene.add(obj.Mesh.Object);


sc.Camera.position.z = 5;

// const resize = () => {
//   sc.Renderer!.setSize(window.innerWidth, window.innerHeight)
//   if (sc.Camera instanceof THREE.PerspectiveCamera) {
//     sc.Camera.aspect = window.innerWidth / window.innerHeight
//     sc.Camera.updateProjectionMatrix()
//   }
// };

export const createScene = (el: HTMLCanvasElement) => {
  sc.setCanvas(el)
  sc.Renderer!.setSize(300, 200)
  if (sc.Camera instanceof THREE.PerspectiveCamera) {
        sc.Camera.aspect = 300 / 200
        sc.Camera.updateProjectionMatrix()
    }
}

// window.addEventListener('resize', resize);