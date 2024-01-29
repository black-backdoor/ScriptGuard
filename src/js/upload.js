/*
    Responsible for handling the upload of a file or text
    and calling the main function to scan the code
*/

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('text-submit').addEventListener('click', function () {
        const textInput = document.getElementById('text-input');
        const code = textInput.value;

        hideUploadForm();
        main(code);
        showResults();
    });

    document.getElementById('file-submit').addEventListener('click', function () {
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];

        // check if file is selected
        if (file) {
            // convert file to text
            const reader = new FileReader();

            reader.onload = function (event) {
                const fileContent = event.target.result;

                hideUploadForm();
                main(fileContent);
                showResults();
            };

            reader.readAsText(file);
        } else {
            alert('Please select a file.');
        }
        
    });

    // if the user uploaded a file show the code when pressed on the button
    document.getElementById('file-input').addEventListener("change", function () {
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];

        // check if file is selected
        if (file) {
            // convert file to text
            const reader = new FileReader();

            reader.onload = function (event) {
                const fileContent = event.target.result;

                document.getElementById('file-show').addEventListener("click", function () {
                    showCodePopup("File Code", fileContent);
                });
            };

            reader.readAsText(file);
        } else {
            alert('Please select a file.');
        }
    });

    /* NOT WORKING BECAUSE OF CORS
    // get the url from the input and get the code
    document.getElementById('url-show').addEventListener('click', function () {
        getURL(document.getElementById('url-input').value);
    });
    */
});

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

/* NOT WORKING BECAUSE OF CORS
function getURL(url) {
    fetch(url)
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textContent = doc.body.textContent;

        // Display the text content
        var code = textContent;
        console.log(code);
    })
    .catch(error => console.error('Error fetching website:', error));
}
*/

function showResults() {
    // add loading animation
    
    const results = document.getElementById("results");
    results.style.display = "block";
}


