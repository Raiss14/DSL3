// Récupération des valeurs d'entrée
function getValues() {
    const montant = Math.abs(document.getElementById('inputMontant').valueAsNumber) || 0;
    const annee = Math.abs(document.getElementById('inputAnnee').valueAsNumber) || 0;
    const mois = annee * 12 || 1;
    const taux = Math.abs(document.getElementById('inputTaux').valueAsNumber) || 0;
    const tauxMensuel = taux / 100 / 12;
    
    return { montant, annee, mois, taux, tauxMensuel };
  }
  
  // Calcul de la mensualité
  function calculMensualite(montant, tauxMensuel, mois) {
    if (tauxMensuel) {
      return montant * tauxMensuel / (1 - Math.pow(1 / (1 + tauxMensuel), mois));
    } else {
      return montant / mois;
    }
  }
  
  // Calcul de l'amortissement
  function calculAmortissement(montant, tauxMensuel, mois, annee) {
    const remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
    let balance = montant; // Capital restant
    const amortissementM = [];
    
    // Parcours des années et mois
    for (let y = 0; y < annee; y++) {
      for (let m = 0; m < 12; m++) {
        const interestM = balance * tauxMensuel; // Intérêt mensuel
        const capitalM = remboursementMensuel - interestM; // Capital remboursé mensuel
        balance -= capitalM; // Mise à jour du capital restant
  
        amortissementM.push({
          remboursementMensuel,
          capitalAmorti: capitalM,
          interet: interestM,
          capitalRestantDu: balance
        });
  
        // Sortir de la boucle si le capital est totalement remboursé
        if (balance <= 0) break;
      }
    }
  
    return { remboursementMensuel, amortissementM };
  }
  
  // Remplir le tableau avec les résultats
  function remplirTableau(amortissement) {
    let html = `
      <thead>
        <tr>
          <th>Période</th>
          <th>Capital Amorti</th>
          <th>Intérêts</th>
          <th>Capital restant dû</th>
          <th>Mensualité</th>
        </tr>
      </thead>
      <tbody>
    `;
    
    amortissement.forEach(({ remboursementMensuel, capitalAmorti, interet, capitalRestantDu }, index) => {
      const rowClass = Math.round(capitalAmorti) < Math.round(interet) ? "warning" : "";
      html += `
        <tr class="${rowClass}">
          <td>${index + 1}</td>
          <td>${Math.round(capitalAmorti)}</td>
          <td>${Math.round(interet)}</td>
          <td>${Math.round(capitalRestantDu)}</td>
          <td>${Math.round(remboursementMensuel)}</td>
        </tr>
      `;
    });
  
    html += '</tbody>';
    document.getElementById("inputMensualite").innerHTML = html;
  }
  
  // Gestion des événements sur le bouton calcul
  document.getElementById("btnCalculer").addEventListener("click", function() {
    const { montant, tauxMensuel, mois, annee } = getValues();
  
    // Calculer et remplir le tableau avec l'amortissement
    const { amortissementM } = calculAmortissement(montant, tauxMensuel, mois, annee);
    remplirTableau(amortissementM);
  });
  