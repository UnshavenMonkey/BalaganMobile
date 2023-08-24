import React, {createContext, ReactNode, useState} from 'react';
import * as Keychain from 'react-native-keychain';



type AuthProviderProps ={
	children: ReactNode;
}

type AuthStateProps = {
	accessToken: string | null;
	refreshToken: string | null;
	authenticated: Boolean | null;
}

type V = {
	authState: AuthStateProps;
	getAccessToken: () => string | null;
	setAuthState:  React.Dispatch<React.SetStateAction<AuthStateProps>>
	logout: () => Promise<void>;
}

const AuthContext = createContext<V | null>(null);
const {Provider} = AuthContext;
const AuthProvider = ({children}: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthStateProps>({
		accessToken: null,
		refreshToken: null,
		authenticated: null,
	});

	const logout = async () => {
		await Keychain.resetGenericPassword();
		setAuthState({
			accessToken: null,
			refreshToken: null,
			authenticated: false,
		});
	};

	const getAccessToken = () => {
		return authState.accessToken;
	};

	return (
		<Provider
			value={{
		    authState,
			  getAccessToken,
			  setAuthState,
			  logout,
	}}>
	{children}
	</Provider>
);
};

export {AuthContext, AuthProvider};