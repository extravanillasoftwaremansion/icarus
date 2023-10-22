import { Component } from "../../../decorators/component/index.js";
import { Props, Prop } from '../../../decorators/prop/index.js'

@Component({
  tag: "user-item",
})
@Props(['user'])
export class UserItem extends HTMLElement {
  @Prop user: { name: string } | null;

  constructor() {
    super();
    console.log(this.user);
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
          this?.user?.name ? `
            <li id="user-item" class="user-item">${this?.user?.name || "Loading..."}</li>` : ""
        }
      `;

    return template;
  }
}

export default UserItem;
