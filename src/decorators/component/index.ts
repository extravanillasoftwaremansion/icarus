// src/decorators/component/index.ts

import { loadAndApplyStyles } from "./loadStyles.js";
import { ComponentConfig } from "./models.js";

/**
 * Defines a component with the specified configuration.
 *
 * @param config - The configuration for the component.
 */
export function Component(config: ComponentConfig) {
  // Return a class decorator
  return (constructor: { new (...args: any[]): HTMLElement }) => {
    class CustomElement extends constructor {
      constructor() {
        super();
        this.renderComponent();
      }

      render(): HTMLElement {
        throw new Error("You must implement render in your component class.");
      }

      renderComponent() {
        const shadowRoot = !config.shadow
          ? this.attachShadow({ mode: "open" })
          : undefined;

        if (shadowRoot && typeof constructor.prototype.render === "function") {
          const jsxElement =
            constructor?.prototype?.render(this) ?? this.render();
          if (jsxElement) {
            shadowRoot.appendChild(jsxElement);
          } else {
            throw new Error(
              "The JSX provided by render must be an instance of HTMLElement."
            );
          }
        } else {
          // no shadow set
        }
      }
    }

    if (config.styleUrl) {
      // Load and apply styles from the external CSS file
      loadAndApplyStyles(config.styleUrl, config, constructor);
    }

    customElements.define(config.tag, CustomElement);
  };
}

export default Component;
