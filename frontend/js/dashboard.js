const isLoggedIn=localStorage.getItem("loggedIn");

if(isLoggedIn!=="true"){
    window.location.href="index.html";
}


const userName=localStorage.getItem("userName");
const userNameElement=document.querySelector("#user-name");
const welcomeName=document.querySelector("#welcome-name");

userNameElement.textContent=userName;
welcomeName.textContent=userName;


const logoutBtn=document.querySelector("#logout-btn");

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("loggedIn");
    window.location.href="index.html";
});


const dashboardItems =[
    {
        title:"Annoucements",
        description:"Latest campus annoucements",
        count:5,
        link:"#announcements"
    },

    {
        title:"Events",
        description:"Upcoming college events",
        count:3,
        link:"#events"
    },
    {
        title:"Notes",
        description:"Your saved study notes",
        count:12,
        link:"#notes"
    }
];

function renderDashboardCards(items){
const dashboardCards=document.querySelector("#dashboard-cards");

    items.forEach((item)=>{
    const card=document.createElement("a");
    card.href=item.link;
    const title=document.createElement("h2");
    title.textContent=item.title;

    const description=document.createElement("p");
    description.textContent=item.description;

    const count=document.createElement("span");
    count.textContent=item.count;

    

    card.append(title,description,count);
    dashboardCards.append(card);
})
}

renderDashboardCards(dashboardItems);

const announcements = [
    {
        title: "End Semester Examination",
        date: "August 20",
        description: "End semester examination timetable has been released."
    },
    {
        title: "Hackathon Registration",
        date: "August 25",
        description: "Registrations are open for the upcoming campus hackathon."
    },
    {
        title: "Library Timing",
        date: "August 30",
        description: "The library will remain open until 9 PM this week."
    }
];
function renderAnnouncements(items){
const announcementList=document.querySelector("#announcement-list");

    items.forEach((item)=>{
    const annoucement=document.createElement("article");
    
    const title=document.createElement("h3");
    title.textContent=item.title;

    const date=document.createElement("small");
    date.textContent=item.date;

    const description=document.createElement("p");
    description.textContent=item.description;

    

    annoucement.append(title,date,description);
    announcementList.append(annoucement);
})
}

renderAnnouncements(announcements);

const events = [
    {
        title: "Campus Hackathon",
        date: "August 18",
        location: "Main Auditorium"
    },
    {
        title: "Technical Workshop",
        date: "August 22",
        location: "Computer Lab 2"
    },
    {
        title: "Sports Meet",
        date: "August 27",
        location: "College Ground"
    }
];

function renderEvents(items){
const eventList=document.querySelector("#event-list");

    items.forEach((item)=>{
    const event=document.createElement("article");
    
    const title=document.createElement("h3");
    title.textContent=item.title;

    const date=document.createElement("p");
    date.textContent=`Date: ${item.date}`;

    const location=document.createElement("p");
    location.textContent=`Location: ${item.location}`;

    

    

    event.append(title,date,location);
    eventList.append(event);
})
}

renderEvents(events);

const notes = [
    {
        title: "Data Structures",
        subject: "Computer Science",
        description: "Linked lists, stacks, queues and trees."
    },
    {
        title: "Operating Systems",
        subject: "Computer Science",
        description: "CPU scheduling and process management."
    },
    {
        title: "Machine Learning",
        subject: "Artificial Intelligence",
        description: "Regression, classification and model evaluation."
    }
];

function renderNotes(items) {
    const noteList = document.querySelector("#note-list");

    items.forEach((item) => {
        const note = document.createElement("article");

        const title = document.createElement("h3");
        title.textContent = item.title;

        const subject = document.createElement("small");
        subject.textContent = item.subject;

        const description = document.createElement("p");
        description.textContent = item.description;

        note.append(title, subject, description);
        noteList.append(note);
    });
}

renderNotes(notes);
