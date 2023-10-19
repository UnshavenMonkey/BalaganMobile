import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BottomNavigation from "./common/bottom-navigation";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Onboarding: undefined;
	BottomNavigation: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;