import { useEffect, useState } from 'react';
import styles from '../styles/navbar.module.css';
import {Link} from 'react-router-dom';
import {useAuth} from '../hooks';
import { searchUsers } from '../api';

const Navbar = () => {
	const [results, setResults] = useState([]);
	const [searchText, setSearchText] = useState('');
	const auth = useAuth();

	useEffect(() => {
		const fetchUser = async() => {
			const response = await searchUsers(searchText);

			if(response.success){
				setResults(response.data.users);
			}
		}
		
		if(searchText.length > 2){
			fetchUser();
		}else{
				setResults([]);
		}
	}, [searchText]);

	return (
    <div className={styles.nav}>
      <Link to="/" className={styles.leftDiv}>
        <img
          src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          alt=""
        />
      </Link>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/4208/4208531.png"
          alt=""
        />

        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users..."
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings" className={styles.userLink}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6696/6696675.png"
                alt=""
                className={styles.userDp}
              />
              <span className={styles.userName}>{auth.user.name}</span>
            </Link>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log Out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;