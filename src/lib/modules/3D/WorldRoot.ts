import * as THREE from 'three';

import { AnimationFunctions } from '$lib/modules/AnimationFrame';
export type WorldRootOptions = {
    antialias: boolean,
    alpha: boolean,
    ambient: THREE.AmbientLight
}
export class WorldRoot {
    Renderer?: THREE.WebGLRenderer
    Element?: HTMLCanvasElement
    Camera: THREE.Camera
    Scene: THREE.Scene
    Options: WorldRootOptions
    private SceneId = crypto.randomUUID()
    private CreateRenderer(Element: HTMLCanvasElement) {
        return new THREE.WebGLRenderer({ antialias: this.Options.antialias, canvas: Element, alpha: this.Options.alpha })
    }
    private Render() {
        if (this.Renderer) {
            this.Renderer.render(this.Scene, this.Camera)
        }
    }
    constructor(Element?: HTMLCanvasElement, Camera?: THREE.Camera, Options?: Partial<WorldRootOptions>) {
        this.Scene = new THREE.Scene()
        this.Options = {
            antialias: true,
            alpha: true,
            ambient: new THREE.AmbientLight( 0xffffff, 2)
        }
        this.Scene.add(this.Options.ambient)
        this.Options = { ...this.Options, ...Options }
        if (Camera) { 
            this.Camera = Camera
        } else {
            this.Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        }
        if (Element) {
            this.Element = Element
            this.Renderer = this.CreateRenderer(Element)
        }
        AnimationFunctions.set(this.SceneId, () => {
            this.Render()
        })
    }
    setCamera(Camera: THREE.Camera) {
        this.Camera = Camera
    }
    Destroy() {
        AnimationFunctions.delete(this.SceneId)
        this.Renderer?.dispose()
        this.Scene.children.forEach((child) => {
            this.Scene.remove(child)
        })
    }
    setOptions(Options: Partial<WorldRootOptions>) {
        this.Scene.remove(this.Options.ambient)
        this.Options = { ...this.Options, ...Options }
        this.Scene.add(this.Options.ambient)
    }
    setCanvas(Element: HTMLCanvasElement) {
        this.Element = Element
        this.Renderer = this.CreateRenderer(Element)
        AnimationFunctions.set(this.SceneId, () => {
            this.Render()
        })
    }
}