import { useState } from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/home.module.css';
import {Comment} from './index';
import { usePosts } from '../hooks';
import { createComment, toggleLike } from '../api';
import toast from 'react-toast-notification';

const Post = ({post}) => {
	const [comment, setComment] = useState('');
	const [loadingComment, setLoadingComment] = useState(false);
	const [like, setLike] = useState(false);
	let posts = usePosts();

	const handleKeyPress = async(e) => {
		if(e.key === 'Enter'){
			setLoadingComment(true);

			let response = await createComment(comment, post._id);
			
			if(response.success){
				posts.addComment(response.data.comment, post._id);
				setComment('');
				{toast.success('New Comment posted!!')}					
			}else{
				setComment('');
				{toast.error(response.message)}					
			}
		
			setLoadingComment(false);
		}
	}

	const handlePostLikeClick = async () => {
		const response = await toggleLike(post._id, 'Post');

		if(response.success){
			setLike(!like);
			
			if(response.data.deleted){
				{toast.info('Like removed')}					
			}else{
				{toast.success('Liked!!')}
			}
		}else{
			{toast.error(response.message)}					
		}
	}

   return (
     <div className={styles.postWrapper}>
       <p className={styles.postContent}>{post.content}</p>
       <Link
         to={`/user/${post.user._id}`}
         state={{ user: post.user }}
         className={styles.postAuthor}
       >
         {post.user.name}
       </Link>

       <div className={styles.postLike}>
         <button className={styles.likeBtn} onClick={handlePostLikeClick}>
           <img
             style={like ? { width: 20, padding: 2.5 } : { width: 25 }}
             src={
               like
                 ? 'https://cdn-icons-png.flaticon.com/512/8181/8181331.png'
                 : 'https://cdn-icons-png.flaticon.com/512/7422/7422396.png'
             }
             alt=""
           />
           <span style={{margin: 0}}>{post.likes.length}</span>
         </button>
       </div>

       <input
         type="text"
         value={comment}
         onKeyUp={handleKeyPress}
         disabled={loadingComment}
         onChange={(e) => setComment(e.target.value)}
         placeholder="Write a comment..."
       />

       <ul className={styles.commentList}>
         {post.comments.map((comment) => {
           return <Comment comment={comment} key={`comment-${comment._id}`} />;
         })}
       </ul>
     </div>
   );
}

export default Post;