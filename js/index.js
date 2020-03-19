// document.addEventListener("DOMContentLoaded", function() {});


const BOOK_API = "https://2649e6e1.ngrok.io/books";
const clickBook = document.querySelector("#list");

const currentUser = { id: 1, username: "pouros" };

console.log("DOMContentLoaded");
const init = () => {
  fetch(BOOK_API)
    .then(res => res.json())
    .then(books => renderBooks(books));
};

const renderBooks = books => {
  books.forEach(book => {
    renderBook(book);
  });
};

// user list
const renderUser = (user, ul) => {
  const li = document.createElement("li");
  li.innerText = user.username;
  ul.append(li);
};

const renderBookInfo = book => {
  const showPanel = document.querySelector("#show-panel");
  const bookImg = document.createElement("img");
  bookImg.src = book.img_url;

  const bookDescription = document.createElement("p");
  bookDescription.innerText = book.description;
  const ul = document.createElement("ul");
  book.users.forEach(user => {
    renderUser(user, ul);
  });

  const likeButton = document.createElement("button");

  likeButton.innerText = "READ BOOK";

  likeButton.addEventListener("click", () => {
    // add current user into book users array
    book.users.push(currentUser);
    console.log("READ THIS BOOK", book);
    renderUser(currentUser, ul);

    fetch("https://2649e6e1.ngrok.io/books/" + book.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(book)
    });
  });

  showPanel.append(bookImg, bookDescription, ul, likeButton);
};

const renderBook = book => {
  // creating book list
  const bookLi = document.createElement("li");
  bookLi.innerText = book.title;
  clickBook.append(bookLi);
  bookLi.style.cursor = "pointer";

  bookLi.addEventListener("click", () => {
    renderBookInfo(book);
  });
};

init();
