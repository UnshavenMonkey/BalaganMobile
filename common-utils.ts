import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction, PayloadActionCreator } from "@reduxjs/toolkit";
import axios, {isAxiosError, RawAxiosRequestConfig } from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import {AppDispatch, AppThunk, RootState} from "./app/store";
import {SessionTokens, setSessionTokens} from "./features/system/system-slice";
import {BACKEND_API_URL} from "./common-consts";

export const getStateFromAsyncStorage = () => {
	const s = async () => {
		try {
			const session = await EncryptedStorage.getItem("user_session");
			if (!!session) {
				return {
					system: {
						userId: JSON.parse(session).userId,
						accessToken: JSON.parse(session).accessToken,
						refreshToken: JSON.parse(session).refreshToken,
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
	return s
};

export function createAsyncActions<T = void>(actionPrefix: string) {
	return {
		pending: createAction<void>(`${actionPrefix}/pending`),
		fulfilled: createAction<T>(`${actionPrefix}/fulfilled`),
		rejected: createAction<Error>(`${actionPrefix}/rejected`),
	};
}

type AppThunkApi = {
	dispatch: AppDispatch;
	state: RootState;
};

type CreateAppAsyncThunkReturnType<ParamsType, ReturnType> = {
	pending: ActionCreatorWithoutPayload;
	fulfilled: PayloadActionCreator<ReturnType>;
	rejected: ActionCreatorWithPayload<Error>;
	getThunk: (
		params: ParamsType,
		options?: { dispatchActions: boolean }
	) => AppThunk<Promise<ReturnType>>;
};

export function createAppAsyncThunk<ParamsType extends object, ReturnType>(
	prefix: string,
	payloadCreator: (
		params: ParamsType,
		thunkApi: AppThunkApi
	) => Promise<ReturnType>
): CreateAppAsyncThunkReturnType<ParamsType, ReturnType> {
	const { pending, fulfilled, rejected } =
		createAsyncActions<ReturnType>(prefix);

	function getThunk(
		params: ParamsType,
		options: { dispatchActions: boolean } = {
			dispatchActions: true,
		}
	): AppThunk<Promise<ReturnType>> {
		const { dispatchActions } = options;
		return async (dispatch, getState) => {
			try {
				if (dispatchActions) dispatch(pending);
				const result = await payloadCreator(params, {
					dispatch,
					state: getState(),
				});
				if (dispatchActions) dispatch(fulfilled(result));
				return result;
			} catch (e) {
				const eSerializable = JSON.parse(JSON.stringify(e));
				if (dispatchActions) dispatch(rejected(eSerializable));
				throw e;
			}
		};
	}

	return { pending, fulfilled, rejected, getThunk };
}

export async function makeApiRequest<ReturnType>(
	config: RawAxiosRequestConfig,
	{
		dispatch,
		sessionTokens,
	}: { dispatch: AppDispatch; sessionTokens: SessionTokens | null }
): Promise<ReturnType> {
	const requestConfig = {
		...config,
	};
	if (sessionTokens) {
		requestConfig.headers = {
			Authorization: `Bearer ${sessionTokens.accessToken}`,
		};
	}

	try {
		const { data } = await axios<ReturnType>(requestConfig);
		return data;
	} catch (e) {
		if (sessionTokens && isAxiosError(e) && e.response?.status === 401) {
			const { data: newTokens } = await axios<SessionTokens>({
				...requestConfig,
				url: `${BACKEND_API_URL}/auth/refresh`,
				method: 'post',
				data: { refreshToken: sessionTokens.refreshToken },
				//transformResponse: (data) => JsonBigInt.parse(data),
			});
			if (newTokens) {
				dispatch(setSessionTokens(newTokens));
				const retryResponse = await axios<ReturnType>({
					...requestConfig,
					headers: { Authorization: `Bearer ${newTokens.accessToken}` },
				});
				return retryResponse.data;
			}
		}
		throw e;
	}
}


