let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Empêche l'affichage automatique de la bannière
  e.preventDefault();
  deferredPrompt = e;

  // Affiche le bouton d'installation
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
  }
});

document.getElementById('install-button').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Affiche la boîte de dialogue d'installation
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installée');
    } else {
      console.log('Installation refusée');
    }
    deferredPrompt = null; // Réinitialise la variable
  }
});
