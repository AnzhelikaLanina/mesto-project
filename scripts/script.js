const initialList = document.querySelector('.elements');
const initialTemplate = document.querySelector('#card').content;
initialCards.forEach(function (element) {
    const name = element.name;
    const link = element.link;
    const initialCardsElement = createCard(name, link);

    initialList.append(initialCardsElement);
})

const popupEditProfile = document.querySelector('#popup_edit-form');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupAddForm = document.querySelector('#popup_add-form');
const buttonAddForm = document.querySelector('.profile__add-button');
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

buttonEditProfile.addEventListener('click', function(){
    nameInputPopupEditForm.value = nameProfile.textContent;
    jobInputPopupEditForm.value = jobProfile.textContent;
    openPopup(popupEditProfile);
})

buttonAddForm.addEventListener('click', function(){
    openPopup(popupAddForm);
})

const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const buttonClosePopupAddForm = popupAddForm.querySelector('.popup__close-button');
const popupShowImage = document.querySelector('#popup_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

buttonClosePopupEditProfile.addEventListener('click', function(){
    closePopup(popupEditProfile);
});

buttonClosePopupAddForm.addEventListener('click', function(){
    closePopup(popupAddForm);
})

buttonClosePopupShowImage.addEventListener('click', function(){
    closePopup(popupShowImage);
})

const elementPopupEditForm = popupEditProfile.querySelector('.popup__form');
const nameInputPopupEditForm = elementPopupEditForm.querySelector('#popup__name');
const jobInputPopupEditForm = elementPopupEditForm.querySelector('#popup__caption');
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

function createCard(name, link) {
    const initialCardsElement = initialTemplate.cloneNode(true);
    const initialCardsImage = initialCardsElement.querySelector('.element__image');
    const buttonLike = initialCardsElement.querySelector('.element__like-button');
    const buttonDelete = initialCardsElement.querySelector('.element__delete-button');
    const imageShow = initialCardsElement.querySelector('.element__image');
    const captionShow = initialCardsElement.querySelector('.element__text');

    initialCardsElement.querySelector('.element__text').textContent = name;
    initialCardsImage.src = link;
    initialCardsImage.alt = name;

    buttonLike.addEventListener('click', function() {
        likeCard(buttonLike);
    });
    imageShow.addEventListener('click',function() {
        showImage(imageShow,captionShow);
    });
    buttonDelete.addEventListener('click',deleteCard);

    return initialCardsElement;
}

const formAddCard = popupAddForm.querySelector('.popup__form');
const nameCardInputPopupAddForm = popupAddForm.querySelector('#popup__name-card');
const linkInputPopupAddForm = popupAddForm.querySelector('#popup__link');
formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameCardInputPopupAddForm.value;
    const link = linkInputPopupAddForm.value;
    const cardsElement = createCard(name, link);

    initialList.prepend(cardsElement);
    formAddCard.reset ();

    closePopup(popupAddForm);
})






