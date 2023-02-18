import '../pages/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup} from "./modal";
import {createCard} from "./card";
import {initialCards} from "./constants";

export const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
}

export const initialList = document.querySelector('.elements');
export const initialTemplate = document.querySelector('#card').content;

const popupEditProfile = document.querySelector('#popup_edit-form');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const elementPopupEditForm = popupEditProfile.querySelector('.popup__form');
const nameInputPopupEditForm = elementPopupEditForm.querySelector('#popup__name');
const jobInputPopupEditForm = elementPopupEditForm.querySelector('#popup__caption');

const popupAddForm = document.querySelector('#popup_add-form');
const buttonClosePopupAddForm = popupAddForm.querySelector('.popup__close-button');
const formAddCard = popupAddForm.querySelector('.popup__form');
const nameCardInputPopupAddForm = popupAddForm.querySelector('#popup__name-card');
const linkInputPopupAddForm = popupAddForm.querySelector('#popup__link');

export const popupShowImage = document.querySelector('#popup_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');
export const imagePopupShowImage = popupShowImage.querySelector('.popup__image');
export const captionPopupShowImage = popupShowImage.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddForm = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__caption');

function editProfile (evt) {
    evt.preventDefault();
    const newNameProfile = nameInputPopupEditForm.value;
    const newJobProfile = jobInputPopupEditForm.value;

    nameProfile.textContent = newNameProfile;
    jobProfile.textContent = newJobProfile;

    closePopup(popupEditProfile);
}

initialCards.forEach(function (element) {
    const name = element.name;
    const link = element.link;
    const initialCardsElement = createCard(name, link);

    initialList.append(initialCardsElement);
})

buttonEditProfile.addEventListener('click', function(){
    nameInputPopupEditForm.value = nameProfile.textContent;
    jobInputPopupEditForm.value = jobProfile.textContent;
    openPopup(popupEditProfile);

})

buttonAddForm.addEventListener('click', function(){
    openPopup(popupAddForm);
})

buttonClosePopupEditProfile.addEventListener('click', function(){
    closePopup(popupEditProfile);
});

buttonClosePopupAddForm.addEventListener('click', function(){
    closePopup(popupAddForm);
})

buttonClosePopupShowImage.addEventListener('click', function(){
    closePopup(popupShowImage);
})

elementPopupEditForm.addEventListener('submit', editProfile);

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameCardInputPopupAddForm.value;
    const link = linkInputPopupAddForm.value;
    const cardsElement = createCard(name, link);

    initialList.prepend(cardsElement);
    formAddCard.reset ();

    closePopup(popupAddForm);
})
enableValidation(formSelectors);










