var playlistFromSpoti;
var playlistCustom = [];

let codeVerifier = localStorage.getItem("code_verifier");
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");
let body = new URLSearchParams({
  grant_type: "authorization_code",
  code: code,
  redirect_uri: "http://127.0.0.1:5500/SpotV2/playlist.html",
  client_id: "8232546c1fe64f439ac1ed2e991f58c2",
  code_verifier: codeVerifier,
});
async function updateToken() {
  const response = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("access_token", data.access_token);
      getProfile();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function getProfile() {
  let accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    "https://api.spotify.com/v1/playlists/5HbNHADuYvl55kePbLEXmy",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  playlistFromSpoti = data;
  imprimePlaylist();
}
updateToken();

function imprimePlaylist() {
  document.getElementById("playlistTableBody").innerHTML = "";

  userPlaylist.textContent = "User: " + playlistFromSpoti.owner.display_name;
  playlistImgMenu.src = playlistFromSpoti.images[1].url;
  playlistName.textContent = "Playlist: " + playlistFromSpoti.name;
  playlistNameMenu.textContent = playlistFromSpoti.name;

  let songCount = 0;
  // Obtener la referencia del tbody
  const tbody = document.getElementById("playlistTableBody");

  // Recorrer los items del mock
  playlistFromSpoti.tracks.items.forEach((track, index) => {
    songCount++;

    //Contienen datos por ID del playlist -> HTML
    playlistImg.src = playlistFromSpoti.images[1].url;
    songsTotal.textContent =
      "Total de canciones: " + playlistFromSpoti.tracks.total;
    playlistOwner.textContent =
      "Autor: " + playlistFromSpoti.owner.display_name;

    // Crear una nueva fila (tr)
    const tr = document.createElement("tr");

    // Crear las celdas (td) con los datos correspondientes del numSong
    const numSong = document.createElement("th");
    numSong.textContent = songCount;

    //Crea las celdas (td) con los datos correspondientes al nombre de la canción
    const nameSong = document.createElement("td");
    nameSong.textContent = track.track.name;

    //Crea las celdas (td) con los datos correspondientes al nombre del artista

    const artistSong = document.createElement("td");
    artistSong.textContent = track.track.artists[0].name;
    /* track.track.artists.forEach(artista => {
      artistSong.textContent = artista.name 
    }) */

    //Crea las celdas (td) con los datos correspondientes a la duración de la canción
    const durationSong = document.createElement("td");
    const durationSongMinutes = Math.floor(track.track.duration_ms / 60000);
    const durationSongSegundos = Math.floor(
      (track.track.duration_ms % 60000) / 1000
    );
    const durationSongMS =
      durationSongMinutes +
      ":" +
      durationSongSegundos.toString().padStart(2, "0");
    durationSong.textContent = durationSongMS;

    //Crea las celdas (td) con los datos correspondientes al nombre del album
    const albumSong = document.createElement("td");
    albumSong.textContent = track.track.album.name;

    //Crea el elemento (button)
    const favButton = document.createElement("button");
    favButton.setAttribute("id", "liveAlertBtn");
    favButton.setAttribute("onclick", `songFav(${index})`);
    favButton.textContent = "Fav";

    //Asigna el elemento button a un td
    const buttonCell = document.createElement("td");
    buttonCell.appendChild(favButton);

    //Crea el elemento (button)
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onClick", `playSong(${index})`);
    deleteButton.textContent = "Reproducir";

    //Asigna el elemento button a un td
    const buttonCellDelete = document.createElement("td");
    buttonCellDelete.appendChild(deleteButton);

    const player = document.createElement("audio");
    player.setAttribute("src", `${track.track.preview_url}`);
    player.setAttribute("controls", "controls");
    const reproducer = document.createElement("td");
    reproducer.appendChild(player);

    //Imprime valores en tr, orden de valores
    tr.appendChild(numSong);
    tr.appendChild(nameSong);
    tr.appendChild(artistSong);
    tr.appendChild(durationSong);
    tr.appendChild(albumSong);
    tr.appendChild(buttonCell);
    tr.appendChild(buttonCellDelete);
    // tr.appendChild(reproducer);

    // Agregar la fila al tbody
    tbody.appendChild(tr);
  });
}

function playSong(indice) {
  reproducerImg.setAttribute("src",`${playlistFromSpoti.tracks.items[indice].track.album.images[1].url}
  `)
  reproducer.setAttribute(
    "src",
    `${playlistFromSpoti.tracks.items[indice].track.preview_url}
`
  );
  console.log("Si funciono");
}

// Funciones para añadir canciones a FavList
function songDelete(index) {
  playlistFromSpoti.splice(index, 1);
  imprimePlaylist();
}
function songFav(indice) {
  const newSong = playlistFromSpoti.tracks.items[indice];
  playlistCustom.push(newSong);
  nameSong = playlistFromSpoti.tracks.items[indice].track.name;
  showPlaylistCustom();
  console.log("Funciono y añado a fav");

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
  };
  appendAlert("Canción " + nameSong + " agregada a favoritos", "success");
}

//Funcion para mostrar FavList
function showPlaylistCustom() {
  let songCountFav = 0;
  document.getElementById("playlistTableBodyFav").innerHTML = "";

  playlistCustom.forEach((cancion, index) => {
    songCountFav++;
    const tr = document.createElement("tr");

    // Crear las celdas (td) con los datos correspondientes del numSong
    const numSong = document.createElement("th");
    numSong.textContent = songCountFav;

    //Crea las celdas (td) con los datos correspondientes a la duración de la canción
    const durationSong = document.createElement("td");
    const durationSongMinutes = Math.floor(cancion.track.duration_ms / 60000);
    const durationSongSegundos = Math.floor(
      (cancion.track.duration_ms % 60000) / 1000
    );
    const durationSongMS =
      durationSongMinutes +
      ":" +
      durationSongSegundos.toString().padStart(2, "0");
    durationSong.textContent = durationSongMS;

   // Crear las celdas (td) con los datos correspondientes al nombre de la cancion
    const tdCancion = document.createElement("td");
    tdCancion.textContent = cancion.track.name;

    // Crear las celdas (td) con los datos correspondientes al nombre(s) del artista
    const tdArtis = document.createElement("td");
    cancion.track.artists.forEach((artista) => {
      tdArtis.textContent = artista.name;
    });

    // Crear las celdas (td) con los datos correspondientes del nombre del album
    const tdAlbum = document.createElement("td");
    tdAlbum.textContent = cancion.track.album.name;

    // Crear las celdas (td) con el botón eliminar 
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", `deleteSong(${index})`);
    deleteButton.textContent = "Eliminar";
    const buttonCellDelete = document.createElement("td");
    buttonCellDelete.appendChild(deleteButton);

    //Crea las celdas (td) con el botón reproducir
    //Crea el elemento (button)
    const playButton = document.createElement("button");
    playButton.setAttribute("onClick", `playSong(${index})`);
    playButton.textContent = "Reproducir";
    const buttonCellPlay = document.createElement("td");
    buttonCellPlay.appendChild(playButton);

    //Asignación de elementos al tr aquí está el orden de columnas
    tr.appendChild(numSong);
    tr.appendChild(tdCancion);
    tr.appendChild(tdArtis);
    tr.appendChild(durationSong);
    tr.appendChild(tdAlbum);
    tr.appendChild(buttonCellDelete);
    tr.appendChild(buttonCellPlay);

    document.getElementById("playlistTableBodyFav").appendChild(tr);
  });
}

//Función que elimina canciones de lista de favoritos
function deleteSong(index) {
  playlistCustom.splice(index, 1);
  showPlaylistCustom();
  nameSong = playlistFromSpoti.tracks.items[index].track.name;

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
  };
  appendAlert("Canción " + nameSong + " eliminada de favoritos", "success");
}

//Función que redirije a lista de favoritos
function goToFav() {
  const playlistSection = document.getElementById("sectionPlaylistFav");
  const playlistFavSection = document.getElementById("sectionPlaylist");
  const playlistListSectionButton = document.getElementById(
    "sectionPlaylistButtonList"
  );
  const playlistFavSectionButton = document.getElementById(
    "sectionPlaylistButtonFav"
  );

  playlistSection.style.display = "none";
  playlistFavSection.style.display = "block";
  playlistListSectionButton.style.backgroundColor = "grey";
  playlistFavSectionButton.style.backgroundColor = "transparent";
}

//Función que redirije a Playlist importada
function goToSectionPlaylist() {
  const playlistFavSection = document.getElementById("sectionPlaylist");
  const playlistSection = document.getElementById("sectionPlaylistFav");
  const playlistFavSectionButton = document.getElementById(
    "sectionPlaylistButtonFav"
  );
  const playlistListSectionButton = document.getElementById(
    "sectionPlaylistButtonList"
  );

  playlistFavSection.style.display = "none";
  playlistSection.style.display = "block";
  playlistFavSectionButton.style.backgroundColor = "grey";
  playlistListSectionButton.style.backgroundColor = "transparent";
}
