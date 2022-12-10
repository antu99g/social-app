import {useState} from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
import toast from 'react-toast-notification';


const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loggingIn, setLoggingIn] = useState(false);
   const auth = useAuth();

   const handleSubmit = async (e) => {
     e.preventDefault();

     setLoggingIn(true);

     const response = await auth.login(email, password);
	  if(response.success){
   		{toast.success('Logged in!!');}
	  }

     setLoggingIn(false);
   };

	
   if (auth.user) {
		return <Navigate to="/" />;
   }

   return (
     <form className={styles.loginForm} onSubmit={handleSubmit}>
			<span className={styles.loginSignupHeader}>Log In</span>

			<div className={styles.field}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				required
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			</div>

			<div className={styles.field}>
			<input
				type="password"
				placeholder="Password"
				value={password}
				required
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			</div>

			<div className={styles.field} disabled={loggingIn}>
				<button>{loggingIn ? 'Logging...' : 'Log In'}</button>
			</div>
     </form>
   );
}

export default Login;