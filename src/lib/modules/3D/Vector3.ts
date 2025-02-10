export class Vector3 {
    X: number;
    Y: number;
    Z: number;
    __type: "Vector3";

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.__type = "Vector3";
    }

    static r(v: number, d: number): number {
        return Number(Math.round(Number(v + 'e' + d)) + 'e-' + d);
    }

    sub(a: Vector3): Vector3 {
        return new Vector3(this.X - a.X, this.Y - a.Y, this.Z - a.Z);
    }

    add(a: Vector3): Vector3 {
        return new Vector3(this.X + a.X, this.Y + a.Y, this.Z + a.Z);
    }

    mult(a: Vector3 | number): Vector3 {
        if (typeof a === "number") {
            return new Vector3(this.X * a, this.Y * a, this.Z * a);
        } else {
            return new Vector3(this.X * a.X, this.Y * a.Y, this.Z * a.Z);
        }
    }

    div(a: Vector3 | number): Vector3 {
        if (typeof a === "number") {
            return new Vector3(this.X / a, this.Y / a, this.Z / a);
        } else {
            return new Vector3(this.X / a.X, this.Y / a.Y, this.Z / a.Z);
        }
    }

    dot(a: Vector3): number {
        return this.X * a.X + this.Y * a.Y + this.Z * a.Z;
    }

    cross(a: Vector3): Vector3 {
        return new Vector3(
            this.Y * a.Z - a.Y * this.Z,
            this.Z * a.X - a.Z * this.X,
            this.X * a.Y - a.X * this.Y
        );
    }

    lerp(a: Vector3, t: number): Vector3 {
        return this.mult(1 - t).add(a.mult(t));
    }

    compare(a: Vector3): boolean {
        return this.X === a.X && this.Y === a.Y && this.Z === a.Z;
    }

    round(d: number): Vector3 {
        return new Vector3(
            Vector3.r(this.X, d),
            Vector3.r(this.Y, d),
            Vector3.r(this.Z, d)
        );
    }

    rotate(r: Vector3): Vector3 {
        let ny = this.Y * Math.cos(r.X) - this.Z * Math.sin(r.X);
        let nz = this.Y * Math.sin(r.X) + this.Z * Math.cos(r.X);
        let nx = this.X * Math.cos(r.Y) - nz * Math.sin(r.Y);
        nz = this.X * Math.sin(r.Y) + nz * Math.cos(r.Y);
        nx = nx * Math.cos(r.Z) - ny * Math.sin(r.Z);
        ny = nx * Math.sin(r.Z) + ny * Math.cos(r.Z);
        return new Vector3(nx, ny, nz);
    }

    rotateLocalSpace(r: Vector3, p: Vector3): Vector3 {
        let nP = this.sub(p);
        nP = nP.rotate(r);
        return nP.add(p);
    }

    toString(): string {
        return `${this.X},${this.Y},${this.Z}`;
    }

    get magnitude(): number {
        return Math.sqrt(this.dot(this));
    }

    unit(): Vector3 {
        return this.div(this.magnitude);
    }
}