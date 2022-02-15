let viewAlbum = false;
let searchAlbum = false;
let addAlbum = false;

document.addEventListener("DOMContentLoaded", () => {

const viewCollection = () => {
    const viewBtn = document.getElementById("view-btn");
    viewBtn.addEventListener("click", () =>{
        getAlbums();
    })
}
viewCollection()

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



const toggleAdd = () => {
  const togAddBtn = document.getElementById("add-btn");
  const addToContainer = document.querySelector(".add-album-form");
  togAddBtn.addEventListener("click", () => {
  
  addAlbum = !addAlbum;
    if (addAlbum) {
      addToContainer.style.display = "block";
    } else {
      addToContainer.style.display = "none";
    }
 })
  };
toggleAdd()

function getAlbums() {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(albumData => albumData.forEach(renderAlbum))
    };

// const newAlbumForm = () => {
//         const albumForm = document.querySelector('.add-album-form')
//         albumForm.addEventListener('submit', (e) => {
//           e.preventDefault()
//           const albumName = e.target.name.value
//           const newAlbumImage = e.target.image.value
//           const albumArtist = e.target.artist.value
//           const albumGenre = e.target.genre.value
//           const albumRelease = e.target.release.value
//           const newAlbumObj = {
//             name: albumName,
//             image: newAlbumImage,
//             artist: albumArtist,
//             genre: albumGenre,
//             release: albumRelease,
//           }
//           logAlbum(newAlbumObj)
//           alert("Album added!")
//         })
//     };
// newAlbumForm()

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








