import { useState } from 'react';
import { noteAPI } from '../lib/api';
import EditNote from './EditNote';

const NoteCard = ({ note, onNoteUpdated, onNoteDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    setIsLoading(true);
    try {
      await noteAPI.deleteNote(note._id);
      onNoteDeleted(note._id);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      const response = await noteAPI.toggleArchive(note._id);
      onNoteUpdated(response.data.data);
    } catch (error) {
      console.error('Error toggling archive:', error);
      alert('Failed to toggle archive status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <EditNote
        note={note}
        onNoteUpdated={(updatedNote) => {
          onNoteUpdated(updatedNote);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${note.archived ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
        {note.archived && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Archived
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{note.description}</p>
      
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          disabled={isLoading}
        >
          Edit
        </button>
        
        <button
          onClick={handleArchive}
          disabled={isLoading}
          className={`px-3 py-1 rounded text-sm transition-colors text-white ${
            note.archived
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-yellow-500 hover:bg-yellow-600'
          } disabled:opacity-50`}
        >
          {isLoading ? 'Loading...' : (note.archived ? 'Unarchive' : 'Archive')}
        </button>
        
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        Created: {new Date(note.createdAt).toLocaleDateString()}
        {note.updatedAt !== note.createdAt && (
          <span className="ml-2">
            • Updated: {new Date(note.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
