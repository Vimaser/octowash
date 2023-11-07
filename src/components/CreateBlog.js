import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../firebaseConfig';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const db = getFirestore();
    const paragraphs = content.split('\n\n');
    const newPost = {
      title: title,
      author: author,
      content: paragraphs,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, 'posts'), newPost);
      alert('Post created successfully!');
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to create post.');
    }
    setLoading(false);
  };
  

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            value={author} 
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;