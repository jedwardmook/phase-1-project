document.addEventListener("DOMContentLoaded", () => {
console.log("hello")

function getAlbums() {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(albumData => console.log(albumData))
    };
getAlbums()












});