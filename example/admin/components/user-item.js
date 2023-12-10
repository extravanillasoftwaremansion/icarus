// pages/admin/components/user-item.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Props, Prop, State, JSX } from "1car.us/dist/index";
let UserItem = class UserItem {
    constructor() {
        this.count = 0;
    }
    increment(el) {
        this.count = this.count + 1;
        el.srcElement.innerText = this.count;
    }
    renderItems() {
        var _a;
        const userName = (_a = this === null || this === void 0 ? void 0 : this.user) === null || _a === void 0 ? void 0 : _a.name;
        if (userName) {
            return (JSX("li", { id: "user-item", className: "user-item", style: {
                    margin: "10px 0",
                    border: "1px solid #ddd",
                    padding: "10px",
                } }, userName || "Loading..."));
        }
    }
    render() {
        return (JSX("div", null,
            this.renderItems(),
            JSX("button", { id: "incrementButton", onclick: (el) => this.increment(el) }, String(this.count))));
    }
};
__decorate([
    Prop,
    __metadata("design:type", Object)
], UserItem.prototype, "user", void 0);
__decorate([
    State,
    __metadata("design:type", Number)
], UserItem.prototype, "count", void 0);
UserItem = __decorate([
    Props(["user"])
], UserItem);
export { UserItem };
export default UserItem;
