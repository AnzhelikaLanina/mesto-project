export function openPopup(popup) {
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('mousedown', keyHandlerOverlay);
    popup.classList.add('popup_opened');
}

export function closePopup(popup) {
    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('mousedown', keyHandlerOverlay);
    popup.classList.remove('popup_opened');
}

function keyHandler (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function keyHandlerOverlay (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target === openedPopup) {
        closePopup(openedPopup);
    }
}