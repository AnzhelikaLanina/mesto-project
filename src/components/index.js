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

export const popupDeleteCard = document.querySelector('#popup_delete-card');
export const buttonDeleteCard = popupDeleteCard.querySelector('.popup__submit-button');

function updateAvatarProfile(evt){
    evt.preventDefault();

    avatarProfile.src = linkAvatar.value;
    buttonSubmitPopupUpdateAvatar.textContent = 'Сохранение...';

    updateDataProfileAvatar(avatarProfile.src)
        .then((data) => {
            data.avatar = avatarProfile.src;
            closePopup(popupUpdateAvatar);
            formUpdateAvatar.reset ();
        })
        .catch((err) => {
            console.log(err);
        });
}

function editProfile (evt) {
    evt.preventDefault();

    const newNameProfile = nameInputPopupEditForm.value;
    const newJobProfile = jobInputPopupEditForm.value;

    buttonSubmitPopupEditForm.textContent = 'Сохранение...';
    nameProfile.textContent = newNameProfile;
    jobProfile.textContent = newJobProfile;

    updateDataProfile(nameProfile.textContent,jobProfile.textContent)
        .then((data) => {
            data.name = nameProfile.textContent;
            data.about = jobProfile.textContent;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log(err);
        });
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

    const name = nameCardInputPopupAddForm.value;
    const link = linkInputPopupAddForm.value;
    buttonSubmitPopupAddForm.textContent = 'Сохранение...';

    addDataCard(name,link)
        .then((card) => {
            const userId = card.owner._id;
            const cardsElement = createCard(userId,card);

            initialList.prepend(cardsElement);
            formAddCard.reset ();

            closePopup(popupAddForm);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
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









