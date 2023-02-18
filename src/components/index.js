import '../pages/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup} from "./modal";
import {createCard} from "./card";
import {initialCards, settings} from "./constants";

export const initialList = document.querySelector('.elements');
export const initialTemplate = document.querySelector('#card').content;

const popupEditProfile = document.querySelector('#popup_edit-form');
const formEditForm = document.forms['edit-form'];
const nameInputPopupEditForm = formEditForm.elements['name'];
const jobInputPopupEditForm = formEditForm.elements['caption'];

const popupAddForm = document.querySelector('#popup_add-form');
const formAddCard = document.forms['add-form'];
const nameCardInputPopupAddForm = formAddCard.elements['name-card'];
const linkInputPopupAddForm = formAddCard.elements['link'];

export const popupShowImage = document.querySelector('#popup_show-image');
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

buttonEditProfile.addEventListener('click', function( ){
    nameInputPopupEditForm.value = nameProfile.textContent;
    jobInputPopupEditForm.value = jobProfile.textContent;
    openPopup(popupEditProfile);

})

buttonAddForm.addEventListener('click', function(){
    openPopup(popupAddForm);
})

const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

formEditForm.addEventListener('submit', editProfile);

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameCardInputPopupAddForm.value;
    const link = linkInputPopupAddForm.value;
    const cardsElement = createCard(name, link);

    initialList.prepend(cardsElement);
    formAddCard.reset ();

    closePopup(popupAddForm);
})

enableValidation(settings);










