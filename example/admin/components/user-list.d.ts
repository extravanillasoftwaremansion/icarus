export declare class UserList extends HTMLElement {
    users: any[];
    constructor();
    fetchAndRenderUsers(): Promise<void>;
    renderUsers(): void;
}
export default UserList;
