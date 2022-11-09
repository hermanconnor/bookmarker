const initApp = () => {
  const form = document.getElementById('form') as HTMLFormElement;
  const name = document.getElementById('siteName') as HTMLInputElement;
  const url = document.getElementById('siteUrl') as HTMLInputElement;
  const results = document.getElementById('results') as HTMLUListElement;

  // Get Bookmarks from local storage
  getBookmarks().forEach((bookmark) => {
    const listItem = createElements(bookmark.id, bookmark.name, bookmark.url);

    results.append(listItem);
  });

  // Delete Event Listener
  results.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const bookmark = target.closest('button');

    if (!bookmark) return;

    deleteBookmark(bookmark.id, bookmark);
  });

  // Form Submit Event Listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!name.value || !url.value) return;

    addBookmark(results, name, url);

    // Clear form values after submit
    form.reset();
  });
};

document.addEventListener('DOMContentLoaded', initApp);

interface Bookmark {
  id: string;
  name: string;
  url: string;
}
// GET BOOKMARKS
const getBookmarks = (): Bookmark[] => {
  return JSON.parse(localStorage.getItem('bookmarks') || '[]');
};

// ADD BOOKMARK
const addBookmark = (
  ul: HTMLUListElement,
  name: HTMLInputElement,
  url: HTMLInputElement,
): void => {
  const bookmarks = getBookmarks();

  const newBookmark = {
    id: `${Math.floor(Math.random() * 100000)}-${name.value}`,
    name: name.value,
    url: url.value,
  };

  const li = createElements(newBookmark.id, newBookmark.name, newBookmark.url);

  renderElement(ul, li);

  bookmarks.push(newBookmark);

  saveBookmark(bookmarks);
};

// CREATE ELEMENTS
const createElements = (
  id: string,
  name: string,
  url: string,
): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between');

  const div = document.createElement('div');
  div.classList.add('d-flex', 'p-2');

  const h3 = document.createElement('h3');
  h3.textContent = name;

  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.classList.add('btn', 'btn-primary');
  a.textContent = 'Visit';

  const button = document.createElement('button');
  button.id = id;
  button.classList.add('btn', 'btn-danger', 'ms-3');
  button.type = 'button';
  button.textContent = 'Delete';

  div.append(a);
  div.append(button);

  li.append(h3);
  li.append(div);

  return li;
};

// RENDER ELEMENT
const renderElement = (parent: HTMLUListElement, child: HTMLLIElement) => {
  parent.appendChild(child);
};

// SAVE BOOKMARK
const saveBookmark = (bookmarks: Bookmark[]): void => {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

// DELETE BOOKMARK
const deleteBookmark = (id: string, el: HTMLButtonElement) => {
  // Remove from storage
  const bookmarks = getBookmarks().filter((bookmark) => bookmark.id !== id);

  saveBookmark(bookmarks);

  // Remove from UI
  el.parentElement?.parentElement?.remove();
};
