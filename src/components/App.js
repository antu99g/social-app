import {useEffect} from 'react';
import {getPosts} from '../api';

function App() {
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await getPosts();
			console.log('response', response);
		}

		fetchPosts();
	});

	return (
	<div className="App">
		It's working!!
	</div>
	);
}

export default App;
