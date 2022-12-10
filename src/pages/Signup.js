import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import {useAuth} from '../hooks';
import toast from 'react-toast-notification';

const Signup = () => {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  let navigate = useNavigate();



	const handleSubmit = async (e) => {
		e.preventDefault();
		setSigningUp(true);

		let error = false;
		if(!name || !email || !password || !confirmPassword){
			error = true;
		}
		if(password !== confirmPassword){
			error = true;
		}
		if(error){
      {toast.error('Signup failed')}
			setSigningUp(false);
		}

		const response = await auth.signup(name, email, password, confirmPassword);
		
		if(response.success){
			setSigningUp(false);
			console.log('response', response);
      	{toast.success('User created!')}
     		navigate('/login');
			// <Navigate to="/login" />;
		}
    
		setSigningUp(false);    
	}


  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>

      <div className={styles.field}>
        <input
          type="string"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

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

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>

      <div className={styles.field} disabled={signingUp}>
        <button>{signingUp ? 'Signing Up...' : 'Sign Up'}</button>
      </div>
    </form>
  );
}

export default Signup;