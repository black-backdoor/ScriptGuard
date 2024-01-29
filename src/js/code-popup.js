function showCodePopup(title, code) {
    var popupElement = document.getElementById("popup-holder");
    var codeElement = document.getElementById("code-popup-code");
    var titleElement = document.getElementById("code-popup-title");

    popupElement.style.display = "flex";
    titleElement.innerText = title;
    codeElement.innerText = code;


}

function hideCodePopup() {
    var popup = document.getElementById("popup-holder");
    popup.style.display = "none";
}


document.addEventListener('DOMContentLoaded', function () {
    /* CLOSE POPUP ON CLICK OUTSIDE */
    var popupHolder = document.getElementById("popup-holder");
    const popupElement = document.getElementById('code-popup');

    popupHolder.addEventListener('click', closePopupOnClickOutside);

    function closePopupOnClickOutside(event) {
        // `!popup.contains(event.target)`: This part checks if the click event did not occur inside the popup element.
        // In this context, it checks if the element that triggered the click event (`event.target`) is not a descendant of the popup element.

        // `event.target !== popup`: This part checks if the element that triggered the click event is not the popup element itself.
        // This is necessary because the popup element is a descendant of the popup element, so the first part of the condition would always be true if we didn't have this part.
        if (!popupElement.contains(event.target) && event.target !== popupElement) {
            hideCodePopup();
            document.removeEventListener('click', closePopupOnClickOutside);
        }
    }
});