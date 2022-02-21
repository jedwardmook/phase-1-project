let viewAlbum = false;
let searchAlbum = false;
let addAlbum = false;

document.addEventListener("DOMContentLoaded", () => {
getAlbums()
let gotAlbums = []

const searchBar = document.querySelector(".search");
const albumContainer = document.querySelector('#album-container');
const addToContainer = document.querySelector(".add-album-form");
const albumForm = document.querySelector(".add-album-form");

const viewCollection = () => {
    const viewBtn = document.getElementById("view-btn");
    viewBtn.addEventListener("click", () =>{
      albumContainer.innerHTML=""
      gotAlbums.forEach(renderAlbum);
    })
}
viewCollection()

//toggles
const toggleView = () => {
  const viewBtn = document.getElementById("view-btn");
  viewBtn.addEventListener("click", () => {
  getAlbums()
  viewAlbum = !viewAlbum;
    if (viewAlbum) {
      albumContainer.style.display = "grid",
      searchBar.style.display= "grid",
      viewBtn.innerText = "Hide Collection";
    } else {
      albumContainer.style.display = "none",
      searchBar.style.display= "none",
      viewBtn.innerText = "View Collection";
    }
 })
};
toggleView()

const toggleAdd = () => {
  const togAddBtn = document.getElementById("add-btn");
  togAddBtn.addEventListener("click", () => {
  addAlbum = !addAlbum;
    if (addAlbum) {
      addToContainer.style.display = "block",
      togAddBtn.innerText = "Hide Add to";
    } else {
      addToContainer.style.display = "none",
      togAddBtn.innerText = "Add to Collection";
    }
 })
};
toggleAdd()
//toggles

//fetches
function logAlbum(newAlbumObj){
  fetch('http://localhost:3000/albums', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newAlbumObj)
    })
    .then(response => response.json())
    .then(response => {
      gotAlbums.push(newAlbumObj)
      albumContainer.innerHTML=""
      gotAlbums.forEach(renderAlbum)
      albumForm.reset()
      console.log(response)
  })
};

function getAlbums() {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(albumData => {
      gotAlbums = albumData})
    };
//fetches


const newAlbumForm = () => {
  albumForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const albumName= e.target.album.value
    const albumImage= e.target.image.value
    const albumArtist= e.target.artist.value
    const albumGenre= e.target.genre.value
    const albumRelease= e.target.release.value
    const newAlbumObj = {
      name: albumName,
      image: albumImage,
      artist: albumArtist,
      genre: albumGenre,
      release: albumRelease, 
    }
    logAlbum(newAlbumObj)
    alert("Album added")
    getAlbums()
  })
}
newAlbumForm()

function searchCollection() {
  searchBar.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredAlbums = gotAlbums.filter( album => {
    return album.artist.toLowerCase().includes(searchString) ||
            album.name.toLowerCase().includes(searchString) ||
            album.genre.toLowerCase().includes(searchString) ||
            album.release.includes(searchString)
    })
    albumContainer.innerHTML=""
    filteredAlbums.forEach(renderAlbum)
  })
};
searchCollection()

function renderAlbum(album){
  const {image, name, artist, genre, release, id} = album
  const albumCard = document.createElement('div')
  albumCard.className ="card"
  albumCard.id ="card"
  albumCard.innerHTML = `
  <div class= "album-image">
      <img src=${image} alt="Album Cover" width="200px" height="200px">
  </div>
  <div class= "album-info">
      <h3>${name}</h3>
      <h4>Artist: ${artist}</h4>
      <p>Genre: ${genre}</p>
      <p>Released: ${release}</p>
  </div>
  <div class="remove">
      <button id="remove">Remove Album</button>
  </div>`

  albumContainer.append(albumCard)
  albumCard.querySelector('#remove').addEventListener('click', () => {
    fetch(`http://localhost:3000/albums/${id}`,{
      method: "DELETE",
      headers: {
          'Content-Type':'application/json'
      }
  })
  .then(response => response.json())
  .then(albumData => {
    console.log(albumData)
    alert("Album deleted")
  })
      albumCard.remove()
      console.log(gotAlbums)
  })
};

});
