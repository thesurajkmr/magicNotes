console.log("Welcome to Magic Notes App");
showNotes();

// if user adds text, add it to the local storage

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addText");
  if (addTxt.value.length == 0) {
    alert("Empty note can't be added");
    return;
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  notes.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notes));
  addTxt.value = "";
  //   console.log("notes added");
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  //   console.log(notes);
  if (notes == null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  let html = "";
  notes.forEach(function (element, index) {
    html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            </div>
        </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notes.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "Nothing to show";
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  //   console.log(notes);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  let inputVal = search.value.toLowerCase();
  // console.log("input event fired",inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  console.log(noteCards);
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
