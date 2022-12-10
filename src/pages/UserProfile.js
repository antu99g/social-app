import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import {useAuth} from '../hooks';
import toast from 'react-toast-notification';


const UserProfile = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [reqInProgress, setReqInProgress] = useState(false);
   const {userid} = useParams();
	const auth = useAuth();
	let navigate = useNavigate();

	// console.log('userId', userid);
	
	useEffect(() => {
		// console.log('useEffect running from user profile');
		const getUser = async () => {
			const response = await fetchUserProfile(userid);

			if (response.success) {
				setUser(response.data.user);
			} else {
				return navigate('/');
			}

			setLoading(false);
		};

   	getUser();
   }, [userid, navigate, toast]);	// the parameters aren't correct ('toast' doesn't have a value here)

	if(loading){
		return <Loader />;
	}


	const checkIfFriend = () => {
		// console.log('checkIfFriend running');
		const friends = auth.user.friends;

		const friendIds = friends.map(friend => friend.to_user._id);
		const index = friendIds.indexOf(userid);

		if(index !== -1){
			return true;
		}
		
		return false;
	}

	const showAddFriendBtn = checkIfFriend(); 

	const handleRemoveFriendClick = async () => {
		setReqInProgress(true);

		const response = await removeFriend(userid);

		if (response.success) {
			{toast.info('Friend Removed!');}
 
			const friendship = auth.user.friends.filter(
        		(friend) => friend.to_user === userid
      	);
			auth.updateUserFriends(false, friendship[0]);
		}

		setReqInProgress(false);
	};



	const handleAddFriendClick = async () => {
		setReqInProgress(true);

		const response = await addFriend(userid);

		if(response.success){
   		{toast.success('Friend Added!');}

			const {friendship} = response.data;
			auth.updateUserFriends(true, friendship);			
		}

		setReqInProgress(false);
	}


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
         <div className={styles.fieldValue}>{user.email}</div>
       </div>

       <div className={styles.field}>
         <div className={styles.fieldName}>Name</div>
         <div className={styles.fieldValue}>{user.name}</div>
       </div>

       <div className={styles.btnGrp}>
         {showAddFriendBtn ? (
           <button
             className={`button ${styles.editBtn}`}
             onClick={() => {handleRemoveFriendClick()}}
           >
             {reqInProgress ? 'Removing...' : 'Remove Friend'}
           </button>
         ) : (
           <button
             className={`button ${styles.saveBtn}`}
             onClick={() => {handleAddFriendClick()}}
           >
             {reqInProgress ? 'Adding...' : 'Add Friend'}
           </button>
         )}
       </div>
     </div>
   );
}

export default UserProfile;