"use strict";
const initApp = () => {
    const form = document.getElementById('form');
    const name = document.getElementById('siteName');
    const url = document.getElementById('siteUrl');
    const results = document.getElementById('results');
    // Get Bookmarks from local storage
    getBookmarks().forEach((bookmark) => {
        const listItem = createElements(bookmark.name, bookmark.url);
        results.append(listItem);
    });
    results.addEventListener('click', (e) => {
        const target = e.target;
        const bookmark = target.closest('button');
        if (!bookmark)
            return;
        console.log(bookmark);
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addBookmark(name, url);
    });
};
document.addEventListener('DOMContentLoaded', initApp);
// GET BOOKMARKS
const getBookmarks = () => {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
};
// ADD BOOKMARK
const addBookmark = (name, url) => {
    // const ul = document.getElementById('result') as HTMLUListElement;
    const bookmarks = getBookmarks();
    const newBookmark = {
        name: name.value,
        url: url.value,
    };
    // const li = createElements(name.value, url.value);
    // renderElement(ul, li);
    bookmarks.push(newBookmark);
    saveBookmark(bookmarks);
};
// CREATE ELEMENTS
const createElements = (name, url) => {
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
const renderElement = (parent, child) => {
    parent.appendChild(child);
};
// SAVE BOOKMARK
const saveBookmark = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};
// DELETE BOOKMARK
