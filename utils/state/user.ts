import { observable } from "@legendapp/state";

type User = {
    id: string,
    name: string,
    phone: string,
    password: string,
    role?: 'owner' | 'manager' | 'shop-keeper',
    created_at?: string,
    updated_at?: string,
    deleted?: boolean,
    'last-sync'?: string,
}

export const UserState$ = observable({
    user: {
        id: '',
        name: '',
        phone: '',
        password: '',
        role: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted: undefined,
        'last-sync': undefined,
    } as User,
    setUser: (user: any) => {
        UserState$.assign({ user });
    },
    getUser: () : User => {
        return UserState$.get().user;
    },
    clearUser: () => {
        UserState$.assign({ 
            user: {
                id: '',
                name: '',
                phone: '',
                password: '',
                role: undefined,
                created_at: undefined,
                updated_at: undefined,
                deleted: undefined,
                'last-sync': undefined,
            } 
        });
    },
    updateUser: (user: any) => {
        UserState$.assign({ user });
    },
}) 