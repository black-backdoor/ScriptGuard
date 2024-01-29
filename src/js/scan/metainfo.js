function extractUserScriptMetaDataBlock(code) {
    // extract the metadata block from the file content

    /* TEXT FROM
    // ==UserScript==
        to
    // ==/UserScript==
    */

    const regex = /\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/g;
    const matches = regex.exec(code);
  
    if (matches && matches[1]) {
        return matches[1].trim();
    }

    return null;
}

function parseMetaDataBlock(metaString) {
    // parse the Data from the UserScript MetaBlock
    // into an object containing all metadata

    if (typeof metaString !== 'string') return null;
    if (metaString === '') return null;

    var meta = {};  // object containing the metadata

    var metaArray = metaString.split('\n');
    metaArray.forEach(function (m) {
        var parts = m.match(/@([\w-]+)\s+(.+)/);
        if (parts) {
            meta[parts[1]] = meta[parts[1]] || [];
            meta[parts[1]].push(parts[2]);
        }
    });

    return meta;
}



// ------------------------ SHOW METAINFO ------------------------

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

// ------------------------ SHOW METADATA AS CODE ------------------------

function displayMetaBlock(metaDataBlock) {
    // display the metadata (the complete block)
    const codeObject = document.getElementById("metaDataBlock-code");
    codeObject.innerText = metaDataBlock;
}


// ------------------------ SHOW UPDATE LINKS ------------------------

function displayUpdateLinks(metaObject) {
    const links = document.getElementById("updatelink");

    // remove items in list
    links.innerHTML = "";


    var updateURLs = metaObject?.updateURL || [];
    var downloadURLs = metaObject?.downloadURL || [];
    var URLS =  updateURLs.concat(downloadURLs);

    // remove duplicates
    URLS = [...new Set(URLS)];

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