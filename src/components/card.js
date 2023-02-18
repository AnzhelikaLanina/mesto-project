import {openPopup} from "./modal";
import {initialList, initialTemplate, imagePopupShowImage, captionPopupShowImage, popupShowImage} from "./index";

function deleteCard(element) {
    const elementCard = element.target.parentElement;
    initialList.removeChild(elementCard);
}

function toggleLike(element) {
    element.classList.toggle('element__like-button_active');
}

function showImage(image,caption) {
    imagePopupShowImage.src = image.src;
    imagePopupShowImage.alt = caption.textContent;
    captionPopupShowImage.textContent = caption.textContent;

    openPopup(popupShowImage);
}

export function createCard(name, link) {
    const initialCardsElement = initialTemplate.cloneNode(true);
    const initialCardsImage = initialCardsElement.querySelector('.element__image');
    const buttonLike = initialCardsElement.querySelector('.element__like-button');
    const buttonDelete = initialCardsElement.querySelector('.element__delete-button');
    const captionShow = initialCardsElement.querySelector('.element__text');

    initialCardsElement.querySelector('.element__text').textContent = name;
    initialCardsImage.src = link;
    initialCardsImage.alt = name;

    buttonLike.addEventListener('click', function() {
        toggleLike(buttonLike);
    });
    initialCardsImage.addEventListener('click',function() {
        showImage(initialCardsImage,captionShow);
    });
    buttonDelete.addEventListener('click',deleteCard);

    return initialCardsElement;
}