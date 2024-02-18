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


const imagen = document.getElementById('disco');

let rotacionActual = 0; // Variable para almacenar la rotación actual

    // Evento que se activa cuando el audioPlayer empieza a reproducirse
    audioPlayer.addEventListener('play', function() {
        // Recuperar la rotación actual de la imagen
        const transform = window.getComputedStyle(imagen).getPropertyValue('transform');
        // Extraer el ángulo de rotación actual
        const match = transform.match(/matrix\((.*)\)/);
        if (match && match[1]) {
            const matrixValues = match[1].split(',');
            rotacionActual = Math.round(Math.atan2(matrixValues[1], matrixValues[0]) * (180/Math.PI));
        }
        // Añadir la clase 'rotando' para iniciar la rotación
        imagen.classList.add('rotando');
    });

    // Evento que se activa cuando el audioPlayer se pausa
    audioPlayer.addEventListener('pause', function() {
        // Quitar la clase 'rotando' para detener la rotación
        imagen.classList.remove('rotando');
        // Aplicar la rotación actual como estilo en línea
        imagen.style.transform = `rotate(${rotacionActual}deg)`;
    });

    // Evento que se activa cuando el audioPlayer termina de reproducirse
    audioPlayer.addEventListener('ended', function() {
        // Quitar la clase 'rotando' para detener la rotación
        imagen.classList.remove('rotando');
        // Restablecer la rotación actual
        rotacionActual = 0;
    });
