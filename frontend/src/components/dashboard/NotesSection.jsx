import React from 'react'

const NotesSection = ({
    notes,
    onEdit,
    onDelete,
    onAdd,
    deletingIds = []
}) => {
  return (
    <section id="notes" className="dashboard-section">
            <div className="section-header">
                <h2>Notes</h2>

                <button
                    id="add-note-btn"
                    className="btn-add"
                    type="button"
                    onClick={onAdd}
                >
                    + Add Note
                </button>
            </div>

            <div id="notes-list">
                {notes.length === 0 ? (
                    <p>No notes available.</p>
                ) : (
                    notes.map((note) => (
                        <article
                            key={note.id}
                            className={deletingIds.includes(note.id) ? "is-deleting bursting" : ""}
                        >
                            <h3>{note.title}</h3>
                            <small>{note.subject}</small>
                            <p>{note.description}</p>

                            <div className="card-actions">
                                <button
                                    className="edit-btn"
                                    disabled={deletingIds.includes(note.id)}
                                    onClick={() => onEdit(note)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={deletingIds.includes(note.id)}
                                    onClick={() => onDelete(note.id)}
                                >
                                    {deletingIds.includes(note.id) ? "Deleting…" : "Delete"}
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
  )
}

export default NotesSection
