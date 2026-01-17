import { createContext } from 'react';

export type ContextValue = {
	user: string | null;
	signIn: (newUser: string, callback: () => void) => void;
	signOut: (callback: () => void) => void;
};

type Context = ContextValue | null;

export const AuthContext = createContext<Context>(null);
