import { Component } from "../../../decorators/component/index.js";

@Component({
  tag: "user-item",
})
export class UserItem extends HTMLElement {
  _observedAttributes;

  constructor() {
    super();

    // Define the observed attribute(s)
    this._observedAttributes = ["user"];
  }

  static get observedAttributes() {
    return ["user"];
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "user") {
      // Handle changes to the "user" attribute here
      // Parse the new value if needed
      const user = JSON.parse(newValue);
      // Do something with the user data
      // For example, update the content of the element
      this.shadowRoot.getElementById("user-item").textContent = user.name;
    }
  }

  render() {
    const template = document.createElement("div");

    template.innerHTML = `
        <style>
          /* Define component-specific styles here */
          li {
            margin: 10px 0;
            border: 1px solid #ddd;
            padding: 10px;
          }
        </style>
        <li id="user-item" class="user-item"></li>
      `;

    return template;
  }
}

export default UserItem;
