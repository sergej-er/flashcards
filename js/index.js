let flashcardList = $("#flashcard-list");
let flashcards = fetchFlashcards();

function showFlashcards() {
  flashcards = fetchFlashcards();

  flashcardList.html("");

  flashcards.forEach((card) => {
    flashcardList.html(
      flashcardList.html() +
        '<div class="col-lg-4 col-md-6">' +
        '<div class="card flashcard">' +
        '<div class="card-body">' +
        '<h5 class="card-title flashcard-title" id="flashcardQuestion" contenteditable="false">' +
        card.question +
        "</h5>" +
        '<p class="card-text flashcard-text hidden" id="flashcardAnswer" contenteditable="false">' +
        card.answer.replace(/\r\n|\r|\n/g, "</br>") +
        "</p>" +
        '<button onclick="toggleAnswer(this)"' +
        'class="btn btn-link btn-toggle-answer"' +
        'id="toggleAnswerBtn">Hide/Show Answer</button>' +
        '<div class="flashcard-controls">' +
        '<button onclick="deleteFlashcard(' +
        card.id +
        ')" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i> Delete</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  });
}

function addFlashcard(e) {
  let flashcard = new Flashcard(
    $("#flashcard-question").val(),
    $("#flashcard-answer").val()
  );

  flashcards = fetchFlashcards();

  flashcards.push(flashcard);

  setFlashcards(flashcards);

  document.getElementById("new-flashcard-form").reset();

  e.preventDefault();
}

function deleteFlashcard(id) {
  let flashcardIndex = flashcards.findIndex((card) => card.id == id);

  flashcards.splice(flashcardIndex, 1);

  setFlashcards(flashcards);
}

function fetchFlashcards() {
  let localStorageItem = JSON.parse(localStorage.getItem("flashcards"));

  let flashcards = !localStorageItem ? [] : localStorageItem;

  return flashcards;
}

function setFlashcards(flashcards) {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));

  showFlashcards();
}

function toggleCreation() {
  let button = $("#btn-toggle-creation");
  let flashcardCreationBox = $("#flashcardCreationBox");

  if (button.hasClass("btn-outline-success")) {
    button.html('<i class="far fa-eye-slash"></i> Hide');
    flashcardCreationBox.removeClass("hidden");
    button.removeClass("btn-outline-success").addClass("btn-outline-danger");
  } else {
    flashcardCreationBox.addClass("hidden");
    button.html('<i class="far fa-eye"></i> Show');
    button.removeClass("btn-outline-danger").addClass("btn-outline-success");
  }
}

function toggleAnswer(e) {
  let answer = $(e).prev();

  if (answer.hasClass("hidden")) answer.removeClass("hidden");
  else answer.addClass("hidden");
}

$(document).ready(showFlashcards);
$("#new-flashcard-form").submit(addFlashcard);
