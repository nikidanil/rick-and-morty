import { useState } from 'react';
import style from './Login.module.css';
import { useAuth } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login = () => {
	const [login, setLogin] = useState('');
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: '/' } };

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		auth?.signIn(login, () => {
			navigate(from, {
				replace: true,
			});
		});
	};

	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit}>
				<input type='text' name='userName' value={login} onChange={handleChange} placeholder='Введите логин' />
				<button type='submit'>Войти</button>
			</form>
		</div>
	);
};
