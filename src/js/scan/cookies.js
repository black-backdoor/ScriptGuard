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


function findCookies(code) {
    if(typeof code !== "string") {
        throw Error ("Code is not a String", typeof code);
    }
    
    // Split the code into lines
    const lines = code.split('\n');

    if (code.includes(".cookie")) {
        console.warn(`%c[RESULT] %cpotential %c.cookie %cfound in code`, 'color: blue', 'color: inherit', 'color: red', 'color: inherit');
    }

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line.includes('//') && line.includes('.cookie')) {
            console.warn(`%c[RESULT] %c.cookie %cfound line ${i + 1}`, 'color: blue', 'color: red', 'color: inherit');
        }
    }
}

/* 

TODO:
check if variable is declared to a different value

var a = document;
var b = a;
console.log(b.cookie);


TEST CODE:

const o=document;
var r=o;
var a=r.head;
var i=r.body;
var i=r.cookie;
var s=i.split("=")[1].split(";")[0];

*/


// detect if a varible gets document assigned
function monitorDocumentAssignments(code) {
    // Split the code into lines
    const lines = code.split('\n');

    var findings = [];

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if the line sets a variable equal to document
        if (line.includes('=') && line.includes('document')) {
            console.log(`Variable assigned to document found at line ${i + 1}: ${line}`);
            findings.push(line);
        }
    }

    return findings;
}


function monitorVariableAssignments(code, variableName) {
    // Split the code into lines
    const lines = code.split('\n');

    var findings = [];

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if the line sets a variable equal to document
        if (line.includes('=') && line.includes(variableName)) {
            console.log(`Variable assigned to ${variableName} found at line ${i + 1}: ${line}`);
            findings.push(line);
        }
    }

    return findings;
}


// gets the variable name of a variable that gets document assigned
function extractVariableName(inputString) {
    // Regular expression to match variable declarations like "const/let/var <variableName> = document;"
    const regex = /\b(const|let|var)\s+(\w+)\s*=\s*document\s*;/;

    // Use the regex to match the input string
    const match = inputString.match(regex);

    // Check if there is a match and return the variable name (group 2 in the regex)
    if (match && match[2]) {
        return match[2];
    } else {
        return null; // Return null if no match is found
    }
}


// searches if {variableName}.cookies is in the text
function scanTextForCookiesWarning(text, variableName) {
    // Create a dynamic regular expression using the provided variable name
    const regex = new RegExp(`${variableName}\\.cookie`, 'g');

    // Check for matches
    const matches = text.match(regex);

    // Display warning if matches are found
    if (matches && matches.length > 0) {
        console.warn(`Warning: Found instances of {${variableName}}.cookies in the text.`, matches);
        return matches;
    } else {
        console.log(`No instances of ${variableName}.cookie found in the text.`);
        return null
    }
}

/* SCAN CODE */
/*

var assigned = monitorDocumentAssignments(code);
assigned.forEach((line) => {
    var name = extractVariableName(line);
    if (name) {
        scanTextForCookiesWarning(code, name);
    }
});

*/

