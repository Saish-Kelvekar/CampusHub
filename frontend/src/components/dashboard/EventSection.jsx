import React from 'react'

const EventSection = ({
      events,
    onEdit,
    onDelete,
    onAdd,
    deletingIds = []
}) => {
  return (
    <section id="events" className="dashboard-section">
            <div className="section-header">
                <h2>Events</h2>

                <button
                    id="add-event-btn"
                    className="btn-add"
                    type="button"
                    onClick={onAdd}
                >
                    + Add Event
                </button>
            </div>

            <div id="event-list">
                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => (
                        <article
                            key={event.id}
                            className={deletingIds.includes(event.id) ? "is-deleting bursting" : ""}
                        >
                            <h3>{event.title}</h3>
                            <small>{event.date}</small>
                            <p>{event.location}</p>

                            <div className="card-actions">
                                <button
                                    className="edit-btn"
                                    disabled={deletingIds.includes(event.id)}
                                    onClick={() => onEdit(event)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={deletingIds.includes(event.id)}
                                    onClick={() => onDelete(event.id)}
                                >
                                    {deletingIds.includes(event.id) ? "Deleting…" : "Delete"}
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
  )
}

export default EventSection
