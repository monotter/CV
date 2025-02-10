export const Wait = (Timeout?: number) => {
    return new Promise((resolve) => {
        if (Timeout) {
            setTimeout(() => {
                resolve(true)
            }, Timeout)
        }
    })
}