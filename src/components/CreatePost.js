import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { usePosts } from '../hooks';
import toast from 'react-toast-notification';

const CreatePost = () => {
   const [post, setPost] = useState('');
   const [addingPost, setAddingPost] = useState(false);
	const posts = usePosts();

   const handleAddPostClick = async () => {
      setAddingPost(true);

      const response = await addPost(post);

      if(response.success){
			posts.addPostToState(response.data.post);
         setPost('');
         {toast.success('New Post created!')}
      }else{
         {toast.error(response.message)}  
      }

      setAddingPost(false);
   }

   return (
     <div className={styles.createPost}>
       <textarea
         value={post}
			placeholder='Write your post...'
         onChange={(e) => {
           setPost(e.target.value);
         }}
       ></textarea>

       <div>
         <button
           className={styles.addPostBtn}
           onClick={handleAddPostClick}
           disabled={addingPost}
         >
           {addingPost ? 'Adding...' : 'Add Post'}
         </button>
       </div>
     </div>
   );
}

export default CreatePost;