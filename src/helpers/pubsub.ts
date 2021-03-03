interface ICallback {
  (): unknown;
}

export interface IPubSup {
  events: Map<string, ICallback>;
}

export class PubSub implements IPubSup {
  events: Map<string, ICallback> = new Map();

  subscribe(event: string, callback: ICallback) {
    if (!this.events.has(event)) {
      this.events.set(event, callback);
    }
  }
}
