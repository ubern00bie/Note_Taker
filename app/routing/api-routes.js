const fs = require('fs');
const noteData = require("../db/db.json");
let dbNotes = [];
module.exports = function(app) {
       
    app 
        .route('/api/notes')
        // get response which reads notes saved in db.json file and responds with notes
        .get((req, res) => { 
            try {
            dbNotes = fs.readFileSync("./db/db.json", 'utf8');
            dbNotes = JSON.parse(dbNotes);
            } catch (err) {
                console.log(err)
            }
            res.json(dbNotes)
        })
        // post which takes user's note and writes it to the db.json file and then responds with the new array of notes
        .post((req, res) => {
            try{
            dbNotes = fs.readFileSync("./db/db.json", 'utf8');
            dbNotes = JSON.parse(dbNotes);
            req.body.id = dbNotes.length;
            dbNotes.push(req.body);
            dbNotes = JSON.stringify(dbNotes);
            console.log('New note succussfully pushed to storage: ' + dbNotes);

            fs.writeFile("./db/db.json", dbNotes, "utf8", function(err){
                if (err) throw err;
            });
            res.json(JSON.parse(dbNotes));

        } catch (err) {
            throw err;
        }
        });

    app 
        .route('/api/notes/:id')
        //upon get request for specific id, reads the db.json file and returns the note with an id that matches request parameters
        .get((req, res) => {
            let dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
            res.json(dbNotes[Number(req.params.id)]);
        })
        //upon post request, reads the db.json file, adds a unique id to the request body, and writes the request body to the db.json file
        .post((req,res) => {
            let dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
            let newNote = req.body;
            let uniqueID = (dbNotes.length).toString();
            newNote.id = uniqueID;
            dbNotes.push(newNote);

            fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes));
            res.json(dbNotes);
        })

    app
        .delete("/api/notes/:id", (req,res) => {
        //upon delete request, deletes the note with id that matches request parameter
        let dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note - Id: ${noteID}`);
        dbNotes = dbNotes.filter(currNote => {
        return currNote.id != noteID;

        })
        for (currNote of dbNotes) {
                currNote.id = newID.toString();
                newID++;
            }
            fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes));
            res.json(dbNotes);
    })
     
}
