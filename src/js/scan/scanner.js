function main(code) {
    if(typeof code != "string") {
        throw Error ("Code is not a String", typeof code);
    }

    console.info("CODE:", code);
    
    console.log(`%c[SCAN] %cstarting scan`, 'color: blue', 'color: inherit');
    
    // extract & parse the metadata
    const metaDataBlock = extractUserScriptMetaDataBlock(code);
    const metaObject = parseMetaDataBlock(metaDataBlock);

    if(metaDataBlock == null) {
        throw Error("The Script provided may not be valid");
    }

    console.log(`%c[SCAN] %cfinished metadata scan`, 'color: blue', 'color: inherit');

    // DISPLAY metadata
    displayMetaBlock(metaDataBlock);
    displayMetaData(metaObject);
    displayUpdateLinks(metaObject);

    console.log(`%c[SCAN] %cfinished displaying metadata scan`, 'color: blue', 'color: inherit');


    displayAntifeatures(metaObject.antifeature);
    console.log("metaObject", metaObject);

    console.log(`%c[SCAN] %cfinished displaying antifeatures`, 'color: blue', 'color: inherit');

    showResults();
}



// ------------------------ METAINFO ------------------------

function displayMetaData(metaObject) {
    // display the metadata (certian parts)
    const scriptName = metaObject?.name?.[0] || undefined;
    const scriptVersion = metaObject?.version?.[0] || undefined;
    const scriptDescription = metaObject?.description?.[0] || undefined;
    const scriptAuthor = metaObject?.author?.[0] || undefined;
    const updateURL = metaObject?.updateURL?.[0] || metaObject?.downloadURL?.[0] || undefined;    
    
    document.getElementById("script-name").textContent = scriptName;
    document.getElementById("script-version").textContent = scriptVersion;
    document.getElementById("script-description").textContent = scriptDescription;
    document.getElementById("script-author").textContent = scriptAuthor;
    document.getElementById("script-updateURL").textContent = updateURL;

}

function displayMetaBlock(metaDataBlock) {
    // display the metadata (the complete block)
    const codeObject = document.getElementById("metaDataBlock-code");
    codeObject.innerText = metaDataBlock;
}


function displayUpdateLinks(metaObject) {
    const links = document.getElementById("updatelink");

    // remove items in list
    links.innerHTML = "";


    var updateURLs = metaObject?.updateURL || [];
    var downloadURLs = metaObject?.downloadURL || [];
    var URLS =  updateURLs.concat(downloadURLs);

    console.log("URLS", URLS);

    URLS.forEach(URL => {
        // create element
        var newItem = document.createElement("li");

        // set elment content
        newItem.textContent = URL;

        // add element
        links.appendChild(newItem);
    });    
}
