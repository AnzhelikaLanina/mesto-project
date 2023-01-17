const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const initialList = document.querySelector('.elements');
const initialTemplate = document.querySelector('#card').content;
initialCards.forEach(function (element) {
    const initialCardsElement = initialTemplate.cloneNode(true);

    initialCardsElement.querySelector('.element__text').textContent = element.name;
    initialCardsElement.querySelector('.element__image').src = element.link;
    initialCardsElement.querySelector('.element__image').alt = element.name;

    initialList.append(initialCardsElement);
})

const editPopup = document.querySelector('#popup_edit-form');
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function(){
     editPopup.classList.add('popup_opened');
});

const addPopup = document.querySelector('#popup_add-form');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', function(){
     addPopup.classList.add('popup_opened');
});

function closePopup() {
    if (editPopup.classList.contains('popup_opened') === true) {
        editPopup.classList.remove('popup_opened');
    } else if(addPopup.classList.contains('popup_opened') === true) {
        addPopup.classList.remove('popup_opened');
    } else if (showImagePopup.classList.contains('popup_opened') === true) {
        showImagePopup.classList.remove('popup_opened');
    }
}

const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(function (element) {
      element.addEventListener('click', closePopup);
});

function likeElement(element) {
    element.addEventListener('click', function () {
        element.classList.toggle('element__like-button_active');
    })
}

const likeButtons = document.querySelectorAll('.element__like-button');
likeButtons.forEach(likeElement);

const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('#popup__name');
const jobInput = editPopup.querySelector('#popup__caption');
const nameEdit = document.querySelector('.profile__name');
const jobEdit = document.querySelector('.profile__caption');

function editProfile (evt) {
    evt.preventDefault();
    const newNameProfile = nameInput.value;
    const newJobProfile = jobInput.value;
    nameEdit.textContent = newNameProfile;
    jobEdit.textContent = newJobProfile;

    closePopup();
}

editFormElement.addEventListener('submit', editProfile);
const addFormElement = addPopup.querySelector('.popup__form');

function addCards(evt, nameElementValue, linkValue) {
    evt.preventDefault();

    const cardElement = initialTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = nameElementValue;
    cardElement.querySelector('.element__image').alt = nameElementValue;
    cardElement.querySelector('.element__image').src = linkValue;

    const likeButtons = cardElement.querySelectorAll('.element__like-button');
    likeButtons.forEach(likeElement);

    const imagesShown = cardElement.querySelectorAll('.element__image');
    imagesShown.forEach(showImage);

    const deleteButtons = cardElement.querySelectorAll('.element__delete-button');
    deleteButtons.forEach(deleteElement);

    initialList.prepend(cardElement);

}
addFormElement.addEventListener('submit', function (evt) {
    const nameElementInput = addPopup.querySelector('#popup__name-card');
    const linkInput = addPopup.querySelector('#popup__link');
    addCards(evt, nameElementInput.value, linkInput.value);
    nameElementInput.value = '';
    linkInput.value = '';

    closePopup();

})

const showImagePopup = document.querySelector('#popup_show-image');
const imagePopup = showImagePopup.querySelector('.popup__image');
const captionPopup = showImagePopup.querySelector('.popup__caption');


function showImage(element) {
    element.addEventListener('click', function (evt) {
        const imageShown = evt.target;
        const imageCaption = imageShown.nextElementSibling;
        imagePopup.src = imageShown.src;
        captionPopup.textContent = imageCaption.textContent;
        showImagePopup.classList.add('popup_opened');
    })
}

const showImageButtons = initialList.querySelectorAll('.element__image');
showImageButtons.forEach(showImage);

function deleteElement(element) {
    element.addEventListener('click', function (evt) {
        const element = evt.target.parentElement;
        initialList.removeChild(element);
    })
}

const deleteButtons = initialList.querySelectorAll('.element__delete-button');
deleteButtons.forEach(deleteElement);




