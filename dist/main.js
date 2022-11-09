"use strict";
const initApp = () => {
    const form = document.getElementById('form');
    const name = document.getElementById('siteName');
    const url = document.getElementById('siteUrl');
    const results = document.getElementById('results');
    getBookmarks().forEach((bookmark) => {
        const listItem = createElements(bookmark.id, bookmark.name, bookmark.url);
        results.append(listItem);
    });
    results.addEventListener('click', (e) => {
        const target = e.target;
        const bookmark = target.closest('button');
        if (!bookmark)
            return;
        deleteBookmark(bookmark.id, bookmark);
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!name.value || !url.value)
            return;
        addBookmark(results, name, url);
        form.reset();
    });
};
document.addEventListener('DOMContentLoaded', initApp);
const getBookmarks = () => {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
};
const addBookmark = (ul, name, url) => {
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
const createElements = (id, name, url) => {
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
const renderElement = (parent, child) => {
    parent.appendChild(child);
};
const saveBookmark = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};
const deleteBookmark = (id, el) => {
    const bookmarks = getBookmarks().filter((bookmark) => bookmark.id !== id);
    saveBookmark(bookmarks);
    el.parentElement?.parentElement?.remove();
};
