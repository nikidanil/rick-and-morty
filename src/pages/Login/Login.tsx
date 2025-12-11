import { useState } from 'react';
import style from './Login.module.css';

export const Login = () => {
	const [login, setLogin] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit}>
				<input type='text' value={login} onChange={handleChange} placeholder='Введите логин' />
				<button type='submit'>Войти</button>
			</form>
		</div>
	);
};
