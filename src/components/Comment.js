const Comment = ({comment}) => {
   return (
     <li style={{marginRight: 20}}>
         <p style={{ margin: 0 }}>{comment.content}</p>
         <small style={{color: 'grey'}}>{comment.user.name}</small>
     </li>
   );
}

export default Comment;