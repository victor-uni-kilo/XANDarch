
var inputTag = document.getElementById('image-input');

var uploadButton = document.getElementById('upload-btn');
uploadButton.addEventListener("click", () => {
    inputTag.click();
});

var inputFiles = inputTag.files;

const renderElements = () => {
    const files = Array.from(inputFiles);
    let container = document.createElement('div');
    container.setAttribute('id', 'pre-upload');
    document.getElementById('upload-container').appendChild(container); 
    
    files.forEach((item) => {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('class', 'preview-image');
        imgElement.setAttribute('height', '100px');
        imgElement.src = URL.createObjectURL(item);
        document.getElementById('pre-upload').appendChild(imgElement);
    });
};
//REFRESH CASE
renderElements();

//REAL-TIME CASE
const previewImage = (e) => {
    e.preventDefault();
    let existContainer = document.getElementById('pre-upload');
    if (existContainer != null) {
       while (existContainer.firstChild) {
          existContainer.removeChild(existContainer.lastChild);
       }
       existContainer.remove();
    };
    renderElements();
 };