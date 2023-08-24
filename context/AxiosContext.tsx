import {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

// @ts-ignore
const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
	const authContext = useContext(AuthContext);

	const authAxios = axios.create({
		baseURL: 'http://localhost:3000/api',
	});

	const publicAxios = axios.create({
		baseURL: 'http://localhost:3000/api',
	});

	authAxios.interceptors.request.use(
		config => {
			if (!config.headers.Authorization) {
				// @ts-ignore
				config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
			}

			return config;
		},
		error => {
			return Promise.reject(error);
		},
	);

	const refreshAuthLogic = failedRequest => {
		// @ts-ignore
		const data = {
			refreshToken: authContext.authState.refreshToken,
		};

		const options = {
			method: 'POST',
			data,
			url: 'http://localhost:3000/api/refreshToken',
		};

		return axios(options)
			.then(async tokenRefreshResponse => {
				failedRequest.response.config.headers.Authorization =
					'Bearer ' + tokenRefreshResponse.data.accessToken;

				// @ts-ignore
				// @ts-ignore
				authContext.setAuthState({
					...authContext.authState,
					accessToken: tokenRefreshResponse.data.accessToken,
				});

				// @ts-ignore
				await Keychain.setGenericPassword(
					'token',
					JSON.stringify({
						accessToken: tokenRefreshResponse.data.accessToken,
						refreshToken: authContext.authState.refreshToken,
					}),
				);

				return Promise.resolve();
			})
			.catch(e => {
				// @ts-ignore
				authContext.setAuthState({
					accessToken: null,
					refreshToken: null,
				});
			});
	};

	createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

	return (
		<Provider
			value = {{
		    authAxios,
			  publicAxios,
	  }}>
	{
		children
	}
	</Provider>
)


};

export {AxiosContext, AxiosProvider};