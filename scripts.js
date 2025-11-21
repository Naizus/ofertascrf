 document.addEventListener("DOMContentLoaded", () => {
  const video1 = document.querySelector(".carousel-video1");
  const video2 = document.querySelector(".carousel-video2");
  const images = document.querySelectorAll(".carousel-image");
  let currentImageIndex = 0;
  let imageInterval = null;

  // Función para mostrar la imagen correspondiente
  function mostrarImagen(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  // Muestra las imágenes en secuencia y luego llama al callback
  function mostrarImagenes(callback) {
    mostrarImagen(currentImageIndex);

    imageInterval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      mostrarImagen(currentImageIndex);

      if (currentImageIndex === images.length - 1) {
        clearInterval(imageInterval);
        // Espera 15 segundos antes de iniciar el video
        setTimeout(callback, 15000);
      }
    }, 10000);
  }

  // Función genérica para reproducir un video durante una duración dada y luego llamar al callback
  function reproducirVideo(videoElement, duracion, callback) {
    // Oculta imágenes y remueve clase "active" de todos los videos
    images.forEach(img => img.classList.remove("active"));
    [video1, video2].forEach(v => v.classList.remove("active"));

    videoElement.classList.add("active");
    videoElement.currentTime = 0;
    videoElement.play();

    setTimeout(() => {
      videoElement.pause();
      videoElement.classList.remove("active");
      callback();
    }, duracion);
  }

  // Función principal que inicia el carrusel
  function iniciarCarrusel() {
    mostrarImagenes(() => {
      // Reproduce video1 (2:27 = 147000 ms)
      reproducirVideo(video1, 150000, () => {
        // Reproduce video2 (1:07 = 67000 ms)
        reproducirVideo(video2, 67000, () => {
          // Reinicia el carrusel con las imágenes
          currentImageIndex = 0;
          iniciarCarrusel();
        });
      });
    });
  }

  iniciarCarrusel();
});   




/*
document.addEventListener("DOMContentLoaded", () => {
  const video1 = document.querySelector(".carousel-video1");
  const video2 = document.querySelector(".carousel-video2");
  const images = document.querySelectorAll(".carousel-image");
  let currentImageIndex = 0;
  let imageInterval = null;

  function mostrarImagen(index) {
      images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
      });
  }

  function mostrarImagenes(callback) {
      mostrarImagen(currentImageIndex);
      imageInterval = setInterval(() => {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          mostrarImagen(currentImageIndex);
          if (currentImageIndex === images.length - 1) {
              clearInterval(imageInterval);
              setTimeout(callback, 15000);
          }
      }, 10000); // Cambiar a 30000 para producción
  }

  function reproducirVideo(videoElement, duracion, callback) {
      images.forEach(img => img.classList.remove("active"));
      video1.classList.remove("active");
      video2.classList.remove("active");
      
      videoElement.classList.add("active");
      videoElement.currentTime = 0;
      videoElement.play();

      setTimeout(() => {
          videoElement.pause();
          videoElement.classList.remove("active");
          callback();
      }, duracion);
  }

  function iniciarCarrusel() {
      mostrarImagenes(() => {
          reproducirVideo(video1, 150000, () => {
              reproducirVideo(video2, 67000, () => {
                  currentImageIndex = 0;
                  iniciarCarrusel();
              });
          });
      });
  }

  iniciarCarrusel();
}); */