// Événement d'installation du Service Worker
self.addEventListener('install', event => {
    console.log("Service Worker installé.");
    // Forcer le Service Worker à passer immédiatement à l'état actif
    self.skipWaiting();
});

// Événement d'activation du Service Worker
self.addEventListener('activate', event => {
    console.log("Service Worker activé.");
    // Nettoyer d'anciennes caches ou autres tâches de maintenance ici si nécessaire
});

// Événement pour gérer les notifications affichées
self.addEventListener('notificationclick', event => {
    console.log("Notification cliquée :", event.notification);
    event.notification.close(); // Fermer la notification

    // Ouvrir ou focaliser une page spécifique lorsque l'utilisateur clique
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                let client = clientList[0];
                return client.focus();
            } else {
                return clients.openWindow('/');
            }
        })
    );
});

// Événement pour intercepter les requêtes réseau (optionnel dans ce cas)
self.addEventListener('fetch', event => {
    // Exemple : Log des requêtes interceptées (aucune action ici)
    console.log("Requête interceptée :", event.request.url);
});
