import {createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import {AppThunk, RootState} from "../../app/store";
import {createAppAsyncThunk, makeApiRequest} from "../../common-utils";
import axios from 'axios';
import {BACKEND_API_URL} from "../../common-consts";

export type SystemState = {
	userId: string | null;
	accessToken: string | null;
	refreshToken: string | null;
};

type UserType = {
	email: string;
	userName: string;
	firstName: string | null;
	lastName: string | null;
	id: string;
};

export const SYSTEM_INITIAL_STATE: SystemState = {
	userId: null,
	accessToken: null,
	refreshToken: null,
};

const systemSlice = createSlice({
	name: 'system',
	initialState: SYSTEM_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, { payload }) => {
				state.userId = payload.user.id;
				state.accessToken = payload.access;
				state.refreshToken = payload.refresh;
			})
			.addCase(logout.fulfilled, () => SYSTEM_INITIAL_STATE)
			.addCase(setSessionTokensAction, (state, { payload }) => {
				state.accessToken = payload.access;
				state.refreshToken = payload.refresh;
			})
			.addCase(setUserIdAction, (state, { payload }) => {
				state.userId = payload;
			})
	},
});

export const systemReducer = systemSlice.reducer;

const selectSystemState = (state: RootState) => state.system;

export const selectSessionUserId = createSelector(
	[selectSystemState],
	({ userId }) => userId
);

export const selectAccessToken = createSelector(
	[selectSystemState],
	({ accessToken }) => accessToken
);

export const selectRefreshToken = createSelector(
	[selectSystemState],
	({ refreshToken }) => refreshToken
);

export const selectSessionTokens = createSelector(
	[selectAccessToken, selectRefreshToken],
	(access, refresh) =>
		!!access && !!refresh ? { access, refresh } : null
);

export const selectIsLoggedIn = createSelector(
	[selectSessionUserId, selectAccessToken, selectRefreshToken],
	(sessionUserId, access, refresh) =>
		!!sessionUserId && !!access && !!refresh
);

export type SessionTokens = {
	access: string;
	refresh: string;
};

const setSessionTokensAction = createAction<SessionTokens>(
	'system/setSessionTokens'
);

const setUserIdAction = createAction<string>(
	'system/setUserId'
);

export function setUserId(id: string): AppThunk<void> {
	return dispatch => dispatch(setUserIdAction(id))
}

export function setSessionTokens(tokens: SessionTokens): AppThunk<void> {
	return (dispatch) => {
		dispatch(setSessionTokensAction(tokens));
		const setStorage = async () => {
			try {
				await EncryptedStorage.setItem("user_session", JSON.stringify({
					bmAccessToken: tokens.access,
					bmRefreshToken: tokens.refresh,
				}))
			}
			catch (error) {
				console.log(error)
			}
		}
		setStorage()
	};
}

type LoginResponse = {
  access: string;
  refresh: string;
  user: {
    email: string;
    userName: string;
    firstName: string | null;
    lastName: string | null;
    id: string;
  };
};

export const login = createAppAsyncThunk<
	{ email: string; password: string },
	LoginResponse
>('system/login', async ({ email, password }) => {
	const { data } = await axios<LoginResponse>({
		url: `${BACKEND_API_URL}/auth/login/`,
		method: 'post',
		data: { email, password },
	});
	const { user, access, refresh } = data;

	const setStorage = async () => {
		try {
			await EncryptedStorage.setItem("user_session", JSON.stringify({
				bmAccessToken: access,
				bmRefreshToken: refresh,
				userId: user.id,
			}))
		}
		catch (error) {
			console.log(error)
		}
	}
	setStorage()
	return data;
});

type RegisterResponse = {
	id: string;
	created: string;
	updated: string;
	posts_count: string;
	last_login: string;
	public_id: string;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	avatar: string;
	groups: number[];
	user_permissions: number[]
}
export const register = createAppAsyncThunk<
	{ password: string, username: string, first_name: string, last_name: string, email: string  },
	RegisterResponse
>('system/register', async ({ password, first_name, last_name, email,  username }, {dispatch, state}) =>
	makeApiRequest<RegisterResponse>({
		url: `${BACKEND_API_URL}/auth/register/`,
		method: 'post',
		data: { password, username, first_name, last_name, email  },
	}, { dispatch, sessionTokens: selectSessionTokens(state) })
);

export const logout = createAppAsyncThunk<{}, void>(
	'system/logout',
	async (_, { dispatch, state }) => {
		await makeApiRequest<void>(
			{ url: `${BACKEND_API_URL}/auth/logout`, method: 'post' },
			{ dispatch, sessionTokens: selectSessionTokens(state) }
		);
		async function clearStorage() {
			try {
				await EncryptedStorage.clear();
			} catch (error) {
			}
		}
		clearStorage()
	}
);





