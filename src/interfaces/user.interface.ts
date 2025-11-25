//archivo donde esta la info del usuario

export interface User {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string;
}