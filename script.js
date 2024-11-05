document.getElementById('etatGlobalForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const temperature = document.getElementById('temperature').value;
  const humidite = document.getElementById('humidite').value;
  const luminosite = document.getElementById('luminosite').value;
  const reservoir = document.getElementById('reservoir').value;
  const date = document.getElementById('date').value;

  try {
    const response = await fetch('http://localhost:8000/etatGlobal', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom,
        temperature,
        humidite,
        luminosite,
        reservoir,
        date
      })
    });
    const result = await response.text();
    document.getElementById('etatGlobalResult').textContent = `Résultat : ${result}`;
  } catch (error) {
    document.getElementById('etatGlobalResult').textContent = `Erreur : ${error.message}`;
  }
});

document.getElementById('lastRechercheForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nom = document.getElementById('nomRecherche').value;

  try {
    const response = await fetch(`http://localhost:8000/last_recherche?nom=${nom}`);
    if (!response.ok) {
      throw new Error('Aucun document trouvé');
    }
    const result = await response.json();
    document.getElementById('lastRechercheResult').textContent = `Résultat : ${JSON.stringify(result)}`;
  } catch (error) {
    document.getElementById('lastRechercheResult').textContent = `Erreur : ${error.message}`;
  }
});
