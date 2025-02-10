import * as THREE from 'three';
import { PartGeometry } from '$lib/modules/3D/Geometry';
import { CFrame } from '$lib/modules/3D/CFrame';
import { Vector3 } from '$lib/modules/3D/Vector3';
import { Instance } from '$lib/modules/3D/Instance';
export class BasePart<T extends THREE.Object3D> extends Instance {
    private _Object: T = new THREE.Object3D() as T
    private Geometry = new PartGeometry()
    get Object(): T {
        return this._Object
    }
    set Object(value: T) {
        this._Object = value
        this.UpdateObjectTransform()
    }
    private UpdateObjectTransform() {
        this.Object.position.set(this.Position.X, this.Position.Y, this.Position.Z)
        this.Object.rotation.set(this.Orientation.X, this.Orientation.Y, this.Orientation.Z)
        this.Object.scale.set(this.Size.X, this.Size.Y, this.Size.Z)
    }
    get Position() {
        return this.Geometry.CFrame.Position
    }
    set Position(value: Vector3) {
        this.Geometry.CFrame = new CFrame(value)
        this.UpdateObjectTransform()
    }
    get Orientation() {
        return this.Geometry.CFrame.toOrientation()
    }
    set Orientation(value: Vector3) {
        this.Geometry.CFrame = CFrame.Angles(value.X, value.Y, value.Z)
        this.UpdateObjectTransform()
    }
    get Size() {
        return this.Geometry.Size
    }
    set Size(value: Vector3) {
        this.Geometry.Size = value
        this.UpdateObjectTransform()
    }
}