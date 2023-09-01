import {createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import EncryptedStorage from "react-native-encrypted-storage";
import {AppThunk, RootState} from "../../app/store";
import {createAppAsyncThunk, makeApiRequest} from "../../common-utils";
import axios from 'axios';
import {BACKEND_API_URL} from "../../common-consts";

type SystemState = {
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
				state.userId = payload.id;
				state.accessToken = payload.accessToken;
				state.refreshToken = payload.refreshToken;
			})
			.addCase(setSessionTokensAction, (state, { payload }) => {
				state.accessToken = payload.accessToken;
				state.refreshToken = payload.refreshToken;
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
	(accessToken, refreshToken) =>
		!!accessToken && !!refreshToken ? { accessToken, refreshToken } : null
);

export const selectIsLoggedIn = createSelector(
	[selectSessionUserId, selectAccessToken, selectRefreshToken],
	(sessionUserId, accessToken, refreshToken) =>
		!!sessionUserId && !!accessToken && !!refreshToken
);

export type SessionTokens = {
	accessToken: string;
	refreshToken: string;
};

const setSessionTokensAction = createAction<SessionTokens>(
	'system/setSessionTokens'
);

export function setSessionTokens(tokens: SessionTokens): AppThunk<void> {
	return (dispatch) => {
		dispatch(setSessionTokensAction(tokens));
		async () => {
			try {
				await EncryptedStorage.setItem("user_session", JSON.stringify({
					bmAccessToken: tokens.accessToken,
					bmRefreshToken: tokens.refreshToken,
				}))
			}
			catch (error) {
				console.log(error)
			}
		}
	};
}

type LoginResponse = SessionTokens & UserType;

export const login = createAppAsyncThunk<
	{ username: string; password: string },
	LoginResponse
>('system/login', async ({ username, password }) => {
	const { data } = await axios<LoginResponse>({
		url: `${BACKEND_API_URL}/auth/login`,
		method: 'post',
		data: { username, password },
	});
	const { id, accessToken, refreshToken } = data;
	async () => {
		try {
			await EncryptedStorage.setItem("user_session", JSON.stringify({
				bmAccessToken: accessToken,
				bmRefreshToken: refreshToken,
				userId: id,
			}))
		}
		catch (error) {
			console.log(error)
		}
	}
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
	{ username: string, first_name: string, last_name: string, email: string; password: string },
	RegisterResponse
>('system/register', async ({ first_name, last_name, email,  username, password }, {dispatch, state}) =>
	makeApiRequest<RegisterResponse>({
		url: `${BACKEND_API_URL}/auth/register`,
		method: 'post',
		data: { first_name, last_name, email,  username, password },
	}, { dispatch, sessionTokens: selectSessionTokens(state) })
);




