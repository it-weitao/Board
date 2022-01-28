export default class CustomEventTarget extends EventTarget {
  constructor() {
    super();
  }

  public dispatch<T = any>(type: string, detail: T): boolean {
    return this.dispatchEvent(
      new CustomEvent<T>(type, {
        detail,
      })
    );
  }

  public addListener<T = any>(
    type: string,
    callback: (event: CustomEvent<T>) => void
  ): void {
    console.log(this);
    return this.addEventListener(type, callback as (evt: Event) => void);
  }

  public removeListener<T = any>(
    type: string,
    callback: (event: CustomEvent<T>) => void
  ): void {
    return this.removeEventListener(type, callback as (evt: Event) => void);
  }
}
