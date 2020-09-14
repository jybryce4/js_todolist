// select elements
const clear = document.querySelector(".clear"); // clear button, top-right
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const btn = document.querySelector(".btn");

// class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "line-through";

// today's date
const options = {weekday : "long", month : "long", day : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// needed variables
let LIST, id;

// get data from local storage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data); // read the data into LIST
    id = LIST.length; // set id to last one in LIST
    loadList(LIST); // load LIST to UI
} else { // data is empty so initialize variables
    LIST = [];
    id = 0;
}

// load the list into the UI
function loadList(array) {
    array.forEach(entry => {
        addToDo(entry.name, entry.id, entry.done, entry.trash);
    });
};

// clear local storage
clear.addEventListener("click", event => {
    localStorage.clear();
    location.reload();
});

// add to-do's
function addToDo(toDo, id, done, trash) {
    if (trash) { return; } // do not add if trashed

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const entry = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;

    // insert entry at the bottom
    const position = "beforeend";
    list.insertAdjacentHTML(position, entry);
}

// add entry to the list when the user clicks the + icon
btn.addEventListener("click", event => {
    const toDo = input.value;

    // if input field isn't empty
    if (toDo) {
        addToDo(toDo, id, false, false);

        // store entry in LIST
        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });

        // add entry to localStorage
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++; // increment id
    }
    input.value = "";
});

// add entry to the list when the user presses enter
document.addEventListener("keyup", event => {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if input field isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            // store entry in LIST
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add entry to localStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++; // increment id
        }
        input.value = "";
    } 
});

// check off to-do entry
function completeToDo(entry) {
    entry.classList.toggle(CHECK);
    entry.classList.toggle(UNCHECK);
    entry.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[entry.id].done = LIST[entry.id].done ? false : true;
}

// delete entry
function removeToDo(entry) {
    entry.parentNode.parentNode.removeChild(entry.parentNode);
    LIST[entry.id].trash = true;
};

// target entries created dynamically
list.addEventListener("click", event => {
    const entry = event.target; // return the clicked entry
    const entryJob = entry.attributes.job.value; // complete or delete
    if (entryJob == "complete") {
        completeToDo(entry);
    } else if (entryJob == "delete") {
        removeToDo(entry);
    }

    // update localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

