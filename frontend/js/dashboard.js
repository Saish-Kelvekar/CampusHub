const isLoggedIn = localStorage.getItem("loggedIn");
const API_URL = "https://campushub-maw4.onrender.com/api";
if (isLoggedIn !== "true") {
    window.location.href = "index.html";
}


const userName = localStorage.getItem("userName");
const userNameElement = document.querySelector("#user-name");
const welcomeName = document.querySelector("#welcome-name");

userNameElement.textContent = userName;
welcomeName.textContent = userName;


const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});


const dashboardItems = [
    {
        title: "Annoucements",
        description: "Latest campus announcements",
        count: 5,
        link: "#announcements"
    },

    {
        title: "Events",
        description: "Upcoming college events",
        count: 3,
        link: "#events"
    },
    {
        title: "Notes",
        description: "Your saved study notes",
        count: 12,
        link: "#notes"
    }
];





function animateDelete(button, callback) {
    const article = button.closest("article");
    if (article && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        article.classList.add("bursting");
        article.addEventListener("animationend", () => callback(), { once: true });
    } else {
        callback();
    }
}




let announcements = [];
let highlightAnnouncementId = null;
function renderAnnouncements(items) {
    const announcementList = document.querySelector("#announcement-list");

    announcementList.innerHTML = "";
    if (items.length === 0) {
        announcementList.textContent = "No announcements available. ";
        return;
    }
    items.forEach((item) => {
        const announcement = document.createElement("article");

        if (item.id === highlightAnnouncementId) {
            announcement.classList.add("just-updated");
        }

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("small");
        date.textContent = item.date;

        const description = document.createElement("p");
        description.textContent = item.description;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", () => {
            editAnnouncement(item);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm("Are you sure you want to delete this announcement?");

            if (!confirmed) {
                return;
            }
            animateDelete(deleteButton, () => deleteAnnouncement(item.id));
        })

        const actions = document.createElement("div");
        actions.className = "card-actions";
        actions.append(editButton, deleteButton);

        announcement.append(title, date, description, actions);
        announcementList.append(announcement);
    })
    highlightAnnouncementId = null;
}

let editingAnnouncementId = null;
function editAnnouncement(item) {
    editingAnnouncementId = item.id;
    announcementTitle.value = item.title;
    announcementDate.value = item.date;
    announcementDescription.value = item.description;

    announcementModal.classList.add("open");
    announcementModal.setAttribute("aria-hidden", "false");
}

async function loadAnnouncements() {
    const announcementList = document.querySelector("#announcement-list");
    announcementList.textContent = "Loading Announcements...."
    try {
        const response = await fetch(
            `${API_URL}/announcements`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        announcements = await response.json();
        renderAnnouncements(announcements);
        updateDashboardCounts();
    }
    catch (error) {
        console.error(error);
        announcementList.textContent = "Failed to load announcements. Please try again"
    }



}
loadAnnouncements();




//events section
//=========Events api frontend===========//

let events = [];
let highlightEventId = null;





function renderEvents(items) {
    const eventList = document.querySelector("#event-list");

    eventList.innerHTML = "";
    if (items.length === 0) {
        eventList.textContent = "No events available. ";
        return;
    }
    items.forEach((item) => {
        const event = document.createElement("article");

        if (item.id === highlightEventId) {
            event.classList.add("just-updated");
        }

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("p");
        date.textContent = `Date: ${item.date}`;

        const location = document.createElement("p");
        location.textContent = `Location: ${item.location}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", () => {
            editEvent(item);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm("Are you sure you want to delete this event?");

            if (!confirmed) {
                return;
            }
            animateDelete(deleteButton, () => deleteEvent(item.id));
        });

        const actions = document.createElement("div");
        actions.className = "card-actions";
        actions.append(editButton, deleteButton);

        event.append(title, date, location, actions);
        eventList.append(event);
    })

    highlightEventId = null;
}

let editingEventId = null;

function editEvent(item) {
    editingEventId = item.id;

    eventTitle.value = item.title;
    eventDate.value = item.date;
    eventLocation.value = item.location;

    eventModal.classList.add("open");
    eventModal.setAttribute("aria-hidden", "false");
}

async function loadEvents() {
    const eventList = document.querySelector("#event-list");
    eventList.textContent = "Loading events....";
    try {
        const response = await fetch(
            `${API_URL}/events`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        events = await response.json();
        renderEvents(events);
        updateDashboardCounts();

    } catch (error) {
        console.error("Error loading events :", error);
        eventList.textContent = "Failed to load events. Please try again"
    }
}

loadEvents();





const addEventBtn = document.querySelector("#ad-events-btn");
const eventModal = document.querySelector("#event-modal");
const closeEventBtn = document.querySelector("#close-event");

addEventBtn.addEventListener("click", () => {
    eventModal.classList.add("open");
    eventModal.setAttribute("aria-hidden", "false");
});

closeEventBtn.addEventListener("click", () => {
    eventModal.classList.remove("open");
    eventModal.setAttribute("aria-hidden", "true");
});

eventModal.addEventListener("click", (event) => {
    if (event.target === eventModal) {
        eventModal.classList.remove("open");
        eventModal.setAttribute("aria-hidden", "true");
    }
});

// Event section

const eventForm = document.querySelector("#event-form");
const eventTitle = document.querySelector("#event-title");
const eventDate = document.querySelector("#event-date");
const eventLocation = document.querySelector("#event-location");

eventForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = eventTitle.value.trim();
    const date = eventDate.value;
    const location = eventLocation.value.trim();
    const newEvent = {

        title: title,
        date: date,
        location: location
    };
    try {
        if (editingEventId === null) {
            const response = await fetch(
                `${API_URL}/events`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEvent)
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } else {
            const response = await fetch(
                `${API_URL}/events/${editingEventId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEvent)
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            highlightEventId = editingEventId;
            editingEventId = null;
        }

        await loadEvents();

        
        eventForm.reset();
        eventModal.classList.remove("open");
        eventModal.setAttribute("aria-hidden", "true");

    } catch (error) {
        console.error("Error adding event: ", error);
    }


});

async function deleteEvent(id) {
    
    try {
        const response = await fetch(
            `${API_URL}/events/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        await loadEvents();
    } catch (error) {
        console.error("Error deleting event : ", error);
    }

}

// Notes section

let notes = [];
let highlightNoteId = null;
let editingNoteId = null;
function renderNotes(items) {
    const noteList = document.querySelector("#note-list");

    noteList.innerHTML = "";
    if (items.length === 0) {
        noteList.textContent = "No notes available. ";
        return;
    }
    items.forEach((item) => {
        const note = document.createElement("article");

        if (item.id === highlightNoteId) {
            note.classList.add("just-updated");
        }

        const title = document.createElement("h3");
        title.textContent = item.title;

        const subject = document.createElement("small");
        subject.textContent = item.subject;

        const description = document.createElement("p");
        description.textContent = item.description;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        editButton.addEventListener("click", () => {
            editNotes(item);
        })
        deleteButton.addEventListener("click", () => {
            const confirmed = confirm("Are you sure you want to delete this note?");

            if (!confirmed) {
                return;
            }
            animateDelete(deleteButton, () => deleteNote(item.id));
        });

        const actions = document.createElement("div");
        actions.className = "card-actions";
        actions.append(editButton, deleteButton);

        note.append(title, subject, description, actions);
        noteList.append(note);
    });
    highlightNoteId = null;
}


async function loadNotes() {
    const noteList = document.querySelector("#note-list");
    noteList.textContent = "Loading notes....";
    try {
        const response = await fetch(
            `${API_URL}/notes`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        notes = await response.json();
        renderNotes(notes);
        updateDashboardCounts();
    } catch (error) {
        console.error("Error loading the notes", error);
        noteList.textContent = "Failed to load  notes. Please try again"
    }

}
loadNotes();



const addNoteBtn = document.querySelector("#ad-notes-btn");
const noteModal = document.querySelector("#note-modal");
const closeNoteBtn = document.querySelector("#close-note");

addNoteBtn.addEventListener("click", () => {
    noteModal.classList.add("open");
    noteModal.setAttribute("aria-hidden", "false");
});

closeNoteBtn.addEventListener("click", () => {
    noteModal.classList.remove("open");
    noteModal.setAttribute("aria-hidden", "true");
});

noteModal.addEventListener("click", (event) => {
    if (event.target === noteModal) {
        noteModal.classList.remove("open");
        noteModal.setAttribute("aria-hidden", "true");
    }
});

const noteForm = document.querySelector("#note-form");
const noteTitle = document.querySelector("#note-title");
const noteSubject = document.querySelector("#note-subject");
const noteDescription = document.querySelector("#note-description");

function editNotes(item) {
    editingNoteId = item.id;
    noteTitle.value = item.title;
    noteSubject.value = item.subject;
    noteDescription.value = item.description;

    noteModal.classList.add("open");
    noteModal.setAttribute("aria-hidden", "false");

}

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = noteTitle.value.trim();
    const subject = noteSubject.value.trim();
    const description = noteDescription.value.trim();
    const newNote = {

        title: title,
        subject: subject,
        description: description
    };
    try {
        if (editingNoteId === null) {
            const response = await fetch(
                `${API_URL}/notes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newNote)
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } else {
            const response = await fetch(
                `${API_URL}/notes/${editingNoteId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newNote)
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            highlightNoteId = editingNoteId;
            editingNoteId = null;
        }


        
        await loadNotes();
        noteForm.reset();
        noteModal.classList.remove("open");
        noteModal.setAttribute("aria-hidden", "true");
    } catch (error) {
        console.error("Error adding notes :", error);
    }




});

async function deleteNote(id) {

    try {
        const response = await fetch(
            `${API_URL}/notes/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        await loadNotes();
    } catch (error) {
        console.error("Error deleting note :", error);
    }
}

const addAnnouncementBtn = document.querySelector("#ad-announcements-btn");

const announcementModal = document.querySelector("#announcement-modal");

const closeAnnouncementBtn = document.querySelector("#close-announcement");



addAnnouncementBtn.addEventListener("click", () => {
    announcementModal.classList.add("open");
    announcementModal.setAttribute("aria-hidden", "false");
});

closeAnnouncementBtn.addEventListener("click", () => {
    announcementModal.classList.remove("open");
    announcementModal.setAttribute("aria-hidden", "true");
});

announcementModal.addEventListener("click", (event) => {
    if (event.target === announcementModal) {
        announcementModal.classList.remove("open");
        announcementModal.setAttribute("aria-hidden", "true");
    }
});


// Announcement section

const announcementForm = document.querySelector("#announcement-form");
const announcementTitle = document.querySelector("#announcement-title");
const announcementDate = document.querySelector("#announcement-date");
const announcementDescription = document.querySelector("#announcement-description");


announcementForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = announcementTitle.value.trim();
    const date = announcementDate.value;
    const description = announcementDescription.value.trim();
    const newAnnouncement = {
        
        title: title,
        date: date,
        description: description
    };
    

    try {

        if (editingAnnouncementId === null) {
            const response = await fetch(
                `${API_URL}/announcements`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newAnnouncement)
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            

        } else {
            const response = await fetch(
                `${API_URL}/announcements/${editingAnnouncementId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newAnnouncement)
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            highlightAnnouncementId = editingAnnouncementId;
            editingAnnouncementId = null;
        }

        await loadAnnouncements();



        announcementForm.reset();//reset the value of the form
        announcementModal.classList.remove("open");
        announcementModal.setAttribute("aria-hidden", "true");
    } catch (error) {
        console.error(error);
    }

});


async function deleteAnnouncement(id) {
    
    try {
        const response = await fetch(
            `${API_URL}/announcements/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        

       
        await loadAnnouncements();
      
    } catch (error) {
        console.error("Error deleting announcement: ", error);
    }

}


function renderDashboardCards(items) {
    const dashboardCards =
        document.querySelector("#dashboard-cards");

    dashboardCards.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("a");
        card.href = item.link;

        const title = document.createElement("h2");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const count = document.createElement("span");
        count.textContent = item.count;

        card.append(title, description, count);
        dashboardCards.append(card);
    });
}

function updateDashboardCounts() {
    

    dashboardItems[0].count = announcements.length;
    dashboardItems[1].count = events.length;
    dashboardItems[2].count = notes.length;

    

    renderDashboardCards(dashboardItems);
}

