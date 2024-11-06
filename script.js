document.getElementById('etatGlobalForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const temperature = document.getElementById('temperature').value;
  const humidite = document.getElementById('humidite').value;
  const luminosite = document.getElementById('luminosite').value;
  const reservoir = document.getElementById('reservoir').value;
  const date = document.getElementById('date').value;

  console.log("Données envoyées à /etatGlobal : ", { nom, temperature, humidite, luminosite, reservoir, date });

  try {
    //const response = await fetch(`http://localhost:8000/etatGlobal?nom=${nom}&temperature=${temperature}&humidite=${humidite}&luminosite=${luminosite}&reservoir=${reservoir}&date=${date}`, {
    const response = await fetch(`https://tolerant-namely-swift.ngrok-free.app/etatGlobal?nom=${nom}&temperature=${temperature}&humidite=${humidite}&luminosite=${luminosite}&reservoir=${reservoir}&date=${date}`, {
      headers: {
        "ngrok-skip-browser-warning": "1"
      },
      method: 'GET'
    });
    
    const result = await response.text();
    console.log("Réponse de /etatGlobal : ", result);
    document.getElementById('etatGlobalResult').textContent = `Résultat : ${result}`;
  } catch (error) {
    console.log("Erreur lors de l'envoi à /etatGlobal : ", error.message);
    document.getElementById('etatGlobalResult').textContent = `Erreur : ${error.message}`;
  }
});

function remplirFormulaireAleatoire() {
  document.getElementById('nom').value = "test";

  document.getElementById('temperature').value = (Math.random() * 15 + 15).toFixed(1); // Température entre 15 et 30°C
  document.getElementById('humidite').value = (Math.random() * 50 + 25).toFixed(0); // Humidité entre 25% et 75%
  document.getElementById('luminosite').value = (Math.random() * 1000).toFixed(0); // Luminosité entre 0 et 1000
  document.getElementById('reservoir').value = (Math.random() * 100).toFixed(0); // Niveau du réservoir entre 0 et 100

  // Date et heure actuelles
  const maintenant = new Date();
  document.getElementById('date').value = maintenant.toISOString().slice(0, 16); // ISO 8601 format sans secondes
}

// Appelez la fonction lorsque la page est chargée
document.addEventListener("DOMContentLoaded", remplirFormulaireAleatoire);


document.getElementById('lastRechercheForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nom = document.getElementById('nomRecherche').value;
  console.log("Données envoyées à /last_recherche : ", { nom });

  try {
    //const response = await fetch(`http://localhost:8000/last_recherche?nom=${nom}`);
    const response = await fetch(`https://tolerant-namely-swift.ngrok-free.app/last_recherche?nom=${nom}`, {
      headers: {
        "ngrok-skip-browser-warning": "1"
      },
    });

    if (!response.ok) {
      throw new Error('Aucun document trouvé');
    }
    const result = await response.json();
    console.log("Réponse de /last_recherche : ", result);
    document.getElementById('lastRechercheResult').textContent = `Résultat : ${JSON.stringify(result)}`;
  } catch (error) {
    console.log("Erreur lors de la recherche dans /last_recherche : ", error.message);
    document.getElementById('lastRechercheResult').textContent = `Erreur : ${error.message}`;
  }
});

async function demanderEtEnvoyerNotification() {
  if (!("Notification" in window)) {
    alert("Les notifications ne sont pas supportées par ce navigateur.");
    return;
  }

  console.log("Demande de permission de notification");
  const permission = await Notification.requestPermission();
  console.log("Permission obtenue : ", permission);
  
  if (permission !== "granted") {
    alert("Permission de notification refusée.");
    return;
  }

  console.log("Envoi de la notification");
  const notification = new Notification("Notification de Test", {
    body: "Ceci est un test de notification pour l'état des plantes.",
    //icon: "URL_de_icone.png" // Optionnel
  });

  notification.onclick = function (event) {
    event.preventDefault();
    window.open("https://github.com/HugoSvy/Edgar-Client", "_blank");
  };
}


// Ajouter un événement au bouton pour déclencher la notification
document.getElementById('notificationButton').addEventListener('click', demanderEtEnvoyerNotification);
