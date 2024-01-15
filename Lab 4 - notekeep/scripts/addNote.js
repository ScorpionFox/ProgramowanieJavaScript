// export function addNote() {
//     const title = document.getElementById('title').value.trim();
//     const content = document.getElementById('content').value.trim();
//     const tags = document.getElementById('tags').value.trim();

//     //required
//     if (!title || !content || !tags) {
//         alert("Wprowadź tytuł, treść i tagi notatki!");
//         return;
//     }

//     const color = document.getElementById('color').value;
//     const pin = document.getElementById('pin').checked;
//     const creationDate = new Date().toLocaleString();

//     const note = {
//         title,
//         content,
//         color,
//         pin,
//         tags,
//         creationDate,
//     };

//     //Get existing notes
//     const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];

//     //Add note
//     currentNotes.push(note);

//     localStorage.setItem('notes', JSON.stringify(currentNotes));

//     showNotes();
// }