import { useState } from 'react';
import { noteAPI } from '../lib/api';

const AddNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
        console.log(title,description)
      const response = await noteAPI.createNote({ title, description });
      onNoteAdded(response.data.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Note</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
