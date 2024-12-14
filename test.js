let deferredPrompt;

// Écouter l'événement beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Empêche l'affichage automatique de la bannière d'installation
    e.preventDefault();
    // Stocke l'événement pour une utilisation ultérieure
    deferredPrompt = e;

    // Affiche votre bouton d'installation
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'block';
    }
});

// Gérer le clic sur le bouton d'installation
document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        // Affiche la boîte de dialogue d'installation
        deferredPrompt.prompt();

        // Attendre la réponse de l'utilisateur
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Résultat de l'installation : ${outcome}`);

        // Réinitialiser deferredPrompt après l'utilisation
        deferredPrompt = null;
    }
});

window.addEventListener('appinstalled', () => {
    console.log('L\'application a été installée');
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'none';
    }
});

