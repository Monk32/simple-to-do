const remove = document.querySelector(".remove");
const dateItem = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const timeItem = document.getElementById("time");
const addButton = document.querySelector(".add-button");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

let LIST,id;

// local storage

let data =  localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(item => {
        addItem(item.name, item.id, item.done, item.trash);
    });
}

remove.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

addButton.addEventListener("click", function(){
    const toDo = input.value;

        if(toDo) {
            addItem(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            // local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }

        input.value = "";
})

//date
const options = {weekday : "long", month: "short", day:"numeric"};
const today = new Date();
dateItem.innerHTML = today.toLocaleDateString("en-GB", options);
timeItem.innerHTML = today.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });

//fucntions


function addItem(toDo, id, done, trash) {
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;

    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fas ${DONE} completebut" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fas fa-trash-alt trashbut" job="delete" id="${id}"></i>
                </li>`



    const position = "beforeend";

    list.insertAdjacentHTML(position,item);

}


function done(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;


}

function del(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


//event listeners

document.addEventListener("keyup", function(event){
    if(event.key === 'Enter'){
        const toDo = input.value;

        if(toDo) {
            addItem(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            // local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }

        input.value = "";
    }
});

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob === "complete") {
        done(element);
    }else if(elementJob === "delete"){
        del(element);
    }
    // local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});