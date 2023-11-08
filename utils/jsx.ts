export function h(tag, props, ...children) {
  const element = document.createElement(tag);

  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      element[prop] = props[prop];
    }
  }

  for (const child of children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}
