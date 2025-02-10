export const AnimationFunctions = new Map();

function animate() {
    requestAnimationFrame(() => {
        AnimationFunctions.forEach((value, key) => {
            try {
                value();
            } catch (e) {
                console.error(e)
            }
        })
        animate();
    })
}
animate();