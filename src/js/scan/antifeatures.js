function displayAntifeatures(antifeatures) {
    const list = document.getElementById("antifeatures-list");

    // remove items in list
    list.innerHTML = "";

    console.log("antifeatures", antifeatures);

    antifeatures.forEach(antifeature => {
        // lookup antifeature in /data/antifeatures.json
        // get description if found and add to list
        antifeatureAddElement(list, "ads", "The script inserts advertisements on pages the user visits");
    });
}


function antifeatureAddElement(list, name, description) {
    list.innerHTML = list.innerHTML + `

    <li>
        ${name}
        <div class="description-container">
            <img src="/assets/icons/info.svg" alt="Info">
            <div class="message-block">
                <p>${description}</p>
            </div>
        </div>
    </li>
    `;
}