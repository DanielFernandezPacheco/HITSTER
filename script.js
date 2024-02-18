        const urlParams = new URLSearchParams(window.location.search);
        const songId = parseInt(urlParams.get('id'));

        fetch('songs.json')
            .then(response => response.json())
            .then(data => {
                // Buscar la canción con el ID correspondiente
                const song = data.find(song => song.id === songId);

                if (song) {
                    const audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.src = song.url;
                } else {
                    console.error('Canción no encontrada.');
                }
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
