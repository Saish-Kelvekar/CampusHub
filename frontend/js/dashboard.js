const isLoggedIn = localStorage.getItem("loggedIn");

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

function renderDashboardCards(items) {
    const dashboardCards = document.querySelector("#dashboard-cards");

    dashboardCards.innerHTML="";
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
    })
}



function animateDelete(button, callback) {
    const article = button.closest("article");
    if (article && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        article.classList.add("bursting");
        article.addEventListener("animationend", () => callback(), { once: true });
    } else {
        callback();
    }
}

const storedAnnouncements = localStorage.getItem("announcements");
let announcements = storedAnnouncements ? JSON.parse(storedAnnouncements) : [];


function renderAnnouncements(items) {
    const announcementList = document.querySelector("#announcement-list");

    announcementList.innerHTML = "";
    items.forEach((item) => {
        const announcement = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("small");
        date.textContent = item.date;

        const description = document.createElement("p");
        description.textContent = item.description;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            animateDelete(deleteButton, () => deleteAnnouncement(item.id));
        })

        announcement.append(title, date, description, deleteButton);
        announcementList.append(announcement);
    })
}

renderAnnouncements(announcements);

const defaultEvents = [
    {   id: crypto.randomUUID(),
        title: "Campus Hackathon",
        date: "August 18",
        location: "Main Auditorium"
    },
    {   id: crypto.randomUUID(),
        title: "Technical Workshop",
        date: "August 22",
        location: "Computer Lab 2"
    },
    {   id: crypto.randomUUID(),
        title: "Sports Meet",
        date: "August 27",
        location: "College Ground"
    }
];

//events section

const storedEvents = localStorage.getItem("events");
let events = storedEvents ? JSON.parse(storedEvents) : defaultEvents;

if (!storedEvents) {
    localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents(items) {
    const eventList = document.querySelector("#event-list");

    eventList.innerHTML = "";
    items.forEach((item) => {
        const event = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("p");
        date.textContent = `Date: ${item.date}`;

        const location = document.createElement("p");
        location.textContent = `Location: ${item.location}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            animateDelete(deleteButton, () => deleteEvent(item.id));
        });

        event.append(title, date, location, deleteButton);
        eventList.append(event);
    })
}

renderEvents(events);


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

eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = eventTitle.value.trim();
    const date = eventDate.value;
    const location = eventLocation.value.trim();
    const newEvent = {
        id: crypto.randomUUID(),
        title: title,
        date: date,
        location: location
    };
    events.push(newEvent);
    localStorage.setItem("events",
        JSON.stringify(events)
    );
    renderEvents(events);
    updateDashboardCounts();

    eventForm.reset();
    eventModal.classList.remove("open");
    eventModal.setAttribute("aria-hidden", "true");
});

function deleteEvent(id) {
    events = events.filter((item) => item.id !== id);
    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );
    renderEvents(events);
    updateDashboardCounts();
}

// Notes section

const storedNotes = localStorage.getItem("notes");
let notes = storedNotes ? JSON.parse(storedNotes) : [];

function renderNotes(items) {
    const noteList = document.querySelector("#note-list");

    noteList.innerHTML = "";
    items.forEach((item) => {
        const note = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = item.title;

        const subject = document.createElement("small");
        subject.textContent = item.subject;

        const description = document.createElement("p");
        description.textContent = item.description;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            animateDelete(deleteButton, () => deleteNote(item.id));
        });

        note.append(title, subject, description, deleteButton);
        noteList.append(note);
    });
}

renderNotes(notes);


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

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = noteTitle.value.trim();
    const subject = noteSubject.value.trim();
    const description = noteDescription.value.trim();
    const newNote = {
        id: crypto.randomUUID(),
        title: title,
        subject: subject,
        description: description
    };
    notes.push(newNote);
    localStorage.setItem("notes",
        JSON.stringify(notes)
    );
    renderNotes(notes);
    updateDashboardCounts();

    noteForm.reset();
    noteModal.classList.remove("open");
    noteModal.setAttribute("aria-hidden", "true");
});

function deleteNote(id) {
    notes = notes.filter((item) => item.id !== id);
    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
    renderNotes(notes);
    updateDashboardCounts();
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


announcementForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = announcementTitle.value.trim();
    const date = announcementDate.value;
    const description = announcementDescription.value.trim();
    const newAnnouncement = {
        id: crypto.randomUUID(),//gives unique id for the  each announcements
        title: title,
        date: date,
        description: description
    };
    announcements.push(newAnnouncement);
    localStorage.setItem("announcements",
        JSON.stringify(announcements)
    );
    renderAnnouncements(announcements);
    updateDashboardCounts();

    announcementForm.reset();//reset the value of the form
    announcementModal.classList.remove("open");
    announcementModal.setAttribute("aria-hidden", "true");
});


function deleteAnnouncement(id) {
    announcements = announcements.filter((item) => item.id !== id);//update the elements by removing that element only
    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );
    renderAnnouncements(announcements);
    updateDashboardCounts();

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

updateDashboardCounts();