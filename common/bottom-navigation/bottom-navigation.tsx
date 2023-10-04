import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../../screens/HomeScreen";
import {Text, View} from "react-native";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
	return (
		<View>
			<Text>Settings</Text>
		</View>
	);
}

const BottomNavigation = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

export default BottomNavigation;