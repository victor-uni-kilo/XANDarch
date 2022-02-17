//show
let preDeleteBtns = document.querySelectorAll('.pre-delete-btn');
preDeleteBtns.forEach( element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        let relatedDiv = element.nextElementSibling;
            relatedDiv.removeAttribute("hidden");
            element.setAttribute("hidden", "true");
    });
});
//hide
let cancelDelete = document.querySelectorAll('.cancel-delete');
cancelDelete.forEach( element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        let relatedDiv = element.parentElement.previousElementSibling;
            relatedDiv.removeAttribute("hidden");
            element.parentElement.setAttribute("hidden", "true");
    });
});

