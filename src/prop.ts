// src/decorators/prop/index.ts

export function Props(attributes: string[]) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    class CustomElement extends constructor {
      constructor(...args: any[]) {
        super(...args);
      }

      static get observedAttributes() {
        return attributes;
      }

      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        if (attributes.includes(name) && oldValue !== newValue) {
          // Handle changes to the specified attributes
          // For example, update the corresponding instance variable
          this[name] = JSON.parse(newValue);
          // @ts-ignore
          const style = this.shadowRoot.querySelector("style");
          // @ts-ignore
          this.shadowRoot.innerHTML = "";
          // @ts-ignore
          const jsx = constructor.prototype.render();
          // @ts-ignore
          if (jsx) this.shadowRoot.appendChild(jsx);
          // @ts-ignore
          if (style) this.shadowRoot.appendChild(style);
        }
      }
    }
  };
}

export function Prop(target: any, key: string) {
  let privateValue: any;

  const getter = function () {
    return privateValue;
  };

  const setter = function (newVal: any) {
    privateValue = newVal;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

export default Prop;
