function findDocumentCookies(code) {
    if(typeof code !== "string") {
        throw Error ("Code is not a String", typeof code);
    }
    
    // Split the code into lines
    const lines = code.split('\n');

    if (code.includes("document.cookie")) {
        console.warn(`%c[RESULT] %cpotential %cdocument.cookie %cfound in code`, 'color: blue', 'color: inherit', 'color: red', 'color: inherit');
    }

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if the line sets a variable equal to document
        if (!line.includes('//') && line.includes('document.cookie')) {
            // the !line.includes('//') is to prevent false positives from commented out code
            console.warn(`%c[RESULT] %cdocument.cookie %cfound line ${i + 1}`, 'color: blue', 'color: red', 'color: inherit');
        }
    }
}
