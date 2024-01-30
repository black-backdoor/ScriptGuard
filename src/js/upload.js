/*
    Responsible for handling the upload of a file or text
    and calling the main function to scan the code
*/


// process code that was entered in the text area
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('text-submit').addEventListener('click', function () {
        const textInput = document.getElementById('text-input');
        const code = textInput.value;

        hideUploadForm();
        main(code);
        showResults();
    });
});


// handle code that was entered via file upload
document.addEventListener('DOMContentLoaded', function () {
    // if the user uploaded a file process it when pressed on the button
    document.getElementById('file-submit').addEventListener('click', function () {
        const fileInput = document.getElementById('file-input');
        const files = fileInput.files;

        manageFile(files, function (fileContent) {
            hideUploadForm();
            main(fileContent);
            showResults();
        });

    });

    // if the user uploaded a file show the code when pressed on the button
    document.getElementById('file-input').addEventListener("change", function () {
        const fileInput = document.getElementById('file-input');
        const files = fileInput.files;

        manageFile(files, function (fileContent) {
            document.getElementById('file-show').addEventListener("click", function () {
                showCodePopup("File Code", fileContent);
            });
        });
    });
});


// handle code that was entered via drag and drop
document.addEventListener("DOMContentLoaded", function () {
    const overlayMenu = document.getElementById('drop-file');

    // display the (drop file here) menu on dragover
    window.addEventListener('dragover', function (e) {
        // set tab to to the file menu
        const radioButton = document.getElementById("tab2");
        radioButton.checked = true;

        e.preventDefault();
        overlayMenu.style.display = 'flex';
    });

    // hide the (drop file here) menu on dragleave
    window.addEventListener('dragleave', function () {
        overlayMenu.style.display = 'none';
    });

    // process file on drop
    window.addEventListener('drop', function (e) {
        e.preventDefault();
        console.log('Files dropped:', e.dataTransfer.files);
        const files = e.dataTransfer.files;

        // call the manageFile function to process the file
        manageFile(files, function (fileContent) {
            hideUploadForm();
            main(fileContent);
            showResults();
        });

        overlayMenu.style.display = 'none';
    });
});

function manageFile(files, callback) {
    const file = files[0];

    // check if file is selected
    if (file) {
        // convert file to text
        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;

            // call the callback function if it exists
            callback(fileContent);
        };

        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}



// manage urls
document.addEventListener('DOMContentLoaded', function () {
    /* NOT WORKING BECAUSE OF CORS
    // get the url from the input and get the code
    document.getElementById('url-show').addEventListener('click', function () {
        getURL(document.getElementById('url-input').value);
    });
    */
});


/* NOT WORKING BECAUSE OF CORS
function getURL(url) {
    fetch(url)
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textContent = doc.body.textContent;

        // Display the text content
        const code = textContent;
        console.log(code);
    })
    .catch(error => console.error('Error fetching website:', error));
}
*/



function hideUploadForm() {
    try {
        // get the upload form and hide it
        const uploadForm = document.getElementById("input");
        uploadForm.style.display = "none";
    }
    catch (error) {
        console.log(error);
    }
}

function showResults() {
    // add loading animation

    const results = document.getElementById("results");
    results.style.display = "block";
}




