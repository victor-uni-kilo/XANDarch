var submitTarget = document.getElementById('submit-update');

var submitProxy = document.getElementById('submit-update-proxy');
if (submitProxy != null ){
    submitProxy.addEventListener("click", () => {
        submitTarget.click();
    });   
}

