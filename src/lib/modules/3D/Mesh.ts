import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Signal } from '$lib/modules/Signal';
export class Mesh {
    Object: THREE.Object3D = new THREE.Object3D();
    private objLoader = new OBJLoader();
    private mtlLoader = new MTLLoader();
    private _ObjectPath?: string
    private _MaterialPath?: string
    Loaded = new Signal<THREE.Object3D | undefined>()
    set MaterialPath(value: string) {
        this._MaterialPath = value
        this.LoadObject()
    }
    get MaterialPath() {
        return this._MaterialPath || ""
    }
    set ObjectPath(value: string) {
        this._ObjectPath = value
        this.LoadObject()
    }
    get ObjectPath() {
        return this._ObjectPath || ""
    }
    private async LoadObject() {
        if (this._MaterialPath) {
            const materials = await this.mtlLoader.loadAsync(this._MaterialPath)
            materials.preload();
            this.objLoader.setMaterials( materials );
        }
        
        
        if (this._ObjectPath) {
            let parent = this.Object?.parent
            if (parent) {
                parent.remove(this.Object!)
            }
            
            this.Object = await this.objLoader.loadAsync(this._ObjectPath);
            if (parent) {
                parent.add(this.Object)
            }
        }
        this.Loaded.Emit(this.Object)
    }
    Destroy() {
        if (this.Object) {
            this.Object.parent?.remove(this.Object)
        }
    }
    constructor(ObjectPath?: string, MaterialPath?: string) {
        this._ObjectPath = ObjectPath
        this._MaterialPath = MaterialPath
        this.LoadObject()
    }
}