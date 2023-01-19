const initialList = document.querySelector('.elements');
const initialTemplate = document.querySelector('#card').content;
initialCards.forEach(function (element) {
    const initialCardsElement = initialTemplate.cloneNode(true);
    const initialCardsImage = initialCardsElement.querySelector('.element__image');

    initialCardsElement.querySelector('.element__text').textContent = element.name;
    initialCardsImage.src = element.link;
    initialCardsImage.alt = element.name;
    createCard(initialCardsElement);

    initialList.append(initialCardsElement);
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

const popupEditProfile = document.querySelector('#popup_edit-form');
const buttonEditProfile = document.querySelector('.profile__edit-button');

buttonEditProfile.addEventListener('click', function(){
    openPopup(popupEditProfile);
})

const popupAddForm = document.querySelector('#popup_add-form');
const buttonAddForm = document.querySelector('.profile__add-button');

buttonAddForm.addEventListener('click', function(){
    openPopup(popupAddForm);
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
buttonClosePopupEditProfile.addEventListener('click', function(){
    closePopup(popupEditProfile);
});

const buttonClosePopupAddForm = popupAddForm.querySelector('.popup__close-button');
buttonClosePopupAddForm.addEventListener('click', function(){
    closePopup(popupAddForm);
})

const popupShowImage = document.querySelector('#popup_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');

buttonClosePopupShowImage.addEventListener('click', function(){
    closePopup(popupShowImage);
})

const elementPopupEditForm = popupEditProfile.querySelector('.popup__form');
const nameInputPopupEditForm = elementPopupEditForm.querySelector('#popup__name');
const jobInputPopupEditForm = elementPopupEditForm.querySelector('#popup__caption');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__caption');
nameInputPopupEditForm.value = nameProfile.textContent;
jobInputPopupEditForm.value = jobProfile.textContent;

function editProfile (evt) {
    evt.preventDefault();
    const newNameProfile = nameInputPopupEditForm.value;
    const newJobProfile = jobInputPopupEditForm.value;
    nameProfile.textContent = newNameProfile;
    jobProfile.textContent = newJobProfile;

    closePopup(popupEditProfile);
}

elementPopupEditForm.addEventListener('submit', editProfile);


const imagePopupShowImage = popupShowImage.querySelector('.popup__image');
const captionPopupShowImage = popupShowImage.querySelector('.popup__caption');

function showImage(image,caption) {
     imagePopupShowImage.src = image.src;
     imagePopupShowImage.alt = caption.textContent;
     captionPopupShowImage.textContent = caption.textContent;
     openPopup(popupShowImage);
}

 function deleteCard(element) {
     const elementCard = element.target.parentElement;
     initialList.removeChild(elementCard);
}

  function likeCard(element) {
      element.classList.toggle('element__like-button_active');
}

function createCard(card) {
    const buttonLike = card.querySelector('.element__like-button');
    const buttonDelete = card.querySelector('.element__delete-button');
    const imageShow = card.querySelector('.element__image');
    const captionShow = card.querySelector('.element__text');
    buttonLike.addEventListener('click', function() {
        likeCard(buttonLike);
    });
    imageShow.addEventListener('click',function() {
        showImage(imageShow,captionShow);
    });
    buttonDelete.addEventListener('click',deleteCard)
}

const addFormElement = popupAddForm.querySelector('.popup__form');
const nameCardInputPopupAddForm = popupAddForm.querySelector('#popup__name-card');
const linkInputPopupAddForm = popupAddForm.querySelector('#popup__link');
addFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardElement = initialTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = nameCardInputPopupAddForm.value;
    cardElement.querySelector('.element__image').alt = nameCardInputPopupAddForm.value;
    cardElement.querySelector('.element__image').src = linkInputPopupAddForm.value;
    createCard(cardElement);

    initialList.prepend(cardElement);
    nameCardInputPopupAddForm.value = '';
    linkInputPopupAddForm.value = '';

    closePopup(popupAddForm);
})






