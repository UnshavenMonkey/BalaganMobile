import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../navigation/auth-stack';
import {createAppStore} from './store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import BottomNavigation from "../common/bottom-navigation";

const store = createAppStore();

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider>
				<NavigationContainer>
					<AuthStack/>
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	);
};

export default App;
