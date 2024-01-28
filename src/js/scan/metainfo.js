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