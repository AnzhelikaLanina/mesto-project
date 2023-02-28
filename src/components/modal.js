export function openPopup(popup) {
    document.addEventListener('keydown', handleEscape);
    popup.addEventListener('mousedown',handleOverlay);
    popup.classList.add('popup_opened');
}

export function closePopup(popup) {
    document.removeEventListener('keydown', handleEscape);
    popup.removeEventListener('mousedown', handleOverlay);
    popup.classList.remove('popup_opened');
}

function handleEscape (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleOverlay (evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}