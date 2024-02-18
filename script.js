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

audioPlayer.addEventListener('play', function () {
    // Añadir la clase 'rotando' para iniciar la rotación
    imagen.classList.add('rotando');
});

// Evento que se activa cuando el audio se pausa
audioPlayer.addEventListener('pause', function () {
    // Quitar la clase 'rotando' para detener la rotación
    imagen.classList.remove('rotando');
});

// Evento que se activa cuando el audio termina de reproducirse
audioPlayer.addEventListener('ended', function () {
    // Quitar la clase 'rotando' para detener la rotación
    imagen.classList.remove('rotando');
});

// Configuración del lector de QR
Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#reader'),    // Selector del contenedor
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // Opcional: "environment" para la cámara trasera
        },
    },
    decoder : {
        readers : ["code_128_reader"] // Lista de tipos de códigos a leer (QR, code_128, etc.)
    }
}, function(err) {
    if (err) {
        console.error(err);
        return
    }
    console.log("Lector de QR inicializado correctamente");
    Quagga.start();
});

// Escucha el evento 'detected' para obtener el resultado del escaneo
Quagga.onDetected(function(result) {
    console.log("Resultado del escaneo:", result.codeResult.code);
    // Aquí puedes hacer lo que quieras con el resultado, como redirigir a una página o mostrar información.
});