import { Component } from "../../../decorators/component/index.js";
import { UserItem } from './user-item.js';

@Component({
  tag: "user-list",
})
export class UserList extends HTMLElement {
  users: any[];

  constructor() {
    super();
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
      const item = new UserItem();
      item.user = user;
      const jsx = item.render();
      userFragment.appendChild(jsx);
    });

    this.shadowRoot.appendChild(userFragment);
  }
}

export default UserList;
