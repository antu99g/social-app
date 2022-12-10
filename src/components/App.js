import { Routes, Route, Navigate } from 'react-router-dom';
// import {getPosts} from '../api';
import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import {Navbar, Loader} from './';
import {useAuth} from '../hooks';
import { useEffect } from 'react';


const Page404 = () => {
  return <h1 style={{textAlign: 'center'}}>404</h1>
}


const PrivateRoute = ({children}) => {
  const auth = useAuth();

  if(auth.user){
	  return children;
  }

  return <Navigate to="/login" />;
	// return (
	// 	<Route 
	// 		{...rest}
	// 		element={() => 
	// 			auth.user
	// 			? children
	// 			: <Navigate to='/login' />
	// 		}
	// 	/>
	// );
}


const SecureLogin = ({children}) => {
  const auth = useAuth();

  if(auth.user){
    return <Navigate to='/' />
  }

  return {children};
}



function App() {
	const auth = useAuth();

  useEffect(() => {
    console.log('auth', auth);
  }, []);  // auth removed from parameter [auth]
	
  if (auth.loading) {
    return <Loader />;
  }


	return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/login" exact element={<Login />} />

        <Route path="/signup" exact element={<SecureLogin><Signup /></SecureLogin>} />

        <Route path="/settings" exact element={<PrivateRoute><Settings /></PrivateRoute>} />
        
        <Route path="/user/:userid" exact element={<PrivateRoute><UserProfile /></PrivateRoute>} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
