import { Component } from "../../../decorators/component/index.js";

@Component({
  tag: "user-list",
})
export class UserList extends HTMLElement {
  users: any[];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Initialize the user data
    this.users = [];

    // Fetch and render users
    this.fetchAndRenderUsers();
  }

  async fetchAndRenderUsers() {
    // Mock API endpoint (replace with your actual API endpoint)
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    try {
      const response = await fetch(apiUrl);
      const users = await response.json();
      this.users = users;
      this.renderUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  renderUsers() {
    const userFragment = document.createDocumentFragment();

    this.users.forEach((user) => {
      const userItem = document.createElement("user-item");
      userItem.setAttribute("user", JSON.stringify(user));
      userFragment.appendChild(userItem);
    });

    this.shadowRoot.appendChild(userFragment);
  }
}

export default UserList;