import { Tween as TWEEN, Easing } from "@tweenjs/tween.js";
import { CFrame } from "$lib/modules/3D/CFrame";
import { Vector3 } from "$lib/modules/3D/Vector3";
import type { Instance } from "$lib/modules/3D/Instance";
import { AnimationFunctions } from "$lib/modules/AnimationFrame";
import { Signal } from "$lib/modules/Signal";

export enum EasingStyle {
    Linear,
    Sine,
    Back,
    Quad,
    Quart,
    Quint,
    Bounce,
    Elastic,
    Exponential,
    Circular,
    Cubic,
}
export enum EasingDirection {
    In,
    Out,
    InOut,
}
export enum PlaybackState {
    Begin,
    Delayed,
    Playing,
    Paused,
    Completed,
    Cancelled
}
type EasingFunction = (amount: number) => number;
const EasingMap = {
    [EasingDirection.In]: {
        [EasingStyle.Linear]: Easing.Linear.In,
        [EasingStyle.Sine]: Easing.Sinusoidal.In,
        [EasingStyle.Back]: Easing.Back.In,
        [EasingStyle.Quad]: Easing.Quadratic.In,
        [EasingStyle.Quart]: Easing.Quartic.In,
        [EasingStyle.Quint]: Easing.Quintic.In,
        [EasingStyle.Bounce]: Easing.Bounce.In,
        [EasingStyle.Elastic]: Easing.Elastic.In,
        [EasingStyle.Exponential]: Easing.Exponential.In,
        [EasingStyle.Circular]: Easing.Circular.In,
        [EasingStyle.Cubic]: Easing.Cubic.In,
    },
    [EasingDirection.Out]: {
        [EasingStyle.Linear]: Easing.Linear.Out,
        [EasingStyle.Sine]: Easing.Sinusoidal.Out,
        [EasingStyle.Back]: Easing.Back.Out,
        [EasingStyle.Quad]: Easing.Quadratic.Out,
        [EasingStyle.Quart]: Easing.Quartic.Out,
        [EasingStyle.Quint]: Easing.Quintic.Out,
        [EasingStyle.Bounce]: Easing.Bounce.Out,
        [EasingStyle.Elastic]: Easing.Elastic.Out,
        [EasingStyle.Exponential]: Easing.Exponential.Out,
        [EasingStyle.Circular]: Easing.Circular.Out,
        [EasingStyle.Cubic]: Easing.Cubic.Out,
    },
    [EasingDirection.InOut]: {
        [EasingStyle.Linear]: Easing.Linear.InOut,
        [EasingStyle.Sine]: Easing.Sinusoidal.InOut,
        [EasingStyle.Back]: Easing.Back.InOut,
        [EasingStyle.Quad]: Easing.Quadratic.InOut,
        [EasingStyle.Quart]: Easing.Quartic.InOut,
        [EasingStyle.Quint]: Easing.Quintic.InOut,
        [EasingStyle.Bounce]: Easing.Bounce.InOut,
        [EasingStyle.Elastic]: Easing.Elastic.InOut,
        [EasingStyle.Exponential]: Easing.Exponential.InOut,
        [EasingStyle.Circular]: Easing.Circular.InOut,
        [EasingStyle.Cubic]: Easing.Cubic.InOut,
    },
} as const
export class TweenInfo {
    EasingDirection: EasingDirection
    Time: number
    DelayTime: number
    RepeatCount: number
    EasingStyle: EasingStyle
    Reverses: boolean
    constructor(time: number = 1, easingStyle: EasingStyle = EasingStyle.Quad, easingDirection: EasingDirection = EasingDirection.Out, repeatCount: number = 0, reverses: boolean = false, delayTime: number = 0) {
        this.DelayTime = delayTime
        this.EasingDirection = easingDirection
        this.Time = time
        this.EasingStyle = easingStyle
        this.RepeatCount = repeatCount
        this.Reverses = reverses
    }
}

export class TweenBase {
    protected _PlaybackState: PlaybackState = PlaybackState.Paused
    get PlaybackState() {
        return this._PlaybackState
    }
    Completed = new Signal()
    protected TWEEN: TWEEN | undefined
    constructor() {
        this._PlaybackState = PlaybackState.Begin
    }
    Cancel() {
        this.TWEEN?.stop()
        this._PlaybackState = PlaybackState.Cancelled
    }
    Pause() {
        this.TWEEN?.pause()
        this._PlaybackState = PlaybackState.Paused
    }
    Play() {
        if (this.TWEEN?.isPaused()) this.TWEEN.resume()
        else this.TWEEN?.start()
        this._PlaybackState = PlaybackState.Playing
    }
}
export class Tween<T extends Instance> extends TweenBase {
    readonly Instance: T
    readonly TweenInfo: TweenInfo
    private tween(duration: number, easing: EasingFunction, repeat: number, delay: number) {
        const AnimationId = crypto.randomUUID()
        const object = { alpha: 0 }
        const tween = new TWEEN(object).to({alpha: 1}, duration)
        .easing(easing)
        .repeat(repeat)
        .delay(delay)
        .onEveryStart(() => {
            AnimationFunctions.set(AnimationId, () => {
                tween.update()
            })
        })
        .onComplete(() => {
            AnimationFunctions.delete(AnimationId)
        }).onRepeat(() => {
            this._PlaybackState = PlaybackState.Delayed
        }).onUpdate(() => {
            this._PlaybackState = PlaybackState.Playing
        }).onComplete(() => {
            this._PlaybackState = PlaybackState.Completed
            this.Completed.Emit()
        })
        AnimationFunctions.set(AnimationId, () => {
            tween.update()
        })
        return tween
    }
    constructor(instance: T, tweenInfo: TweenInfo, propertyTable: { [key: string]: Vector3 | number | CFrame }) {
        super()
        this.Instance = instance
        this.TweenInfo = tweenInfo
        let rc = tweenInfo.RepeatCount
        if (rc === -1) rc = Infinity
        const Initials: any = { }
        Object.keys(propertyTable).forEach((key) => {
            const Value = (instance as any)[key]
            if (Value instanceof Vector3) {
                Initials[key] = new Vector3(Value.X, Value.Y, Value.Z)
            } else if (Value instanceof CFrame) {
                Initials[key] = new CFrame(...Value.components())
            } else {
                Initials[key] = Value
            }
        }) 
        this.TWEEN = this.tween(tweenInfo.Time, EasingMap[tweenInfo.EasingDirection][tweenInfo.EasingStyle], tweenInfo.RepeatCount, tweenInfo.DelayTime).onUpdate(({ alpha }) => {
            Object.keys(propertyTable).forEach((key) => {
                const Value = (instance as any)[key]
                if (Value instanceof Vector3) {
                    ;(instance as any)[key] = Initials[key].lerp(propertyTable[key] as Vector3, alpha)
                } else if (Value instanceof CFrame) {
                    ;(instance as any)[key] = Initials[key].lerp(propertyTable[key] as CFrame, alpha)
                } else {
                    ;(instance as any)[key] = Initials[key] as number * alpha
                }
            })    
        })
    }
    static GetValue(alpha: number, easingStyle: EasingStyle, easingDirection: EasingDirection): number {
        return EasingMap[easingDirection][easingStyle](alpha)
    }
}