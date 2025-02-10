//Depedency
import { Vector3 } from "$lib/modules/3D/Vector3";

//API
var m41 = 0, m42 = 0, m43 = 0, m44 = 1;

var right = new Vector3(1, 0, 0);
var up = new Vector3(0, 1, 0);
var back = new Vector3(0, 0, 1);

var pow=Math.pow,cos=Math.cos,sin=Math.sin,sqrt=Math.sqrt,max=Math.max,min=Math.min,acos=Math.acos,asin=Math.asin,atan2=Math.atan2;


export class CFrame {
    m11: number; m21: number; m31: number;
    m12: number; m22: number; m32: number;
    m13: number; m23: number; m33: number;
    m14: number; m24: number; m34: number;
    Position: Vector3;
    X: number;
    Y: number;
    Z: number;
    lookVector: Vector3;
    rightVector: Vector3;
    upVector: Vector3;
    __type: "CFrame";

    public constructor(_p1?: Vector3);
    public constructor(_p1?: Vector3, _p2?: Vector3);
    public constructor(_p1?: number | Vector3, _p2?: number | Vector3, _p3?: number);
    public constructor(_p1?: number | Vector3, _p2?: number | Vector3, _p3?: number);
    public constructor(_p1?: number | Vector3, _p2?: number | Vector3, _p3?: number, _p4?: number, _p5?: number, _p6?: number, _p7?: number);
    public constructor(_p1?: number | Vector3, _p2?: number | Vector3, _p3?: number, _p4?: number, _p5?: number, _p6?: number, _p7?: number, _p8?: number, _p9?: number, _p10?: number, _p11?: number, _p12?: number)
    public constructor(_p1?: number | Vector3, _p2?: number | Vector3, _p3?: number, _p4?: number, _p5?: number, _p6?: number, _p7?: number, _p8?: number, _p9?: number, _p10?: number, _p11?: number, _p12?: number, _p13?: number) {
        this.m11=1; this.m12=0; this.m13=0; this.m14=0;
        this.m21=0; this.m22=1; this.m23=0; this.m24=0;
        this.m31=0; this.m32=0; this.m33=1; this.m34=0;
        this.X = 0; this.Y = 0; this.Z = 0;

        this.Position = new Vector3();
        this.lookVector = new Vector3(0,0,-1);
        this.rightVector = new Vector3(1,0,0);
        this.upVector = new Vector3(0,1,0);
        this.__type = "CFrame";
    
        if (arguments.length == 1) {
            if(!arguments[0].__type || arguments[0].__type != "Vector3") { Error("Not a valid Vector3"); }
            let pos: Vector3 =arguments[0];
            this.m14 = pos.X;
            this.m24 = pos.Y;
            this.m34 = pos.Z;
            this.X = pos.X; this.Y = pos.Y; this.Z = pos.Z;
            this.Position = new Vector3(pos.X, pos.Y, pos.Z);
            this.lookVector = new Vector3(-this.m13, -this.m23, -this.m33);
            this.rightVector = new Vector3(this.m11, this.m21, this.m31);
            this.upVector = new Vector3(this.m12, this.m22, this.m32);
        }
        else if (arguments.length == 2) {
            for (let i = 0; i < arguments.length; i++) { if(!arguments[i].__type || arguments[i].__type != "Vector3") { Error("Not a valid Vector3"); } }
            let eye: Vector3 = arguments[0], look: Vector3 = arguments[1];
            let zAxis = eye.sub(look).unit();
            let xAxis = up.cross(zAxis);
            let yAxis = zAxis.cross(xAxis);
            if (xAxis.magnitude == 0) {
                if (zAxis.Y < 0){
                    xAxis = new Vector3(0,0,-1);
                    yAxis = new Vector3(1,0,0);
                    zAxis = new Vector3(0,-1,0);
                }
                else {
                    xAxis = new Vector3(0,0,1);
                    yAxis = new Vector3(1,0,0);
                    zAxis = new Vector3(0,1,0);
                }
            }
            this.m11 = xAxis.X; this.m12 = yAxis.X; this.m13 = zAxis.X; this.m14 = eye.X;
            this.m21 = xAxis.Y; this.m22 = yAxis.Y; this.m23 = zAxis.Y; this.m24 = eye.Y;
            this.m31 = xAxis.Z; this.m32 = yAxis.Z; this.m33 = zAxis.Z; this.m34 = eye.Z;
            this.X = this.m14; this.Y = this.m24; this.Z = this.m34;
            this.Position = new Vector3(this.m14, this.m24, this.m34);
            this.lookVector = new Vector3(-this.m13, -this.m23, -this.m33);
            this.rightVector = new Vector3(this.m11, this.m21, this.m31);
            this.upVector = new Vector3(this.m12, this.m22, this.m32);
        }
        else if (arguments.length == 3) {
            for (let i = 0; i < arguments.length; i++) { if (typeof(arguments[i]) != "number") { Error("Not a valid number!"); }}
            this.m14 = arguments[0];
            this.m24 = arguments[1];
            this.m34 = arguments[2];
            this.X = this.m14; this.Y = this.m24; this.Z = this.m34;
            this.Position = new Vector3(this.m14, this.m24, this.m34);
            this.lookVector = new Vector3(-this.m13, -this.m23, -this.m33);
            this.rightVector = new Vector3(this.m11, this.m21, this.m31);
            this.upVector = new Vector3(this.m12, this.m22, this.m32);
        }
        else if (arguments.length == 7) {
            for (let i = 0; i < arguments.length; i++){ if (typeof(arguments[i]) != "number") { Error("Not a valid number!"); }}
            let i = arguments[3], j = arguments[4], k = arguments[5], w = arguments[6];
            this.m14 = arguments[0];
            this.m24 = arguments[1];
            this.m34 = arguments[2];
            this.m11 = 1 - 2 * pow(j, 2) - 2 * pow(k, 2);
            this.m12 = 2 * (i * j - k * w);
            this.m13 = 2 * (i * k + j * w);
            this.m21 = 2 * (i * j + k * w);
            this.m22 = 1 - 2 * pow(i,2) - 2 * pow(k,2);
            this.m23 = 2 * (j * k - i * w);
            this.m31 = 2 * (i * k + j * w);
            this.m32 = 2 * (j*k+i*w);
            this.m33 = 1 - 2 * pow(i, 2) - 2 * pow(j, 2);
            this.X = this.m14; this.Y = this.m24; this.Z = this.m34;
            this.Position = new Vector3(this.m14,this.m24,this.m34);
            this.lookVector = new Vector3(-this.m13, -this.m23, -this.m33);
            this.rightVector = new Vector3(this.m11, this.m21, this.m31);
            this.upVector = new Vector3(this.m12, this.m22, this.m32);
        }
        else if (arguments.length == 12) {
            for(let i=0; i < arguments.length; i++) { if(typeof(arguments[i]) != "number") { Error("Not a valid number!"); }}
            this.m14 = arguments[0]; this.m24 = arguments[1]; this.m34 = arguments[2];
            this.m11 = arguments[3]; this.m12 = arguments[4]; this.m13 = arguments[5];
            this.m21 = arguments[6]; this.m22 = arguments[7]; this.m23 = arguments[8];
            this.m31 = arguments[9]; this.m32 = arguments[10]; this.m33 = arguments[11];
            this.X = this.m14; this.Y = this.m24; this.Z = this.m34;
            this.Position = new Vector3(this.m14, this.m24, this.m34);
            this.lookVector = new Vector3(-this.m13, -this.m23, -this.m33);
            this.rightVector = new Vector3(this.m11, this.m21, this.m31);
            this.upVector = new Vector3(this.m12, this.m22, this.m32);
        }
    
        //REASON WE DO THIS IS BECAUSE FOR SOME REASON SOME OF THE VALUES GO BEYOND THE UNIT BOUND, WILL FIND FIX FOR THIS
        this.m11 = min(max(this.m11, -1), 1); this.m12 = min(max(this.m12, -1), 1); this.m13 = min(max(this.m13, -1), 1);
        this.m21 = min(max(this.m21, -1), 1); this.m22 = min(max(this.m22, -1), 1); this.m23 = min(max(this.m23, -1), 1);
        this.m31 = min(max(this.m31, -1), 1); this.m32 = min(max(this.m32, -1), 1); this.m33 = min(max(this.m33, -1), 1);
    }

    add (b: Vector3): CFrame {
        if(!b.__type || b.__type != "Vector3") { Error("Not a valid Vector3"); }
        return new CFrame(this.X + b.X, this.Y + b.Y, this.Z + b.Z, this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    };

    sub (b: Vector3): CFrame {
        if(!b.__type || b.__type!="Vector3"){Error("Not a valid Vector3");}
        return new CFrame(this.X - b.X, this.Y - b.Y, this.Z - b.Z, this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    };

    mult(b: Vector3 | CFrame): CFrame {
        if (!b.__type && (b as Vector3).__type != "Vector3" && (b as CFrame).__type != "CFrame") { Error("Not a valid Vector3/CFrame"); }
        if (b.__type == "Vector3") {
            let RIGHT = new Vector3(this.m11, this.m21, this.m31), UP = new Vector3(this.m12, this.m22, this.m32), BACK = new Vector3(this.m13, this.m23, this.m33);
            return new CFrame(this.Position.add(RIGHT.mult(b.X)).add(UP.mult(b.Y)).add(BACK.mult(b.Z)));
        } else {//CFrame * CFrame
            let n11 = this.m11 * b.m11 + this.m12 * b.m21 + this.m13 * b.m31 + this.X * m41;
			let n12 = this.m11 * b.m12 + this.m12 * b.m22 + this.m13 * b.m32 + this.X * m42;
			let n13 = this.m11 * b.m13 + this.m12 * b.m23 + this.m13 * b.m33 + this.X * m43;
			let n14 = this.m11 * b.X + this.m12 * b.Y + this.m13 * b.Z + this.X * m44;
			let n21 = this.m21 * b.m11 + this.m22 * b.m21 + this.m23 * b.m31 + this.Y * m41;
			let n22 = this.m21 * b.m12 + this.m22 * b.m22 + this.m23 * b.m32 + this.Y * m42;
			let n23 = this.m21 * b.m13 + this.m22 * b.m23 + this.m23 * b.m33 + this.Y * m43;
			let n24 = this.m21 * b.X + this.m22 * b.Y + this.m23 * b.Z + this.Y * m44;
			let n31 = this.m31 * b.m11 + this.m32 * b.m21 + this.m33 * b.m31 + this.Z * m41;
			let n32 = this.m31 * b.m12 + this.m32 * b.m22 + this.m33 * b.m32 + this.Z * m42;
			let n33 = this.m31 * b.m13 + this.m32 * b.m23 + this.m33 * b.m33 + this.Z * m43;
			let n34 = this.m31 * b.X + this.m32 * b.Y + this.m33 * b.Z + this.Z * m44;
			return new CFrame(n14, n24, n34, n11, n12, n13, n21, n22, n23, n31, n32, n33);
        }
    };
    static fromAxisAngle(axis: Vector3, theta: number) {
        let r = CFrame.vectorAxisAngle(axis, right, theta);
        let u = CFrame.vectorAxisAngle(axis, up, theta);
        let b = CFrame.vectorAxisAngle(axis, back, theta);
        return new CFrame(0, 0, 0, r.X, u.X, b.X, r.Y, u.Y, b.Y, r.Z, u.Z, b.Z);
    }
    static Angles(x: number, y: number, z: number): CFrame {
        let cfx = CFrame.fromAxisAngle(right, x);
        let cfy = CFrame.fromAxisAngle(up, y);
        let cfz = CFrame.fromAxisAngle(back, z);
        return cfx.mult(cfy).mult(cfz);
    };
    static vectorAxisAngle(n: Vector3, v: Vector3, t: number){
        n=n.unit();
        return (v.mult(cos(t))).add(n.mult(v.dot(n))).add(n.cross(v).mult(sin(t)));
    }
    
    static getDeterminant(a: CFrame){
        return (a.m11 * a.m22 * a.m33 * m44 + a.m11 * a.m23 * a.Z * m42 + a.m11 * a.Y * a.m32 * m43
                        + a.m12 * a.m21 * a.Z * m43 + a.m12 * a.m23 * a.m31 * m44 + a.m12 * a.Y * a.m33 * m41
                        + a.m13 * a.m21 * a.m32 * m44 + a.m13 * a.m22 * a.Z * m41 + a.m13 * a.Y * a.m31 * m42
                        + a.X * a.m21 * a.m33 * m42 + a.X * a.m22 * a.m31 * m43 + a.X * a.m23 * a.m32 * m41
                        - a.m11 * a.m22 * a.Z * m43 - a.m11 * a.m23 * a.m32 * m44 - a.m11 * a.Y * a.m33 * m42
                        - a.m12 * a.m21 * a.m33 * m44 - a.m12 * a.m23 * a.Z * m41 - a.m12 * a.Y * a.m31 * m43
                        - a.m13 * a.m21 * a.Z * m42 - a.m13 * a.m22 * a.m31 * m44 - a.m13 * a.Y * a.m32 * m41
                        - a.X * a.m21 * a.m32 * m43 - a.X * a.m22 * a.m33 * m41 - a.X * a.m23 * a.m31 * m42)
    }
    
    static invert4x4(a: CFrame) {
        let det = this.getDeterminant(a);
        if (det == 0) { return a; }
        var b11 = (a.m22 * a.m33 * m44 + a.m23 * a.Z * m42 + a.Y * a.m32 * m43 - a.m22 * a.Z * m43 - a.m23 * a.m32 * m44 - a.Y * a.m33 * m42) / det;
        var b12 = (a.m12 * a.Z * m43 + a.m13 * a.m32 * m44 + a.X * a.m33 * m42 - a.m12 * a.m33 * m44 - a.m13 * a.Z * m42 - a.X * a.m32 * m43) / det;
        var b13 = (a.m12 * a.m23 * m44 + a.m13 * a.Y * m42 + a.X *a.m22 * m43 -a.m12 * a.Y * m43 - a.m13 * a.m22 * m44 - a.X * a.m23 * m42) / det;
        var b14 = (a.m12 * a.Y * a.m33 + a.m13 * a.m22 * a.Z + a.X * a.m23 * a.m32 - a.m12 * a.m23 * a.Z - a.m13 * a.Y * a.m32 - a.X * a.m22 * a.m33) / det;
        var b21 = (a.m21 * a.Z * m43 + a.m23 * a.m31 * m44 + a.Y * a.m33 * m41 - a.m21 * a.m33 * m44 - a.m23 * a.Z * m41 - a.Y *a.m31 * m43) / det;
        var b22 = (a.m11 * a.m33 * m44 + a.m13 * a.Z * m41 + a.X * a.m31 * m43 - a.m11 * a.Z * m43 - a.m13 * a.m31 * m44 - a.X * a.m33 * m41) / det;
        var b23 = (a.m11 * a.Y * m43 + a.m13 * a.m21 * m44 + a.X * a.m23 * m41 - a.m11 * a.m23 * m44 - a.m13 * a.Y * m41 - a.X * a.m21 * m43) / det;
        var b24 = (a.m11 * a.m23 * a.Z + a.m13 * a.Y * a.m31 + a.X * a.m21 * a.m33 -a.m11 * a.Y * a.m33 - a.m13 * a.m21 * a.Z - a.X * a.m23 * a.m31) / det;
        var b31 = (a.m21 * a.m32 * m44 + a.m22 * a.Z * m41 + a.Y * a.m31 * m42 - a.m21 * a.Z * m42 - a.m22 * a.m31 * m44 - a.Y * a.m32 * m41) / det;
        var b32 = (a.m11 * a.Z * m42 + a.m12 * a.m31 * m44 + a.X * a.m32 * m41 - a.m11 * a.m32 * m44 - a.m12 * a.Z * m41 - a.X * a.m31 * m42) / det;
        var b33 = (a.m11 * a.m22 * m44 + a.m12 * a.Y * m41 + a.X * a.m21 * m42 - a.m11 * a.Y * m42 - a.m12 * a.m21 * m44 - a.X * a.m22 * m41) / det;
        var b34 = (a.m11 * a.Y * a.m32 + a.m12 * a.m21 * a.Z + a.X * a.m22 * a.m31 - a.m11 * a.m22 * a.Z - a.m12 * a.Y * a.m31 - a.X * a.m21 * a.m32) / det;
        return new CFrame(b14, b24, b34, b11, b12, b13, b21, b22, b23, b31, b32, b33);
    }
    
    static quaternionFromCFrame(a: CFrame): [number, number, number, number] {
        let trace=a.m11+a.m22+a.m33;
        let w = 1, i = 0, j = 0, k = 0;
        if (trace > 0) {
            let s = sqrt(1 + trace);
            let r = 0.5 / s;
            w = s * 0.5; i = (a.m32 - a.m23) * r; j = (a.m13 - a.m31) * r; k = (a.m21 - a.m12) * r;
        }
        else {
            let big = max(max(a.m11, a.m22), a.m33);
            if (big == a.m11){
                let s = sqrt(1 + a.m11 - a.m22 - a.m33);
                let r = 0.5 / s;
                w = (a.m32 - a.m23) * r; i = s * 0.5; j = (a.m21 + a.m12) * r; k = (a.m13 + a.m31) * r;
            }
            else if (big == a.m22) {
                let s = sqrt(1 - a.m11 + a.m22 - a.m33);
                let r = 0.5 / s;
                w = (a.m13 + a.m31) * r; i = (a.m21 + a.m12) * r; j = s * 0.5; k = (a.m32 - a.m23) * r;
            }
            else if (big == a.m33) {
                let s = sqrt(1 - a.m11 - a.m22 + a.m33);
                let r = 0.5 / s;
                w = (a.m21 + a.m12) * r; i = (a.m13 + a.m31) * r; j = (a.m32 - a.m23) * r; k = s * 0.5;
            }
        }
        return [w, i, j, k];
    }
    
    static lerpinternal(a: CFrame, b: CFrame, t: number){
        let cf = a.inverse().mult(b);
        let q = CFrame.quaternionFromCFrame(cf);
        let w = q[0], i = q[1], j = q[2], k = q[3];
        let theta = acos(w) * 2;
        let v = new Vector3(i, j, k);
        let p = a.Position.lerp(b.Position,t);
        if (theta != 0) {
            let r = a.mult(CFrame.fromAxisAngle(v, theta * t));
            return (r.sub(r.Position)).add(p);
        }
        else {
            return (a.sub(a.Position)).add(p);
        }
    }
    toString(): String {
        return this.components().join(',');
    };

    inverse(){
        return CFrame.invert4x4(this);
    };

    lerp(cf2: CFrame, t: number): CFrame {
        return CFrame.lerpinternal(this, cf2, t);
    };

    toWorldSpace(cf2: CFrame): CFrame {
        return this.mult(cf2);
    };

    toObjectSpace(cf2: CFrame): CFrame {
        return this.inverse().mult(cf2);
    };

    pointToWorldSpace(v: Vector3): CFrame {
        return this.mult(v);
    };

    pointToObjectSpace(v: Vector3) {
        return this.inverse().mult(v);
    };

    vectorToWorldSpace(v: Vector3){
        return (this.sub(this.Position)).mult(v);
    };

    vectorToObjectSpace(v: Vector3){
        return (this.sub(this.Position)).inverse().mult(v);
    };

    components (){
        return [this.m14, this.m24, this.m34, this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33];
    };

    toOrientation(){
        let x = atan2(-this.m23, this.m33);
        let y = asin(this.m13);
        let z = atan2(-this.m12, this.m11);
        return new Vector3(x, y, z);
    };
}
