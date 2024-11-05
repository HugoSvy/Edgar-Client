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
    const response = await fetch(`http://localhost:8000/etatGlobal?nom=${nom}&temperature=${temperature}&humidite=${humidite}&luminosite=${luminosite}&reservoir=${reservoir}&date=${date}`, {
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

document.getElementById('lastRechercheForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nom = document.getElementById('nomRecherche').value;
  console.log("Données envoyées à /last_recherche : ", { nom });

  try {
    const response = await fetch(`http://localhost:8000/last_recherche?nom=${nom}`);
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
