import { ComponentConfig } from "./models";

export function applyStyles(
  cssText: string,
  config: ComponentConfig,
  target: any
) {
  if (config.shadow) {
    const shadow = target.prototype.shadowRoot;
    if (shadow) {
      const style = document.createElement("style");
      style.textContent = cssText;
      shadow.appendChild(style);
    }
  } else {
    const style = document.createElement("style");
    style.textContent = cssText;
    document.head.appendChild(style);
  }
}

export async function loadAndApplyStyles(
  url: string,
  config: ComponentConfig,
  target: any
) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const cssText = await response.text();
      applyStyles(cssText, config, target);
    } else {
      console.error(`Failed to load CSS file: ${url}`);
    }
  } catch (error) {
    console.error(`Error loading CSS file: ${url}`, error);
  }
}

export default loadAndApplyStyles;
