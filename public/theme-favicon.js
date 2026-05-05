// Función para actualizar el favicon según el tema
function updateFavicon() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const favicon = document.querySelector('link[rel="icon"]');
  
  if (isDark) {
    favicon.href = 'logoWhite.svg';
  } else {
    favicon.href = 'logoBlack.svg';
  }
}

// Ejecutar al cargar la página
updateFavicon();

// Escuchar cambios en la preferencia de tema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
