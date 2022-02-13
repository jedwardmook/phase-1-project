let viewAlbum = false;
let searchAlbum = true;

document.addEventListener("DOMContentLoaded", () => {
console.log("hello")



const viewCollection = () => {
    const viewBtn = document.getElementById("view-btn");
    viewBtn.addEventListener("click", () =>{
        getAlbums();
    })
}
viewCollection()

const toggleSearches = () => {
    const togSearchBtn = document.getElementById("search-btn");
    const searchBar = document.getElementById("searchBar");
    togSearchBtn.addEventListener("click", () => {
    
      searchAlbum = !searchAlbum;
      if (searchAlbum) {
        searchBar.style.display = "none";
      } else {
        searchBar.style.display = "grid";
      }
   })
};
toggleSearches()

const toggleView = () => {
    const viewBtn = document.getElementById("view-btn");
    const albumContainer = document.querySelector('.album-container');
    viewBtn.addEventListener("click", () => {
    viewAlbum = !viewAlbum;
      if (viewAlbum) {
        albumContainer.style.display = "grid";
      } else {
        albumContainer.style.display = "none";
      }
   })
};
toggleView()

function getAlbums() {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(albumData => albumData.forEach(renderAlbum))
    };


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