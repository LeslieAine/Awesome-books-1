const formEl = document.getElementById('form');
const titleEl = document.getElementById('title');
const nameEl = document.getElementById('author');

class BookCollection {
  constructor() {
    this.collection = JSON.parse(window.localStorage.getItem('bookCollection')) || [];
  }

  addBook(bookTitle, bookAuthor) {
    const bookID = Math.ceil(Math.random() * 10000);
    this.collection.push({ bookTitle, bookAuthor, bookID });
    this.updateLocalStorage();
  }

  removeBook(bookID) {
    this.collection = this.collection.filter((book) => book.bookID !== +bookID);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    window.localStorage.setItem('bookCollection', JSON.stringify(this.collection));
  }
}

const bookCollection = new BookCollection();

formEl.addEventListener('submit', () => {
  const bookTitle = titleEl.value;
  const bookAuthor = nameEl.value || 'unknown';
  bookCollection.addBook(bookAuthor, bookTitle);
});

const bookCollectionContainer = document.createElement('div');
bookCollectionContainer.className = 'bookCollectionContainer';
const bookCollectionSection = document.createElement('div');
bookCollectionSection.className = 'book-collection-section';
const collectionHeader = document.createElement('h2');
collectionHeader.className = 'collection-header';
collectionHeader.textContent = 'All awesome books';
bookCollectionSection.append(collectionHeader, bookCollectionContainer);
const bookEntryRemove = [];

for (let i = 0; i < bookCollection.collection.length; i += 1) {
  const bookEntryTitle = document.createElement('h3');
  bookEntryTitle.textContent = `"${bookCollection.collection[i].bookAuthor}" by ${bookCollection.collection[i].bookTitle}`;
  bookEntryRemove.push(document.createElement('button'));
  bookEntryRemove.className = 'remove-btn';
  bookEntryRemove[i].textContent = 'Remove';
  bookEntryRemove[i].className = 'remove-btn';
  bookEntryRemove[i].dataset.id = bookCollection.collection[i].bookID;
  const bookEntryContainer = document.createElement('div');
  if (i % 2 === 0) {
    bookEntryContainer.className = 'book-entry entry-bg-1';
  } else {
    bookEntryContainer.className = 'book-entry entry-bg-2';
  }
  bookCollectionContainer.appendChild(bookEntryContainer);
  bookEntryContainer.append(bookEntryTitle, bookEntryRemove[i]);
}

for (let i = 0; i < bookEntryRemove.length; i += 1) {
  /* eslint-disable no-loop-func */
  bookEntryRemove[i].addEventListener('click', (event) => {
    const datasetId = event.target.dataset.id;
    bookCollection.removeBook(datasetId);
    bookCollectionContainer.innerHTML = '';
    for (let i = 0; i < bookCollection.collection.length; i += 1) {
      const bookEntryTitle = document.createElement('h3');
      bookEntryTitle.textContent = `"${bookCollection.collection[i].bookAuthor}" by ${bookCollection.collection[i].bookTitle}`;
      bookEntryRemove.push(document.createElement('button'));
      bookEntryRemove.className = 'remove-btn';
      bookEntryRemove[i].textContent = 'Remove';
      bookEntryRemove[i].className = 'remove-btn';
      bookEntryRemove[i].dataset.id = bookCollection.collection[i].bookID;
      const bookEntryContainer = document.createElement('div');
      if (i % 2 === 0) {
        bookEntryContainer.className = 'book-entry entry-bg-1';
      } else {
        bookEntryContainer.className = 'book-entry entry-bg-2';
      }
      bookCollectionContainer.appendChild(bookEntryContainer);
      bookEntryContainer.append(bookEntryTitle, bookEntryRemove[i]);
    }
  });
}

const contactInfoContainer = document.createElement('div');
contactInfoContainer.className = 'contact-info-container';
const contactHeader = document.createElement('h3');
contactHeader.textContent = 'Contact Information';
const contactText = document.createElement('p');
contactText.textContent = 'Do you have any questions or you just want to say "hello"?';
const contactChanels = document.createElement('ul');
contactChanels.innerHTML = `
<li> Our e-mail: test@gmail.com</li>
<li> Our phone number: +90123456</li>
<li> Our address: Streetname 22, SomeCity, Country</li>
`;

contactInfoContainer.append(contactHeader, contactText, contactChanels);
document.body.insertBefore(contactInfoContainer, document.body.children[4]);
const navbar = document.createElement('nav');
navbar.className = 'navbar';
const logo = document.createElement('div');
logo.className = 'logo-container';
const logoContent = document.createElement('span');
logoContent.className = 'logo-content';
logoContent.textContent = 'Awesome Books';
const navlinks = document.createElement('span');
navlinks.className = 'nav-links';
const booksList = document.createElement('span');
booksList.className = 'books-list nav-link';
booksList.textContent = 'List';
const newBookForm = document.createElement('span');
newBookForm.className = 'new-book-form nav-link';
newBookForm.textContent = 'Add new';
const contactInfo = document.createElement('span');
contactInfo.className = 'contact-us nav-link';
contactInfo.textContent = 'Contact';

const footer = document.createElement('footer');
const footerText = document.createElement('small');
footerText.className = 'footer-text';
footerText.textContent = 'This is the footer. copyright 2023.';
footer.appendChild(footerText);
logo.appendChild(logoContent);
navbar.append(logo, navlinks);
navlinks.append(booksList, newBookForm, contactInfo);
const time = document.createElement('p');
time.className = 'time';
// time.innerText = `%{}`;
document.body.insertBefore(navbar, document.body.children[0]);
document.body.insertBefore(time, document.body.children[1]);
document.body.insertBefore(bookCollectionSection, document.body.children[2]);
document.body.appendChild(footer);

function display(show, hide1, hide2) {
  show.style.display = 'flex';
  hide1.style.display = 'none';
  hide2.style.display = 'none';
}

booksList.addEventListener('click', () => {
  display(bookCollectionSection, formEl, contactInfoContainer);
});

newBookForm.addEventListener('click', () => {
  display(formEl, bookCollectionSection, contactInfoContainer);
});

contactInfo.addEventListener('click', () => {
  display(contactInfoContainer, bookCollectionSection, formEl);
});

function updateClock() {
  const now = new Date();
  time.innerHTML = now.toString().substring(0, 21);
  // return date;
}
setInterval(updateClock, 1000);