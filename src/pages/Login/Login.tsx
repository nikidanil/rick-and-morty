import { useState } from 'react';
import style from './Login.module.css';
import { useAuth } from '../../hooks';
import { replace, useLocation, useNavigate } from 'react-router-dom';

export const Login = () => {
	const [login, setLogin] = useState('');
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: '/' } };

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
