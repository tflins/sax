interface ICallback {
  (data: unknown): unknown
}
export interface IPubSup {
  subscriberMap: Map<string, ICallback[]>
  subscribe: (event: string, callback: ICallback) => Map<string, ICallback[]>
  publish: (event: string, data?: unknown) => void
}

export class PubSub implements IPubSup {
  private _subscriberMap: Map<string, ICallback[]> = new Map()

  get subscriberMap() {
    return this._subscriberMap
  }

  subscribe(event: string, callback: ICallback): Map<string, ICallback[]> {
    const subscriber = this.subscriberMap.get(event)
    if (!subscriber) {
      return this.subscriberMap.set(event, [callback])
    }
    subscriber.push(callback)
    return this.subscriberMap
  }

  publish(event: string, data?: unknown) {
    const subscriber = this.subscriberMap.get(event) || []
    subscriber.forEach((callback: ICallback) => {
      callback(data)
    })
  }
}
