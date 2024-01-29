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

    findDocumentCookies(code);

    console.log(`%c[SCAN] %cfinished scanning for cookie graber`, 'color: blue', 'color: inherit');

    showResults();
}
