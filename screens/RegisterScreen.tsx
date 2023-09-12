import React, {FC, useState} from 'react';
import {Image, Pressable, SafeAreaView, Text, View,} from 'react-native';

import InputField from '../components/InputField';

import CustomButton from '../components/CustomButton';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useAppDispatch} from "../app/store";
import {register} from "../features/system/system-slice";
import {isAxiosError} from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: FC<Props> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const [userName, setUserName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const handleRegister = async () => {
		let isInputValid = true;
		if (password !== confirmPassword) {
			setPasswordError('Пароли не совпадают');
			setConfirmPasswordError('Пароли не совпадают');
			isInputValid = false;
		}

		if (!password.length) {
			setPasswordError('Слишком короткий пароль');
			isInputValid = false;
		}

		if (!confirmPassword.length) {
			setConfirmPasswordError('Слишком короткий пароль');
			isInputValid = false;
		}

		if (!isInputValid) return;

		try {
			const data = {
				username: userName,
				email: email,
				first_name: firstName,
				last_name: lastName,
				password: password
			};

			await dispatch(register.getThunk({...data}));

			navigation.navigate('Login');
		} catch (e) {
			console.log(e)
			if (isAxiosError(e) && e.response?.status === 400) {
				const responseError = await e.response;
			}
		}
	};


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
						value={userName}
						onChangeText={setUserName}
					/>

					<InputField
						label={'First Name'}
						value={firstName}
						onChangeText={setFirstName}
					/>

					<InputField
						label={'Last Name'}
						value={lastName}
						onChangeText={setLastName}
					/>

					<InputField
						label={'Email'}
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>

					<InputField
						label={'Password'}
						inputType="password"
						value={password}
						onChangeText={setPassword}
					/>
					<Text style={{color: 'red', marginBottom: 5}}>{passwordError}</Text>

					<InputField
						label={'Confirm Password'}
						inputType="password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<Text style={{color: 'red', marginBottom: 5}}>{confirmPasswordError}</Text>

					<CustomButton label={'Register'} onPress={handleRegister}/>

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