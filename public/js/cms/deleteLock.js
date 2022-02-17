//Toggles the "DELETE PROJECT"
let unlockToggle = document.querySelectorAll('.unlock-toggle');
unlockToggle.forEach( element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        let relatedContainer = element.previousElementSibling;
        let relatedButton = relatedContainer.firstElementChild;
        if (relatedButton.hasAttribute("disabled")) {
            relatedButton.removeAttribute("disabled");
            relatedButton.classList.add("btn-danger");
            relatedButton.classList.remove("btn-disabled");
        } else {
            relatedButton.setAttribute("disabled", true);
            relatedButton.classList.remove("btn-danger");
            relatedButton.classList.add("btn-disabled");
        }
    });
});
//Toggles the "MARK FOR DELETION"
let markForDeletion = document.getElementById('mark-delete');
markForDeletion.addEventListener('click', (e) => {
    e.preventDefault();
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach( element => {
        if (element.hasAttribute("disabled")) {
            element.removeAttribute("disabled");
        } else {
            element.setAttribute("disabled", true);
        }
    })
});
//Toggles the "CHANGE COVER"
let setCover = document.getElementById('set-cover');
setCover.addEventListener('click', (e) => {
    e.preventDefault();
    let radio = document.querySelectorAll('.radio');
    radio.forEach( element => {
        if (element.hasAttribute("disabled")) {
            element.removeAttribute("disabled");
        } else {
            element.setAttribute("disabled", true);
        }
    })
});