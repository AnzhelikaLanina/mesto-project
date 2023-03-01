import '../pages/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup} from "./modal";
import {createCard} from "./card";
import {settings} from "./constants";
import {getDataProfile, getInitialCards, updateDataProfile, updateDataProfileAvatar,addDataCard} from "./api";

export const initialList = document.querySelector('.elements');
export const initialTemplate = document.querySelector('#card').content;

const closeButtons = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('#popup_edit-form');
const formEditForm = document.forms['edit-form'];
const nameInputPopupEditForm = formEditForm.elements['name'];
const jobInputPopupEditForm = formEditForm.elements['caption'];
const buttonSubmitPopupEditForm = formEditForm.querySelector('.popup__submit-button');

const popupAddForm = document.querySelector('#popup_add-form');
const formAddCard = document.forms['add-form'];
const nameCardInputPopupAddForm = formAddCard.elements['name-card'];
const linkInputPopupAddForm = formAddCard.elements['link'];
const buttonSubmitPopupAddForm = formAddCard.querySelector('.popup__submit-button');

export const popupShowImage = document.querySelector('#popup_show-image');
export const imagePopupShowImage = popupShowImage.querySelector('.popup__image');
export const captionPopupShowImage = popupShowImage.querySelector('.popup__caption');

const popupUpdateAvatar = document.querySelector('#popup_update-avatar');
const formUpdateAvatar = document.forms['update-avatar-form'];
const linkAvatar = formUpdateAvatar.elements['link-avatar'];
const buttonSubmitPopupUpdateAvatar = formUpdateAvatar.querySelector('.popup__submit-button');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddForm = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__caption');
const avatarProfile = document.querySelector('.profile__avatar');
const buttonUpdateAvatar = document.querySelector('.profile__avatar-container');

function updateAvatarProfile(evt){
    evt.preventDefault();
    buttonSubmitPopupUpdateAvatar.textContent = 'Сохранение...';

    updateDataProfileAvatar(linkAvatar.value)
        .then((data) => {
            avatarProfile.src = data.avatar;
            closePopup(popupUpdateAvatar);
            formUpdateAvatar.reset ();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=> {
            buttonSubmitPopupUpdateAvatar.textContent = 'Сохранить';
        })
}

function editProfile (evt) {
    evt.preventDefault();

    buttonSubmitPopupEditForm.textContent = 'Сохранение...';

    updateDataProfile(nameInputPopupEditForm.value,jobInputPopupEditForm.value)
        .then((data) => {
            nameProfile.textContent = data.name;
            jobProfile.textContent = data.about;

            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSubmitPopupEditForm.textContent = 'Сохранить';
        })
}

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

buttonEditProfile.addEventListener('click', function( ){
    nameInputPopupEditForm.value = nameProfile.textContent;
    jobInputPopupEditForm.value = jobProfile.textContent;
    openPopup(popupEditProfile);
})

buttonAddForm.addEventListener('click', function(){
    openPopup(popupAddForm);
});

formEditForm.addEventListener('submit', editProfile);

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    buttonSubmitPopupAddForm.textContent = 'Сохранение...';

    addDataCard(nameCardInputPopupAddForm.value,linkInputPopupAddForm.value)
        .then((card) => {
            const userId = card.owner._id;
            const cardsElement = createCard(userId,card);

            initialList.prepend(cardsElement);
            formAddCard.reset ();

            closePopup(popupAddForm);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
        .finally(() => {
            buttonSubmitPopupAddForm.textContent = 'Сохранить';
        })
});

buttonUpdateAvatar.addEventListener('click',function(){
    openPopup(popupUpdateAvatar);
});

formUpdateAvatar.addEventListener('submit', updateAvatarProfile);

enableValidation(settings);

const promises = [getDataProfile(), getInitialCards()];
Promise.all(promises)
    .then(([data,cards]) => {
        const userId = data._id;
        nameProfile.textContent = data.name;
        jobProfile.textContent = data.about;
        avatarProfile.src = data.avatar;
        cards.forEach(function (card) {
            const initialCardsElement = createCard(userId,card);
            initialList.append(initialCardsElement);
        });
    })
    .catch((err) => {
        console.log(err);
        });









