export type DisconnectFunction = () => void
export class Signal<T extends any = unknown> {
    private Connections: Map<string, (T?: T) => void> = new Map()
    Connect(func: (T?: T) => void): DisconnectFunction {
        const ConnectionId = crypto.randomUUID()
        this.Connections.set(ConnectionId, func)
        return () => {
            this.Connections.delete(ConnectionId)
        }
    }
    Emit(T?: T) {
        this.Connections.forEach((func) => {
            func(T)
        })
    }

    Once(func: (T?: T) => void): DisconnectFunction {
        let disconnect: DisconnectFunction
        disconnect = this.Connect((T) => {
            func(T)
            disconnect()
        })
        return disconnect
    }
    Wait(Timeout?: number): Promise<T | undefined> {
        return new Promise((resolve) => {
            const disconnect = this.Once(resolve)
            if (Timeout) {
                setTimeout(() => {
                    resolve(undefined)
                    disconnect()
                }, Timeout)
            }
        })
    }
}