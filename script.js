 // Función para obtener el valor del parámetro GET por nombre
        // Obtener el ID de la canción desde el parámetro GET 'id'
        const urlParams = new URLSearchParams(window.location.search);
        const songId = parseInt(urlParams.get('id'));

        // Cargar el JSON con los datos de las canciones
        fetch('songs.json')
            .then(response => response.json())
            .then(data => {
                // Buscar la canción con el ID correspondiente
                const song = data.find(song => song.id === songId);

                // Mostrar la información de la canción
                if (song) {
                    console.log(songId);
                    // Obtener el reproductor de audio
                    const audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.src = song.url;
                } else {
                    console.error('Canción no encontrada.');
                }
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
