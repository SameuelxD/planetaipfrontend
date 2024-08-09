import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../firebase';
import { ref, onValue, off } from 'firebase/database'; // Importa `off` correctamente
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import './HomePage.css';

interface Comment {
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
}

interface Post {
  userId: string;
  userName: string;
  userPhoto: string;
  postImage: string;
  postText: string;
  tags: string[];
  likes: number;
  comments: Record<string, Comment>; 
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsRef = ref(database, 'posts/');

    const handleData = (snapshot: any) => {
      const data = snapshot.val();
      const postsArray: Post[] = [];

      for (const key in data) {
        if (data[key]) {
          postsArray.push({
            userId: data[key].userId,
            userName: data[key].userName,
            userPhoto: data[key].userPhoto,
            postImage: data[key].postImage,
            postText: data[key].postText,
            tags: data[key].tags || [], 
            likes: data[key].likes || 0, 
            comments: data[key].comments || {} 
          });
        }
      }
      setPosts(postsArray);
    };

    const unsubscribe = onValue(postsRef, handleData);

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Se cerrará la sesión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        dispatch(clearUser());
        Swal.fire('Desconectado', 'Has cerrado sesión con éxito.', 'success');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire('Error', 'No se pudo cerrar sesión. Intenta nuevamente.', 'error');
      }
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Bienvenido a la página de inicio</h1>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <main className="posts-container">
        {posts.map((post, index) => (
          <div key={index} className="post-container">
            <div className="post-header">
              <img src={post.userPhoto} alt={post.userName} className="user-photo" />
              <span className="user-name">{post.userName}</span>
            </div>
            <img src={post.postImage} alt="Post" className="post-image" />
            <p className="post-text">{post.postText}</p>
            <div className="post-footer">
              <span className="tags">{post.tags.join(', ')}</span>
              <span className="likes">Likes: {post.likes}</span>
              <span className="comments">Comments: {Object.keys(post.comments).length}</span>
            </div>
            <div className="comments-section">
              {Object.keys(post.comments).map(commentId => {
                const comment = post.comments[commentId];
                return (
                  <div key={commentId} className="comment">
                    <img src={comment.userPhoto} alt={comment.userName} className="comment-user-photo" />
                    <div className="comment-info">
                      <h4>{comment.userName}</h4>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
