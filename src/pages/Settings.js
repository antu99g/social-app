import {useState} from 'react';
import styles from '../styles/settings.module.css';
import {useAuth} from '../hooks';


const Settings = () => {
   const auth = useAuth();

	const[editMode, setEditMode] = useState(false);
	const[name, setName] = useState(auth.user ? auth.user.name : '');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [savingForm, setSavingForm] = useState(false);


	const clearForm = () => {
    // setName(auth.user.name);
		setPassword('');
		setConfirmPassword('');
	}

	const updateProfile = async () => {
		setSavingForm(true);
		
		let error = false;
		if(!name || !password || !confirmPassword){
			error = true;
		}
		if(password !== confirmPassword){
			error = true;
		}

		if(error){
			clearForm();
			return setSavingForm(false);
		}

		const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

		if(response.success){
			setEditMode(false);
			setSavingForm(false);
			setSavingForm(false);
			clearForm();
			return;			
		}else{
			return;			
		}

	};


   return (
     <div className={styles.settings}>
       <div className={styles.imgContainer}>
         <img
           src="https://cdn-icons-png.flaticon.com/512/3953/3953226.png"
           alt=""
         />
       </div>

       <div className={styles.field}>
         <div className={styles.fieldName}>Email</div>
         <div className={styles.fieldValue}>{auth.user?.email}</div>
       </div>

       <div className={styles.field}>
         <div className={styles.fieldName}>Name</div>
         {editMode ? (
           <input
             type="text"
             value={name}
             onChange={(e) => {
               setName(e.target.value);
             }}
           />
         ) : (
           <div className={styles.fieldValue}>{auth.user?.name}</div>
         )}
       </div>

       {editMode && (
         <>
           <div className={styles.field}>
             <div className={styles.fieldName}>Password</div>
             <input
               type="password"
               onChange={(e) => {
                 setPassword(e.target.value);
               }}
             />
           </div>

           <div className={styles.field}>
             <div className={styles.fieldName}>Confirm Password</div>
             <input
               type="password"
               onChange={(e) => {
                 setConfirmPassword(e.target.value);
               }}
             />
           </div>
         </>
       )}

       <div className={styles.btnGrp}>
         {editMode ? (
           <>
             <button
               className={`button ${styles.saveBtn}`}
               onClick={updateProfile}
               disabled={savingForm}
             >
               {savingForm ? 'Saving...' : 'Save'}
             </button>

             <button
               className={`button ${styles.editBtn}`}
               onClick={() => setEditMode(false)}
             >
               Go Back
             </button>
           </>
         ) : (
           <button
             className={`button ${styles.editBtn}`}
             onClick={() => setEditMode(true)}
           >
             Edit Profile
           </button>
         )}
       </div>
     </div>
   );
}

export default Settings;