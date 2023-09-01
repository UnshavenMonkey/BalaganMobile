import React, {FC} from 'react';
import {Image, Pressable, SafeAreaView, Text, View,} from 'react-native';

import InputField from '../components/InputField';

import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: FC<Props> = ({navigation}) => {



	return (
		<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
			<View
				style={{flex: 1, paddingHorizontal: 25, paddingTop: 15}}>
				<View style={{alignItems: 'center'}}>
					<Image
						style={{width: 100, height: 100}}
						source={require('../assets/registration.jpg')}
					/>
				</View>

				<Text
					style={{
						fontFamily: 'Roboto-Medium',
						fontSize: 28,
						fontWeight: '500',
						color: '#333',
						marginBottom: 30,
						textAlign: 'center'
					}}>
					Register
				</Text>

				<View style={{flex: 3}}>
					<InputField
						label={'User Name'}
					/>

					<InputField
						label={'First Name'}
					/>

					<InputField
						label={'Last Name'}
					/>

					<InputField
						label={'Email'}
						keyboardType="email-address"
					/>

					<InputField
						label={'Password'}
						inputType="password"
					/>

					<InputField
						label={'Confirm Password'}
						inputType="password"
					/>

					<CustomButton label={'Register'} onPress={() => {
					}}/>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginBottom: 30,
						}}>
						<Text>Already registered?</Text>
						<Pressable onPress={() => navigation.goBack()}>
							<Text style={{color: '#20315f', fontWeight: '700'}}> Login</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RegisterScreen;