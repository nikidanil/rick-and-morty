import { useState } from 'react';
import { AuthContext, type ContextValue } from './authContext';

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<string | null>(null);

	const signIn = (newUser: string, callback: () => void) => {
		setUser(newUser);
		callback();
	};

	const signOut = (callback: () => void) => {
		setUser(null);
		callback();
	};

	const value: ContextValue = {
		user,
		signIn,
		signOut,
	};

	return <AuthContext value={value}>{children}</AuthContext>;
};
