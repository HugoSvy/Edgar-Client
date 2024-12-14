let deferredPrompt;

// Écoute de l'événement beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt déclenché');
  
  // Empêche l'affichage automatique de la bannière
  e.preventDefault();
  deferredPrompt = e;

  // Affiche le bouton
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';

    // Ajoute un gestionnaire d'événement au clic
    installButton.addEventListener('click', async () => {
      installButton.style.display = 'none'; // Masque le bouton après clic
      deferredPrompt.prompt(); // Affiche la boîte de dialogue d'installation
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('L\'utilisateur a accepté l\'installation.');
      } else {
        console.log('L\'utilisateur a refusé l\'installation.');
      }
      deferredPrompt = null; // Réinitialise la variable
    });
  }
});

// Vérification des conditions
window.addEventListener('appinstalled', () => {
  console.log('PWA installée avec succès');
});
