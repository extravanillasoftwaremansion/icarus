import { Props, Prop } from "../../../decorators/prop/index.js";
import { State } from "../../../decorators/state/index.js";

@Props(["user"])
export class UserItem {
  @Prop user: { name: string } | null;
  @State count: number = 0;

  increment() {
    this.count = this.count + 1;
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
        ${
          this?.user?.name
            ? `
            <li id="user-item" class="user-item">${
              this?.user?.name || "Loading..."
            }</li>`
            : ""
        }
        <button id="incrementButton">${this.count}</button>
      `;

    const incrementButton = template.querySelector("#incrementButton");

    incrementButton.addEventListener("click", () => {
      this.increment();
      incrementButton.textContent = String(this.count);
    });

    return template;
  }
}

export default UserItem;
