import {closePopup, openPopup} from "./modal";
import {
    initialTemplate,
    imagePopupShowImage,
    captionPopupShowImage,
    popupShowImage,
    popupDeleteCard,
    buttonDeleteCard
} from "./index";
import {deleteDataCard, deleteLike, putLike} from './api.js'

function toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

function showImage(image,caption) {
    imagePopupShowImage.src = image.src;
    imagePopupShowImage.alt = caption.textContent;
    captionPopupShowImage.textContent = caption.textContent;

    openPopup(popupShowImage);
}

export function createCard(userId,card) {
    const initialCardsElement = initialTemplate.cloneNode(true);
    const initialCardsImage = initialCardsElement.querySelector('.element__image');
    const buttonLike = initialCardsElement.querySelector('.element__like-button');
    const buttonDelete = initialCardsElement.querySelector('.element__delete-button');
    const captionShow = initialCardsElement.querySelector('.element__text');
    const countLikes = initialCardsElement.querySelector(".element__count");

    initialCardsElement.querySelector('.element__text').textContent = card.name;
    initialCardsImage.src = card.link;
    initialCardsImage.alt = card.name;
    countLikes.textContent = card.likes.length;

    if(card.likes.some(like => like._id === userId)){
        buttonLike.classList.add('element__like-button_active');
    }

    buttonLike.addEventListener('click', (evt) => {
        const cardIsLiked = evt.target.classList.contains("element__like-button_active");
        if (cardIsLiked) {
            deleteLike(card._id)
                .then((data) => {
                    toggleLike(evt);
                    countLikes.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            putLike(card._id)
                .then((data) => {
                    toggleLike(evt);
                    countLikes.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    initialCardsImage.addEventListener('click', function () {
        showImage(initialCardsImage, captionShow);
    });

    if(userId !== card.owner._id) {
        buttonDelete.remove();
    } else{
        buttonDelete.addEventListener('click', function (evt) {
            const cardDelete = evt.target.closest('.element');
            openPopup(popupDeleteCard);
            buttonDeleteCard.addEventListener('click', function () {
                deleteDataCard(card._id)
                    .then(() => {
                        cardDelete.remove();
                        closePopup(popupDeleteCard);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    }
    return initialCardsElement;
}