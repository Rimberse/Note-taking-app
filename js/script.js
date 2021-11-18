// IFFE
(() => {
    // Used to concatenante old notes with new ones, in order to rewrite JSON file
    const notes = [];

    // Make an HTTP request to the server to get the JSON file contents ~ regenerate old notes
    fetch("http://localhost:3000/")
        .then(response => response.json())
        .then(json => {
            json.forEach(element => {
                // Restore previously saved notes by recreating html divs
                const div = document.createElement('div');

                // Create two paragraphs, one for note content and one for date it has been added
                let p = document.createElement('p');
                let b = document.createElement('b');
                b.innerHTML = "Note: ";
                p.appendChild(b);
                p.appendChild(document.createTextNode(element.note))
                div.appendChild(p);

                p = document.createElement('p');
                b = document.createElement('b');
                b.innerHTML = "Date: ";
                p.appendChild(b);
                p.appendChild(document.createTextNode(element.date))
                div.appendChild(p);

                div.className = 'note';
                document.getElementById('notes').appendChild(div);
                notes.push(element);
            });
        });

    // DEBUGGING
    // console.log(notes);

    // Once the button has been clicked, save a new note to JSON file
    document.getElementById('noteBtn').addEventListener('click', () => {
        console.log("Saving a new note...");

        if (document.getElementById('newNote').value.length !== 0) {
            // Create new note object
            const note = {};
            note.note = document.getElementById('newNote').value;
            note.date = new Date().toLocaleString();

            // Clear textarea to prevent reading old input
            document.getElementById('newNote').value = "";
            notes.push(note);

            console.log(notes);

            // Store all notes to JSON file
            fetch("http://localhost:3000/", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                // 3rd argument keeps formatting, instead of printing all in one line
                body: JSON.stringify(notes, null, '\t')
            }).then(res => res.json())
                .then(res => console.log(res));
        }
    });
})();