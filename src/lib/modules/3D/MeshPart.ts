import * as THREE from 'three';
import { BasePart } from "$lib/modules/3D/BasePart";
import { Mesh } from '$lib/modules/3D/Mesh';
import { Vector3 } from '$lib/modules/3D/Vector3';

export class MeshPart<T extends THREE.Object3D> extends BasePart<T> {
    readonly Mesh: Mesh
    MeshPath: string
    TexturePath: string
    constructor(MeshPath: string, TexturePath: string, scene: THREE.Scene) {
        super()
        const _Mesh = new Mesh(MeshPath, TexturePath)
        this.Object = _Mesh.Object as T
        this.Mesh = _Mesh
        this.MeshPath = MeshPath
        this.TexturePath = TexturePath
        this.Mesh.Loaded.Connect((mesh) => {
            if (mesh) {
                this.Object = mesh as T
                this.Size = new Vector3(1,1,1)
            }
        })
    }
}