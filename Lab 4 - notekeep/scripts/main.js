// import { addNote } from './addNote.js';
// import { showNotes } from './showNotes.js';
// import { deleteNote } from './deleteNote.js';

function addNote() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const tags = document.getElementById('tags').value.trim();

    //required
    if (!title || !content || !tags) {
        alert("Wprowadź tytuł, treść i tagi notatki!");
        return;
    }

    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const creationDate = new Date().toLocaleString();

    const note = {
        title,
        content,
        color,
        pin,
        tags,
        creationDate,
    };

    //Get existing notes
    const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];

    //Add note
    currentNotes.push(note);

    localStorage.setItem('notes', JSON.stringify(currentNotes));

    showNotes();
}

function showNotes() {
    const notesContainer = document.querySelector('.notesContainer');
    notesContainer.innerHTML = '';

    //Get notes
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    //Pin checked
    notes.forEach((note, index) => {
        if (note.pin) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note'); // Dodaj klasę 'note'
            noteDiv.style.backgroundColor = note.color;

            noteDiv.innerHTML =
                `<br><span class='notelabels' style='margin-top:10px'>✒️ Tytuł:${note.title}</span><br>
                   <span class='notelabels'>📜 Treść:</span><span class='notecontent'>${note.content}</span><br>
                   <span class='notelabels'>⚓ Tagi:</span>${note.tags}<br>
                   <span class='notelabels, notepin'>Notatka przypięta</span> <br>
                   <button onclick="deleteNote(${index})" class='buttondelete'>Usuń ❌</button><br>
                   🕓 Utworzono: <span class='notecontent'>${note.creationDate} </span>`;

            notesContainer.appendChild(noteDiv);

        }
    });

    //Pin not checked
    notes.forEach((note, index) => {
        if (!note.pin) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note'); // Dodaj klasę 'note'
            noteDiv.style.backgroundColor = note.color;

            noteDiv.innerHTML =
                `<br><span class='notelabels' style='margin-top:10px'>✒️ Tytuł:${note.title}</span><br>
            <span class='notelabels'>📜 Treść:</span><span class='notecontent'>${note.content}</span><br>
            <span class='notelabels'>⚓ Tagi:</span>${note.tags}<br><br>
            <button onclick="deleteNote(${index})" class='buttondelete'>Usuń ❌</button><br>
            🕓 Utworzono: <span class='notecontent'>${note.creationDate} </span>`;

            notesContainer.appendChild(noteDiv);
        }

    });
}

function deleteNote(index) {

    //Get existing notes
    const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];

    //Delete note using it's index
    currentNotes.splice(index, 1);

    //Save changes in array
    localStorage.setItem('notes', JSON.stringify(currentNotes));

    showNotes();
}

//Initial display
showNotes();