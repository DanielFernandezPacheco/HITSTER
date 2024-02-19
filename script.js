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

// Acceder a la cámara del dispositivo
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
.then(function (stream) {
    var video = document.getElementById('video');
    video.srcObject = stream;
    video.play();
})
.catch(function (err) {
    console.log("Error al acceder a la cámara: " + err);
});

// Esperar a que el video esté cargado para comenzar a procesar los frames
document.getElementById('video').addEventListener('loadedmetadata', function () {
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Configurar el tamaño del canvas para que coincida con el video
canvas.width = this.videoWidth;
canvas.height = this.videoHeight;

// Procesar los frames del video
setInterval(function () {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code && isValidURL(code.data)) {
        console.log('Código QR válido detectado:', code.data);
        window.location.href = code.data; // Redirigir a la URL
    }
}, 1000); // Procesar cada segundo
});

// Función para validar una URL
function isValidURL(url) {
var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // nombre de dominio
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // dirección IP
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // puerto y ruta
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // parámetros de consulta
    '(\\#[-a-z\\d_]*)?$','i'); // fragmento
return !!pattern.test(url);
}