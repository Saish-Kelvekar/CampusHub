import React from 'react'

const AnnouncementSection = ({
    announcements,
    onEdit,
    onDelete,
    onAdd,
    deletingIds = []
}) => {
  return (
    <section id="announcements" className="dashboard-section">

            <div className="section-header">
                <h2>Announcements</h2>

                <button
                    id="add-announcements-btn"
                    className="btn-add"
                    type="button"
                    onClick={onAdd}
                >
                    + Add Announcement
                </button>
            </div>

            <div id="announcement-list">

                {announcements.length === 0 ? (
                    <p>No announcements available.</p>
                ) : (
                    announcements.map((announcement) => (
                        <article
                            key={announcement.id}
                            className={deletingIds.includes(announcement.id) ? "is-deleting bursting" : ""}
                        >

                            <h3>{announcement.title}</h3>

                            <small>{announcement.date}</small>

                            <p>{announcement.description}</p>

                            <div className="card-actions">

                                <button
                                    className="edit-btn"
                                    disabled={deletingIds.includes(announcement.id)}
                                    onClick={() => onEdit(announcement)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={deletingIds.includes(announcement.id)}
                                    onClick={() => onDelete(announcement.id)}
                                >
                                    {deletingIds.includes(announcement.id) ? "Deleting…" : "Delete"}
                                </button>

                            </div>

                        </article>
                    ))
                )}

            </div>

        </section>
  )
}

export default AnnouncementSection
