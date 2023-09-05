import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {systemReducer} from "../features/system/system-slice";


export const createAppReducer = () => combineReducers({
	system: systemReducer,
});

const reducer = createAppReducer();
export type RootState = ReturnType<typeof reducer>;

export const createAppStore = (initialState?: Partial<RootState>) =>
	configureStore({
		reducer,
		// preloadedState: initialState,
	});

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	AnyAction
>;



