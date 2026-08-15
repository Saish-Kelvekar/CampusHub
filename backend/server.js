const express = require("express");
const cors=require("cors")
const app=express();
app.use(cors());
app.use(express.json());//used for post reason  JSON---(parse)-->req.body
const PORT =3000;


app.get("/",(req,res)=>{//syntax (path,callback)
    res.send("welcome to CampusHub");
})


const announcements=[
    {
        id: 1,
        title: "End Semester Examination",
        date: "August 20",
        description: "End semester examination timetable has been released."
    },
    {
        id: 2,
        title: "Hackathon Registration",
        date: "August 25",
        description: "Registrations are open for the upcoming campus hackathon."
    }
];

app.get("/api/announcements",(req,res)=>{
    res.json(announcements);
})

app.post("/api/announcements",(req,res)=>{
    const newAnnouncement={
        id:announcements.length+1,
        title:req.body.title,
        date:req.body.date,
        description:req.body.description
    };

    announcements.push(newAnnouncement);
    res.status(201).json(newAnnouncement);
});


app.delete("/api/announcements/:id",(req,res)=>{
    const id=Number(req.params.id);

    const index=announcements.findIndex(
        (item)=>item.id=== id
    );
    if(index===-1){
        res.status(404).json({
            message:"Announcement not found"
        });
    }

    announcements.splice(index,1);
    res.json({
        message:"Announcement deleted successfully"
    });
});
app.listen(PORT,()=>{//(platform,callback)
    console.log(`CampusHub server running on port ${PORT}`);
});



/*========EVENTS API==========*/

const events=[
    {
        id:1,
        title:"Campus Hackathon",
        date : "August 18",
        location:"Main Auditorium"
    },
    {
        id: 2,
        title: "Technical Workshop",
        date: "August 22",
        location: "Computer Lab 2"
    },
    {
        id: 3,
        title: "Sports Meet",
        date: "August 27",
        location: "College Ground"
    }
];

app.get("/api/events",(req,res)=>{
    res.json(events);
});


app.post("/api/events",(req,res)=>{
    const newEvent={
        id: events.length + 1,
        title: req.body.title,
        date: req.body.date,
        location: req.body.location
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});


app.delete("/api/events",(req,res)=>{
    const id=Number(req.params.id);

    const index=events.findIndex(
        (item)=>item.id===id
    );

    if(index===-1){
        return res.status(404).json({
            message:"Event not found"
        });
    }

    events.splice(index,1);

    res.json({
        message:"Event deleted successfully"
    });
});


const notes = [
    {
        id: 1,
        title: "Data Structures",
        subject: "Computer Science",
        description: "Linked lists, stacks, queues and trees."
    },
    {
        id: 2,
        title: "Operating Systems",
        subject: "Computer Science",
        description: "CPU scheduling and process management."
    },
    {
        id: 3,
        title: "Machine Learning",
        subject: "Artificial Intelligence",
        description: "Regression, classification and model evaluation."
    }
];

app.get("/api/notes",(req,res)=>{
    res.json(notes);
});

app.post("/api/notes",(req,res)=>{
    const newNotes={
        id:notes.length+1,
        title:req.body.title,
        subject:req.body.subject,
        description:req.body.description
    };

    notes.push(newNotes);
    res.status(201).json(newNotes);
});

app.delete("/api/notes",(req,res)=>{
    const id=Number(req.body.id);

    const index=notes.findIndex(
        (items)=> items.id===id
    );

    if(index===-1){
        return res.status(404).json({
            message:"Note not found"
        });
    }

    notes.splice(index,1);

    res.json({
        message:"Notes deleted successfully"
    });
});