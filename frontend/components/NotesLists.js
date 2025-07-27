import NoteCard from './NoteCard';

const NotesList = ({ notes, onNoteUpdated, onNoteDeleted }) => {
  const activeNotes = notes.filter(note => !note.archived);
  const archivedNotes = notes.filter(note => note.archived);

  return (
    <div>
      {/* Active Notes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Active Notes ({activeNotes.length})
        </h2>
        {activeNotes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No active notes yet. Create your first note!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onNoteUpdated={onNoteUpdated}
                onNoteDeleted={onNoteDeleted}
              />
            ))}
          </div>
        )}
      </div>

      {/* Archived Notes */}
      {archivedNotes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Archived Notes ({archivedNotes.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archivedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onNoteUpdated={onNoteUpdated}
                onNoteDeleted={onNoteDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
