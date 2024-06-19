export interface User {
    id?: string;
    email: string;
    username: string;
    password: string;
}

export interface CurrentUser {
    uid: string;
    email: string;
    username?: any
}