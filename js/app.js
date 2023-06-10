console.log('welcome to nodes app');
showNotes();//after the reload it shows the all notes which we add

//if user adds a note, add it to the localstorge
let addbtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);//second note add
    localStorage.setItem("notes", JSON.stringify(notesObj));//update localstorage
    addTxt.value = "";
    // console.log(notesObj)

    showNotes();
})

//function to show elements from localstorage (read and show)
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";//blank string
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
             <p class="card-text">${element}</p>  
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

        //if the length is not zero then shows the innertext
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `nothing to show! use "add a note" section above to add notes.`;
    }

}

//function to delete a note
function deleteNote(index) {         //index of array which we want to delete
    // console.log('i am deleting',index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];   //show the blank string
    }
    else {
        notesObj = JSON.parse(notes);
    }


    notesObj.splice(index, 1); //1st argu leta hai(starting index) aur 1 element remove kar dega
    localStorage.setItem("notes", JSON.stringify(notesObj));//update localstorage
    showNotes();//show the notes

}

let search = document.getElementById('searchTxt'); //search input tag
search.addEventListener("input", function ()  //event listner apply
{
    let inputVal = search.value.toLowerCase();  //search value ko inputVal me le liya
    // console.log('input event fire!', inputVal);  //jab jab input daloge tab tab event fire hoga and lock the input val
    let noteCards = document.getElementsByClassName('noteCard')   //element with noteCard class so make one variable
    Array.from(noteCards).forEach(function (element) {  //sare cards ka content cardtxt me save kar do
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //get paragraph of notecards text
        if (cardTxt.includes(inputVal)) {  //current element ke style of display ko none ya block kar do
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
        // console.log(cardTxt)
    })
})

/*further features:

1.Add Title
2.Mark a Note As An Important
3.Separate notes by user
4.Sync and host to a web server

*/