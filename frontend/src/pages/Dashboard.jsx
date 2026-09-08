import React, { useState, useEffect } from 'react'
import AnnouncementSection from '../components/dashboard/AnnouncementSection';
import EventSection from '../components/dashboard/EventSection';
import NotesSection from '../components/dashboard/NotesSection';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
const API_URL = "https://campushub-maw4.onrender.com/api"

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [notes, setNotes] = useState([]);
    const [announcementTitle, setAnnouncementTitle] = useState("")
    const [announcementDate, setAnnouncementDate] = useState("")
    const [announcementDescription, setAnnouncementDescription] = useState("")
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null)
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)

    const [eventTitle, setEventTitle] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [editingEventId, setEditingEventId] = useState(null)
    const [isEventOpen, setIsEventOpen] = useState(false)

    const [noteTitle, setNoteTitle] = useState("")
    const [noteSubject, setNoteSubject] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    const [editingNoteId, setEditingNoteId] = useState(null)
    const [isNoteOpen, setIsNoteOpen] = useState(false)

    const [deletingAnnouncementIds, setDeletingAnnouncementIds] = useState([])
    const [deletingEventIds, setDeletingEventIds] = useState([])
    const [deletingNoteIds, setDeletingNoteIds] = useState([])
    const DELETE_ANIMATION_MS = 450
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
            setIsAnnouncementOpen(false)
        } catch (error) {
            console.error("error adding announcement:", error);

        }
    }

    const handleDeleteAnnouncement = async (id) => {
        if (deletingAnnouncementIds.includes(id)) return
        setDeletingAnnouncementIds((prev) => [...prev, id])
        // Let the card delete animation play before removing the item
        await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS))
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
        } finally {
            setDeletingAnnouncementIds((prev) => prev.filter((itemId) => itemId !== id))
        }
    }

    const handleEditAnnouncement = (announcement) => {

        setEditingAnnouncementId(announcement.id)
        setAnnouncementTitle(announcement.title)
        setAnnouncementDate(announcement.date)
        setAnnouncementDescription(announcement.description)
        setIsAnnouncementOpen(true)
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
            setIsEventOpen(false)
        } catch (error) {
            console.error("error adding event:", error);

        }
    }

    const handleDeleteEvent = async (id) => {
        if (deletingEventIds.includes(id)) return
        setDeletingEventIds((prev) => [...prev, id])
        // Let the card delete animation play before removing the item
        await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS))
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
        } finally {
            setDeletingEventIds((prev) => prev.filter((itemId) => itemId !== id))
        }
    }


    const handleEditEvent = (event) => {
        setEditingEventId(event.id)
        setEventTitle(event.title)
        setEventDate(event.date)
        setEventLocation(event.location)
        setIsEventOpen(true)
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
            setIsNoteOpen(false);

        } catch (error) {
            console.error("Error saving note:", error)
        }
    }

    const handleDeleteNote = async (id) => {
        if (deletingNoteIds.includes(id)) return
        setDeletingNoteIds((prev) => [...prev, id])
        // Let the card delete animation play before removing the item
        await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS))
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
        } finally {
            setDeletingNoteIds((prev) => prev.filter((itemId) => itemId !== id))
        }
    }

    const handleEditNote = (note) => {
        setEditingNoteId(note.id)
        setNoteTitle(note.title)
        setNoteSubject(note.subject)
        setNoteDescription(note.description)
        setIsNoteOpen(true)
    }

    const closeAnnouncementModal = () => {
        setIsAnnouncementOpen(false)
        setEditingAnnouncementId(null)
        setAnnouncementTitle("")
        setAnnouncementDate("")
        setAnnouncementDescription("")
    }

    const closeEventModal = () => {
        setIsEventOpen(false)
        setEditingEventId(null)

        setEventTitle("")
        setEventDate("")
        setEventLocation("")
    }

    const closeNoteModal = () => {
        setIsNoteOpen(false)
        setEditingNoteId(null)

        setNoteTitle("")
        setNoteSubject("")
        setNoteDescription("")

    }
    useEffect(() => {
        loadAnnouncements()
        loadEvents()
        loadNotes()
    }, [])
    return (
        <>
            {isAnnouncementOpen && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            {editingAnnouncementId !== null
                                ? "Edit Announcement"
                                : "Add Announcement"}
                        </h2>

                        <form onSubmit={handleAnnouncementSubmit} className="modal-form">

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Announcement title"
                                value={announcementTitle}
                                onChange={(e) =>
                                    setAnnouncementTitle(e.target.value)
                                }
                            />

                            <input
                                type="date"
                                className="form-input"
                                value={announcementDate}
                                onChange={(e) =>
                                    setAnnouncementDate(e.target.value)
                                }
                            />

                            <textarea
                                placeholder="Announcement description"
                                className="form-textarea"
                                value={announcementDescription}
                                onChange={(e) =>
                                    setAnnouncementDescription(e.target.value)
                                }
                            />

                            <button type="submit" className="btn-submit">
                                {editingAnnouncementId !== null
                                    ? "Update Announcement"
                                    : "Add Announcement"}
                            </button>

                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={closeAnnouncementModal}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>
            )}

            {isEventOpen && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            {editingEventId !== null
                                ? "Edit Event"
                                : "Add Event"}
                        </h2>

                        <form onSubmit={handleEventSubmit} className="modal-form">

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Event title"
                                value={eventTitle}
                                onChange={(e) =>
                                    setEventTitle(e.target.value)
                                }
                            />

                            <input
                                type="date"
                                className="form-input"
                                value={eventDate}
                                onChange={(e) =>
                                    setEventDate(e.target.value)
                                }
                            />

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Event location"
                                value={eventLocation}
                                onChange={(e) =>
                                    setEventLocation(e.target.value)
                                }
                            />

                            <button type="submit" className="btn-submit">
                                {editingEventId !== null
                                    ? "Update Event"
                                    : "Add Event"}
                            </button>

                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={closeEventModal}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>
            )}

            {isNoteOpen && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            {editingNoteId !== null
                                ? "Edit Note"
                                : "Add Note"}
                        </h2>

                        <form onSubmit={handleNoteSubmit} className="modal-form">

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Note title"
                                value={noteTitle}
                                onChange={(e) =>
                                    setNoteTitle(e.target.value)
                                }
                            />

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Subject"
                                value={noteSubject}
                                onChange={(e) =>
                                    setNoteSubject(e.target.value)
                                }
                            />

                            <textarea
                                placeholder="Note description"
                                className="form-textarea"
                                value={noteDescription}
                                onChange={(e) =>
                                    setNoteDescription(e.target.value)
                                }
                            />

                            <button type="submit" className="btn-submit">
                                {editingNoteId !== null
                                    ? "Update Note"
                                    : "Add Note"}
                            </button>

                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={ closeNoteModal}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>
            )}
            <DashboardNavbar />
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
                <AnnouncementSection
                    announcements={announcements}
                    onEdit={handleEditAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    onAdd={() => setIsAnnouncementOpen(true)}
                    deletingIds={deletingAnnouncementIds}
                />


                {/* Events */}
                <EventSection
                    events={events}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onAdd={() => setIsEventOpen(true)}
                    deletingIds={deletingEventIds} />


                {/* Notes */}
                <NotesSection
                    notes={notes}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onAdd={() => setIsNoteOpen(true)}
                    deletingIds={deletingNoteIds}
                />
            </main>
        </>
    )
}

export default Dashboard
