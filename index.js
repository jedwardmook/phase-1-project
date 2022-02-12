document.addEventListener("DOMContentLoaded", () => {
console.log("hello")

function getAlbums() {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(albumData => albumData.forEach(renderAlbum))
    };
getAlbums()

function renderAlbum(album){
    let albumCard = document.createElement('div')
    albumCard.className ="card"
    albumCard.id ="card"
    albumCard.innerHTML = `
    <div class= "album-image">
        <img src=${album.image} alt="Album Cover" width="200px" height="200px">
    </div>
    <div class= "album-info">
        <h3>${album.name}</h3>
        <h4>Artist: ${album.artist}</h4>
        <p>Genre: ${album.genre}</p>
        <p>Released: ${album.release}</p>
    </div>
    <div class="remove">
        <button id="remove">Remove Album</button>
    </div>`

    const albumContainer = document.querySelector('#album-container')
    albumContainer.append(albumCard)
    albumCard.querySelector('#remove').addEventListener('click', () => {
        albumCard.remove()
        removeAlbum(album.id)
    })
};

function removeAlbum(id) {
    fetch(`http://localhost:3000/albums/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(albumData => console.log(albumData))
    alert("Album deleted")
};











});