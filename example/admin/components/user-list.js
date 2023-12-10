// pages/admin/components/user-list.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from "1car.us/dist/index.js";
import { UserItem } from "./user-item.js";
let UserList = class UserList extends HTMLElement {
    constructor() {
        super();
        // Initialize the user data
        this.users = [];
        // Fetch and render users
        this.fetchAndRenderUsers();
    }
    fetchAndRenderUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            // Mock API endpoint (replace with your actual API endpoint)
            const apiUrl = "https://jsonplaceholder.typicode.com/users";
            try {
                const response = yield fetch(apiUrl);
                const users = yield response.json();
                this.users = users;
                this.renderUsers();
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        });
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
};
UserList = __decorate([
    Component({
        tag: "user-list",
    }),
    __metadata("design:paramtypes", [])
], UserList);
export { UserList };
export default UserList;
