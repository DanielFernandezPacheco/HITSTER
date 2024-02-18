const urlParams = new URLSearchParams(window.location.search);
const songId = parseInt(urlParams.get('id'));
const audioPlayer = document.getElementById('audioPlayer');

fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        // Buscar la canción con el ID correspondiente
        const song = data.find(song => song.id === songId);

        if (song) {
            audioPlayer.src = song.url;
        } else {
            console.error('Canción no encontrada.');
        }
    })
    .catch(error => console.error('Error al cargar el JSON:', error));


audio.addEventListener('play', function () {
    // Añadir la clase 'rotando' para iniciar la rotación
    imagen.classList.add('rotando');
});

// Evento que se activa cuando el audio se pausa
audio.addEventListener('pause', function () {
    // Quitar la clase 'rotando' para detener la rotación
    imagen.classList.remove('rotando');
});

// Evento que se activa cuando el audio termina de reproducirse
audio.addEventListener('ended', function () {
    // Quitar la clase 'rotando' para detener la rotación
    imagen.classList.remove('rotando');
});