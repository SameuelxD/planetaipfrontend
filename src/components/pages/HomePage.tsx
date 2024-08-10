import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons';

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

interface User {
  userId: string;
  userName: string;
  userPhoto: string;
  email: string;
  bio: string;
}

Modal.setAppElement('#root');

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};

// Main component
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const postsRef = ref(database, 'posts/');
    const usersRef = ref(database, 'users/');
    
    const handlePostsData = (snapshot: any) => {
      const data = snapshot.val() || {};
      const postsArray: Post[] = Object.keys(data).map(key => ({
        userId: data[key].userId,
        userName: data[key].userName,
        userPhoto: data[key].userPhoto,
        postImage: data[key].postImage,
        postText: data[key].postText,
        tags: data[key].tags || [],
        likes: data[key].likes || 0,
        comments: data[key].comments || {}
      }));

      const tags = new Set<string>();
      postsArray.forEach(post => post.tags.forEach(tag => tags.add(tag)));
      setAvailableTags(Array.from(tags));
      setPosts(postsArray);
    };

    const handleUsersData = (snapshot: any) => {
      const data = snapshot.val() || {};
      setUsers(data);
    };

    const postsUnsubscribe = onValue(postsRef, handlePostsData);
    const usersUnsubscribe = onValue(usersRef, handleUsersData);

    return () => {
      postsUnsubscribe();
      usersUnsubscribe();
    };
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = posts.filter(post => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const postComments = Object.values(post.comments);
    
    return (
      (selectedTags.length === 0 || post.tags.some(tag => selectedTags.includes(tag))) &&
      (
        post.postText.toLowerCase().includes(lowercasedTerm) ||
        post.userName.toLowerCase().includes(lowercasedTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)) ||
        postComments.some(comment => 
          comment.text.toLowerCase().includes(lowercasedTerm) ||
          comment.userName.toLowerCase().includes(lowercasedTerm)
        )
      )
    );
  });

  const toggleMenu = () => setMenuVisible(prev => !prev);
  const openFilterModal = () => setFilterModalIsOpen(true);
  const closeFilterModal = () => setFilterModalIsOpen(false);
  const handleViewProfile = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="home-container">
      <header className="header">
        <FontAwesomeIcon icon={faHome} className="home-icon" />
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <FontAwesomeIcon icon={faFilter} className="filter-icon" onClick={openFilterModal} />
          </div>
        </div>
        <div className="profile-section">
          <div className="profile-photo" onClick={toggleMenu}>
            <img src={auth.currentUser?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99qCZ8-l1k3yR0IYmGyxdK53rphlOPpTbtQ&s'} alt="Profile" />
          </div>
          {menuVisible && (
            <div className="profile-menu">
              <button className="profile-menu-item" onClick={handleViewProfile}>Ver perfil</button>
              <button className="profile-menu-item" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </header>
      <main className="posts-container">
        {filteredPosts.map((post, index) => (
          <div key={index} className="post-container">
            <div className="post-header">
              <img src={post.userPhoto} alt={post.userName} className="user-photo" />
              <span
                className="user-name"
                dangerouslySetInnerHTML={{ __html: highlightText(post.userName, searchTerm) }}
              />
            </div>
            {post.postImage && <img src={post.postImage} alt="Post" className="post-image" />}
            <p
              className="post-text"
              dangerouslySetInnerHTML={{ __html: highlightText(post.postText, searchTerm) }}
            />
            <div className="post-footer">
              <span className="tags">
                {post.tags.map(tag => highlightText(tag, searchTerm)).join(', ')}
              </span>
              <span className="likes">Likes: {post.likes}</span>
              <span className="comments">Comments: {Object.keys(post.comments).length}</span>
            </div>
            {Object.keys(post.comments).length > 0 && (
              <div className="comments-section">
                {Object.keys(post.comments).map(commentId => {
                  const comment = post.comments[commentId];
                  return (
                    <div key={commentId} className="comment">
                      <img src={comment.userPhoto} alt={comment.userName} className="comment-user-photo" />
                      <div className="comment-info">
                        <h4
                          dangerouslySetInnerHTML={{ __html: highlightText(comment.userName, searchTerm) }}
                        />
                        <p
                          dangerouslySetInnerHTML={{ __html: highlightText(comment.text, searchTerm) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Modal for user profile */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Profile"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Perfil de Usuario</h2>
        <div className="profile-info">
          <img src={auth.currentUser?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99qCZ8-l1k3yR0IYmGyxdK53rphlOPpTbtQ&s'} alt="Profile" className="profile-image" />
          <p><strong>Nombre:</strong> {auth.currentUser?.displayName || 'No disponible'}</p>
          <p><strong>Email:</strong> {auth.currentUser?.email || 'No disponible'}</p>
          <p><strong>UID:</strong> {auth.currentUser?.uid || 'No disponible'}</p>
        </div>
        <button onClick={closeModal} className="close-modal-button">Cerrar</button>
      </Modal>

      {/* Modal for filtering posts */}
      <Modal
        isOpen={filterModalIsOpen}
        onRequestClose={closeFilterModal}
        contentLabel="Filter Posts"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Filtrar por Tags</h2>
        <div className="filter-options">
          {availableTags.map(tag => (
            <div key={tag} className="filter-option">
              <input
                type="checkbox"
                id={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
        <button onClick={closeFilterModal} className="close-modal-button">Cerrar</button>
      </Modal>
    </div>
  );
};

export default HomePage;
