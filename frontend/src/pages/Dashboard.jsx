import React, { useState, useEffect } from 'react'
const API_URL = "https://campushub-maw4.onrender.com/api"

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [notes, setNotes] = useState([]);
    const [announcementTitle, setAnnouncementTitle] = useState("")
    const [announcementDate, setAnnouncementDate] = useState("")
    const [announcementDescription, setAnnouncementDescription] = useState("")
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null)


    const [eventTitle, setEventTitle] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [editingEventId, setEditingEventId] = useState(null)


    const [noteTitle, setNoteTitle] = useState("")
    const [noteSubject, setNoteSubject] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    const [editingNoteId, setEditingNoteId] = useState(null)
    const loadAnnouncements = async () => {
        try {
            const response = await fetch(`${API_URL}/announcements`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            setAnnouncements(data)
        } catch (error) {
            console.error("Error loading announcements: ", error)
        }
    }

    const loadEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/events`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            setEvents(data)

        } catch (error) {
            console.error("Error loading events :", error)
        }
    }
    const loadNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/notes`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            setNotes(data)

        } catch (error) {
            console.error("Error loading notes :", error)
        }
    }

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault()
        try {
            const isEditing = editingAnnouncementId !== null
            const url = isEditing ? `${API_URL}/announcements/${editingAnnouncementId}` : `${API_URL}/announcements`
            const method = isEditing ? "PUT" : "POST"
            const respone = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: announcementTitle,
                    date: announcementDate,
                    description: announcementDescription
                })
            })
            const data = await respone.json()
            if (!respone.ok) {
                throw new Error(data.message)
            }
            if (isEditing) {
                setAnnouncements((previousAnnouncements) =>
                    previousAnnouncements.map((announcement) =>
                        announcement.id === editingAnnouncementId ? data : announcement))
            }
            else {
                setAnnouncements((previousAnnouncements) => [
                    ...previousAnnouncements, data
                ])
            }
            setAnnouncementTitle("")
            setAnnouncementDate("")
            setAnnouncementDescription("")
            setEditingAnnouncementId(null)
        } catch (error) {
            console.error("error adding announcement:", error);

        }
    }

    const handleDeleteAnnouncement = async (id) => {
        try {
            const respone = await fetch(`${API_URL}/announcements/${id}`, {
                method: "DELETE"
            })
            const data = await respone.json()
            if (!respone.ok) {
                throw new Error(data.message)
            }
            setAnnouncements((previousAnnouncements) =>
                previousAnnouncements.filter(
                    (announcement) => announcement.id !== id
                ))
        } catch (error) {
            console.error("Error deleting announcement:", error)
        }
    }

    const handleEditAnnouncement = (announcement) => {
        setEditingAnnouncementId(announcement.id)
        setAnnouncementTitle(announcement.title)
        setAnnouncementDate(announcement.date)
        setAnnouncementDescription(announcement.description)
    }

    const handleEventSubmit = async (e) => {
        e.preventDefault()
        try {
            const isEditing = editingEventId !== null
            const url = isEditing ? `${API_URL}/events/${editingEventId}` : `${API_URL}/events`
            const method = isEditing ? "PUT" : "POST"
            const respone = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: eventTitle,
                    date: eventDate,
                    location: eventLocation
                })
            })
            const data = await respone.json()
            if (!respone.ok) {
                throw new Error(data.message)
            }
            if (isEditing) {
                setEvents((previousEvents) =>
                    previousEvents.map((event) =>
                        event.id === editingEventId ? data : event))
            }
            else {
                setEvents((previousEvents) => [
                    ...previousEvents, data
                ])
            }
            setEventTitle("")
            setEventDate("")
            setEventLocation("")
            setEditingEventId(null)
        } catch (error) {
            console.error("error adding event:", error);

        }
    }

    const handleDeleteEvent = async (id) => {
        try {
            const respone = await fetch(`${API_URL}/events/${id}`, {
                method: "DELETE"
            })
            const data = await respone.json()
            if (!respone.ok) {
                throw new Error(data.message)
            }
            setEvents((previousEvents) =>
                previousEvents.filter(
                    (event) => event.id !== id
                ))
        } catch (error) {
            console.error("Error deleting event:", error)
        }
    }

    
    const handleEditEvent = (event) => {
        setEditingEventId(event.id)
        setEventTitle(event.title)
        setEventDate(event.date)
        setEventLocation(event.location)
    }


    const handleNoteSubmit = async (e) => {
    e.preventDefault()

    try {
        const isEditing = editingNoteId !== null

        const url = isEditing
            ? `${API_URL}/notes/${editingNoteId}`
            : `${API_URL}/notes`

        const method = isEditing ? "PUT" : "POST"

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: noteTitle,
                subject: noteSubject,
                description: noteDescription
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        if (isEditing) {
            setNotes((previousNotes) =>
                previousNotes.map((note) =>
                    note.id === editingNoteId ? data : note
                )
            )
        } else {
            setNotes((previousNotes) => [
                ...previousNotes,
                data
            ])
        }

        setNoteTitle("")
        setNoteSubject("")
        setNoteDescription("")
        setEditingNoteId(null)

    } catch (error) {
        console.error("Error saving note:", error)
    }
}

const handleDeleteNote = async (id) => {
    try {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            method: "DELETE"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        setNotes((previousNotes) =>
            previousNotes.filter((note) => note.id !== id)
        )

    } catch (error) {
        console.error("Error deleting note:", error)
    }
}

const handleEditNote = (note) => {
    setEditingNoteId(note.id)
    setNoteTitle(note.title)
    setNoteSubject(note.subject)
    setNoteDescription(note.description)
}

    useEffect(() => {
        loadAnnouncements()
        loadEvents()
        loadNotes()
    }, [])
    return (
        <>
            <form onSubmit={handleAnnouncementSubmit}>
                <input type="text"
                    placeholder='Announcement title'
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)} />
                <input type="date"
                    placeholder='Announcement date'
                    value={announcementDate}
                    onChange={(e) => setAnnouncementDate(e.target.value)} />
                <textarea placeholder='Announcement description'
                    value={announcementDescription}
                    onChange={(e) => setAnnouncementDescription(e.target.value)} />
                <button type='Submit'>{editingAnnouncementId !== null ? "Update Event" : "Add Event"}</button>
            </form>

            <form onSubmit={handleEventSubmit}>
                <input type="text"
                    placeholder='Event title'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)} />
                <input type="date"
                    placeholder='Event date'
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)} />
                <textarea placeholder='Event location'
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)} />
                <button type='Submit'>{editingEventId !== null ? "Update Event" : "Add event"}</button>
            </form>

            <form onSubmit={handleNoteSubmit}>

    <input
        type="text"
        placeholder="Note title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
    />

    <input
        type="text"
        placeholder="Subject"
        value={noteSubject}
        onChange={(e) => setNoteSubject(e.target.value)}
    />

    <textarea
        placeholder="Note description"
        value={noteDescription}
        onChange={(e) => setNoteDescription(e.target.value)}
    />

    <button type="submit">
        {editingNoteId !== null
            ? "Update Note"
            : "Add Note"}
    </button>

</form>
            <header>
                <nav>
                    <a href="/" className='logo'>CampusHub</a>
                    <div className='dashboard-user'>
                        <span>Username</span>
                        <button id='logout-btn' type='button'>Logout</button>
                    </div>
                </nav>
            </header>
            <main id='dashboard'>
                <section className='dashboard-header'>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome back,<span>Username</span>!
                    </p>
                </section>

                {/* Dashboard Cards */}
                <section className="dashboard-content">
                    <a href="#announcements">
                        <h2>Announcements</h2>
                        <p>Latest campus Announcements</p>
                        <span>{announcements.length}</span>
                    </a>

                    <a href="#events">
                        <h2>Events</h2>
                        <p>Upcoming college Events</p>
                        <span>{events.length}</span>
                    </a>

                    <a href="#notes">
                        <h2>Notes</h2>
                        <p>Your saved study notes</p>
                        <span>{notes.length}</span>
                    </a>
                </section>


                {/* Announcements */}
                <section id="announcements" className="dashboard-section">

                    <div className="section-header">
                        <h2>Announcements</h2>

                        <button id="add-announcements-btn" type="button">
                            Add Announcement
                        </button>
                    </div>

                    <div id="announcement-list">
                        {announcements.length === 0 ? (
                            <p>No announcements available.</p>
                        ) : (
                            announcements.map((announcement) => (
                                <article key={announcement.id}>
                                    <h3>{announcement.title}</h3>
                                    <small>{announcement.date}</small>
                                    <p>{announcement.description}</p>
                                    <div className="card-action">
                                        <button className='edit-btn' onClick={() => handleEditAnnouncement(announcement)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDeleteAnnouncement(announcement.id)}>Delete</button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                </section>


                {/* Events */}
                <section id="events" className="dashboard-section">

                    <div className="section-header">
                        <h2>Upcoming Events</h2>

                        <button id="add-events-btn" type="button">
                            Add Event
                        </button>
                    </div>

                    <div id="event-list">
                        {events.length === 0 ? (
                            <p>No events available</p>
                        ) : (
                            events.map((event) => (
                                <article key={event.id}>
                                    <h3>{event.title}</h3>
                                    <p>Date: {event.date}</p>
                                    <p>Location: {event.location}</p>
                                    <div className="card-actions">
                                        <button className='edit-btn' onClick={() => handleEditEvent(event)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                </section>


                {/* Notes */}
                <section id="notes" className="dashboard-section">

                    <div className="section-header">
                        <h2>Study Notes</h2>

                        <button id="add-notes-btn" type="button">
                            Add Note
                        </button>
                    </div>

                    <div id="note-list">
                        {notes.length === 0 ? (
                            <p>No notes availabel.</p>
                        ) : (
                            notes.map((note) => (
                                <article key={note.id}>
                                    <h3>{note.title}</h3>
                                    <small>{note.subject}</small>
                                    <p>{note.description}</p>
                                    <div className='card-actions'>
                                        <button
    className="edit-btn"
    onClick={() => handleEditNote(note)}
>
    Edit
</button>

<button
    className="delete-btn"
    onClick={() => handleDeleteNote(note.id)}
>
    Delete
</button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                </section>
            </main>
        </>
    )
}

export default Dashboard
