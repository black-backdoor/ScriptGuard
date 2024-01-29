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


function showResults() {
    // add loading animation
    return;

    const results = document.getElementById("results");
    results.style.display = "block";
}
