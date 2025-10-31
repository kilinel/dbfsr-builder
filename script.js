// Variáveis de controle dos stats e pontos
let level = 1; // Nível inicial
let maxLevel = 155; // Definido pelo release, 131 é o limite de skill points
let spentPoints = {
  healthMax: 0,
  kiMax: 0,
  kiDmg: 0,
  meleeDmg: 0,
  kiRes: 0,
  meleeRes: 0,
  speed: 0
};

let baseStats = {
  healthMax: 0,
  kiMax: 0,
  kiDmg: 0,
  meleeDmg: 0,
  kiRes: 0,
  meleeRes: 0,
  speed: 0
};

let previousStatValues = {
  healthMax: 0,
  kiMax: 0,
  kiDmg: 0,
  meleeDmg: 0,
  kiRes: 0,
  meleeRes: 0,
  speed: 0
};

const itemBuffs = {
  healthMax: [],
  kiMax: [],
  kiDmg: [],
  meleeDmg: [],
  kiRes: [],
  meleeRes: [],
  speed: []
};

const subraceModifiers = {
  Generic: { higher: [], lower: [] },
  Yardrat: { higher: [], lower: [] },
  Mushroom: { higher: [], lower: [] },
  Saibaman: { higher: [], lower: [] },
  Pikkon: { higher: ['kiDmg'], lower: ['speed'] },
  Appule: { higher: ['meleeDmg'], lower: ['meleeRes'] },
  Burter: { higher: ['speed'], lower: ['meleeDmg'] },
  Beerus: { higher: ['kiDmg'], lower: ['kiRes'] },
  Dodoria: { higher: ['meleeRes', 'kiRes'], lower: ['kiDmg', 'meleeDmg'] }

};


const items = {
  item1: { name: 'Healthy Capsule', description: 'Increases your HealthMax stat by 25.', healthMax: 25, kiMax: 0, kiDmg: 0, meleeDmg: 0, kiRes: 0, meleeRes: 0, speed: 0 },
  item3: { name: 'Backstab Capsule', description: 'Increases damage when attacking opponents from behind.', healthMax: 0, kiMax: 0, kiDmg: 0, meleeDmg: 0, kiRes: 0, meleeRes: 0, speed: 0 },
  item4: { name: 'Demon Eye Capsule', description: 'Heal a portion of your health when you defeat an enemy.', healthMax: 0, kiMax: 0, kiDmg: 0, meleeDmg: 0, kiRes: 0, meleeRes: 0, speed: 0 },
  item5: { name: 'Charge Capsule', description: '(Active Capsule) Temporarily gain 3 extra vanish dodges (changing forms removes them)', healthMax: 0, kiMax: 0, kiDmg: 0, meleeDmg: 0, kiRes: 0, meleeRes: 0, speed: 0 },
  item6: { name: 'Stealth Capsule', description: 'Enemy detection radius is reduced' },
  item7: { name: 'Yardratian Capsule', description: 'Gives 5% extra damage to Yardratians' },
  item8: { name: 'Harmony Capsule', description: 'Increases the level-range that you can fuse with.' },
  item9: { name: 'Refrigerator Capsule', description: '(Active Capsule) Contains a refrigerator with 4 Hetaps inside; has a 5 minute cooldown. Heals Ki/HP when drank.' },
  item10: { name: 'Garden Capsule', description: '(Active Capsule) A capsule containing a small garden; can be upgraded to have up to 8 plots, plants can range from 0-3 senzu beans harvested depending on how long you let them cultivate for.' },
  item11: { name: 'Black Flash Capsule', description: 'At the pinnacle of your concentration, create a distortion in space that greatly amplifies your physical strike.' },
  item12: { name: 'Speed Capsule', description: 'Increases your speed by 25! Wow!', speed: 25 },
  item13: { name: 'Life Capsule', description: 'Gives passive health regeneration at all times.' },
  item14: { name: 'Surge Capsule', description: 'Increases the charge speed of Ki attacks.' },
  item15: { name: "Hero's Flute Capsule", description: 'Increases damage against "giant-type" enemies by 15%' },
  item16: { name: 'Rush-down Capsule', description: 'Increases the speed of your rush attacks.' },
  item17: { name: 'Harmony Capsule', description: 'Increases the level-range that you can fuse with.' },
  item18: { name: 'Reversal Capsule', description: 'Get health back on hit instead of Ki.' },
  item19: { name: 'Rush-down Capsule', description: 'Increases the speed of your rush attacks.' },
  item20: { name: 'Power Capsule', description: 'Adds +10 to all damage stats.', kiDmg: 10, meleeDmg: 10 },
  item21: { name: 'Ki Capsule', description: 'Gives passive Ki regeneration when not transformed; For androids, increases Ki regeneration' },
  item22: { name: 'Weighted Clothing Capsule', description: 'Reduces speed but increases experience gained.' },
  item23: { name: 'Gravity Chamber Capsule', description: '(Active Capsule) Contains a gravity chamber; which has a 20 minute cooldown.' },
  item24: { name: 'Beckoning Cat Capsule', description: '+10% rewarded Zenni, -15%  Ki and Melee Damage.' },
  item25: { name: 'Breakthrough Capsule', description: 'At below 25% HP, do 30% more outgoing damage (both Melee or Ki damage) but skills take 10% more Ki to use.' },
  item26: { name: 'Burning Fighter Capsule', description: 'Transformation stats are increased but their passive Ki drain is also increased.' },
  item28: { name: 'Dragon Jewel Capsule', description: 'Reduces passive Ki drain on transformations.' },
  item29: { name: 'Defense Capsule', description: '+10 to all resistance stats.', meleeRes: 10, kiRes: 10 },
  item30: { name: 'Energizer Capsule', description: 'Increases the max size of beam attacks.' },
  item31: { name: 'Travel Capsule', description: 'Increases your maximum fast flight speed and acceleration.' },
  item32: { name: 'Zenni Bank Capsule', description: 'Reduces the amount of Zenni lost on death.' },
  item33: { name: 'Overdrive Capsule', description: 'Your Ki skills cost 0 ki within 3 seconds after transformation.' },
  item34: { name: 'Fundamentals Capsule', description: 'Base combat deals 1.5x damage, while skills deal half damage.' },
  item35: { name: 'Iron Wall Capsule', description: 'Take Less damage from physical attacks.' },
  item36: { name: 'Energy Field Capsule', description: 'Take less damage from Ki attacks.' },
  item37: { name: 'Hermit Shell Capsule', description: 'M1-attacks from behind only inflict weak stun and deal less damage.' },
  item38: { name: 'Motorcycle Capsule', description: '(Active Capsule) Spawns a rideable motorcycle.' },
  item39: { name: 'Power Bomb Capsule', description: 'Reduces the max charge time of Bomb Ki attacks' },
  item40: { name: 'Earthling Capsule', description: 'Gives 5% extra damage to Humans.' },
  item41: { name: 'Eternal Youth Capsule', description: 'You no longer lose EXP on death, however, your EXP passively drains.' },
  item42: { name: 'Intense Focus Capsule', description: 'Charge Ki 5% faster.' },
  item43: { name: 'Sadistic Dance Capsule', description: 'Inflict a slow debuff on enemies you guard break.' },
  item44: { name: 'Blast Amplifier Capsule', description: 'Increases the damage of basic Ki Blast.' },
  item45: { name: 'Gum Gum Rocket Capsule', description: "Become able to chase attack a target you've knocked away with Gum Gum Bazooka." },

};


// Referências do DOM
const levellimitInput = document.getElementById('level-limit');
const levelInput = document.getElementById('level');
const skillPointsInput = document.getElementById('skillPoints');
const raceSelect = document.getElementById('raceSelect');
const versionSelect = document.getElementById('versionSelect');

// Função para atualizar os stats após um level up
function levelupUpdateStats(stat) {
  let totalBuff = 0;

  // Soma todos os buffs aplicados a esse stat
  itemBuffs[stat].forEach(buff => {
    totalBuff += buff;
  });

  const race = raceSelect.value;
  const subraceSelect = document.getElementById("subraceSelect");
  const subrace = subraceSelect ? subraceSelect.value : null;

  let higher = [];
  let lower = [];

  if (race === 'Alien' && subrace && subraceModifiers[subrace]) {
    ({ higher, lower } = subraceModifiers[subrace]);
  }

  let levelBonus;

  if (raceSelect.value === 'Android') {
    levelBonus = level; // Android ganha 1 por nível
  }
  else if (raceSelect.value === 'Saiyan') {
    levelBonus = Math.floor(level / 3);
  }
  else {
    // Aliens subraces
    if (higher.includes(stat)) {
      levelBonus = level;
    } else if (lower.includes(stat)) {
      levelBonus = Math.floor(level / 3);
    } else {
      levelBonus = Math.floor(level / 2);
    }
  }

  baseStats[stat] = levelBonus + spentPoints[stat] + totalBuff;


  // Atualiza a exibição do stat no DOM
  const statElement = document.getElementById(`${stat}_base_show`);
  statElement.textContent = `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${baseStats[stat] - spentPoints[stat]} (Base) | Skill Points: ${spentPoints[stat]} | Item Buffs: ${totalBuff}`;
}


function updateStats() {

  const slot1Value = document.getElementById('slot1').value;
  const slot2Value = document.getElementById('slot2').value;
  const slot3Value = document.getElementById('slot3').value;
  const slot4Value = document.getElementById('slot4').value;

  updateItemDescription('slot1', slot1Value);
  updateItemDescription('slot2', slot2Value);
  updateItemDescription('slot3', slot3Value);
  updateItemDescription('slot4', slot4Value);

  preventDuplicateItems();
  // Limita o número de skill points que podemos gastar de acordo com o nível
  const totalSpentPoints = Object.values(spentPoints).reduce((a, b) => a + b, 0);
  if (totalSpentPoints > 2) {
    level = totalSpentPoints; // A cada skill point gasto, o nível sobe 1

  }
  const race = raceSelect.value; // obtém a raça atual
  const maxSpentPoints = parseInt(levellimitInput.value); // Limite de skill points baseado no nível máximo

  // Ajuste no nível para não ultrapassar o limite
  level = Math.min(level, maxSpentPoints);

  let maxSpendablePoints = maxSpentPoints;
  if (race === "Namekian") {
    maxSpendablePoints += 40; // +40 pontos extras para gastar, sem subir de nível
  }



  if (totalSpentPoints > maxSpendablePoints) {
    // Se ultrapassou o limite, ajusta os pontos para o máximo permitido
    Object.keys(spentPoints).forEach(stat => {
      spentPoints[stat] = Math.max(0, Math.min(spentPoints[stat], maxSpendablePoints)); // Garante que nenhum stat ultrapasse o limite
    });
  }


  // Atualiza os base stats com base no nível
  ['healthMax', 'kiMax', 'kiDmg', 'meleeDmg', 'kiRes', 'meleeRes', 'speed'].forEach(stat => {
    levelupUpdateStats(stat);
  });

  // Atualiza os valores dos stats no DOM
  ['healthMax', 'kiMax', 'kiDmg', 'meleeDmg', 'kiRes', 'meleeRes', 'speed'].forEach(stat => {
    document.getElementById(stat).value = baseStats[stat];
  });

  // Atualiza o número de pontos restantes
  const remainingPoints = Math.max(0, maxSpendablePoints - totalSpentPoints);
  skillPointsInput.value = remainingPoints;

  // Atualiza o nível no input
  levelInput.value = level;


}

function handleStatChange(stat) {
  const currentValue = parseInt(document.getElementById(stat).value) || 0;
  const previousValue = previousStatValues[stat];

  // Calcula a diferença e atualiza os pontos gastos
  const difference = currentValue - previousValue;
  if (difference !== 0) {
    spentPoints[stat] += difference;
    previousStatValues[stat] = currentValue;
    updateStats();
  }
}



// Função para adicionar pontos aos stats
function addPoints(stat) {
  const race = raceSelect.value;
  const totalSpentPoints = Object.values(spentPoints).reduce((a, b) => a + b, 0);

  // Limite baseado no nível máximo (sem bônus)
  const maxLevel = parseInt(levellimitInput.value);

  // Limite real de pontos que podem ser gastos (com bônus se Namekian)
  let maxSpendablePoints = maxLevel;
  if (race === "Namekian") {
    maxSpendablePoints += 40;
  }

  if (totalSpentPoints < maxSpendablePoints) {
    spentPoints[stat] += 1; // Adiciona um ponto ao stat
    updateStats(); // Atualiza os stats e o nível
  }
}

// Função para remover pontos dos stats
function removePoints(stat) {
  if (spentPoints[stat] > 0) {
    spentPoints[stat] -= 1; // Remove um ponto do stat
    updateStats(); // Atualiza os stats e o nível
  }
}


// Evento para atualizar a versão (Release) e os limites de skill points
versionSelect.addEventListener('change', () => {
  const ver = versionSelect.value;
  maxLevel = ver === "release" ? 155 : 232; // Altere os limites de acordo com a versão selecionada
  levellimitInput.value = maxLevel
  updateStats();
});

// Função de reset (reseta tudo para o inicial)
document.getElementById('resetBtn').addEventListener('click', () => {
  spentPoints = { healthMax: 0, kiMax: 0, kiDmg: 0, meleeDmg: 0, kiRes: 0, meleeRes: 0, speed: 0 };
  baseStats = { healthMax: 1, kiMax: 1, kiDmg: 1, meleeDmg: 1, kiRes: 1, meleeRes: 1, speed: 1 };
  level = 1;
  updateStats();
});

// Inicializa os stats ao carregar a página
updateStats();


function showTab(tabId) {
  // Esconde todas as abas
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.style.display = 'none';
    tab.classList.remove('active');
  });

  // Exibe a aba clicada
  const tab = document.getElementById(tabId);
  tab.style.display = 'block';
  tab.classList.add('active');


}


// Inicializa a página com a aba "Construir Build" visível
document.addEventListener('DOMContentLoaded', () => {
  showTab('builderTab');

  const btn = document.getElementById('btnCapture');

  btn.addEventListener('click', () => {
    const element = document.getElementById('builderTab');

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'captura.png';
      link.click();
    });
  });
});

// Função de exemplo para salvar a build (você pode implementar a lógica)
function saveBuild() {
  const level = document.getElementById('level').value;
  const speed = document.getElementById('speed').value;
  const kiDmg = document.getElementById('kiDmg').value;
  const meleeDmg = document.getElementById('meleeDmg').value;

  console.log(`Build salva com os seguintes dados:
    Nível: ${level}, Speed: ${speed}, Ki Damage: ${kiDmg}, Melee Damage: ${meleeDmg}`);
}

// Função para calcular a situação da build (conforme já discutido)
function calculateBuildStatus() {
  const currentRace = document.getElementById('currentraceSelect').value; // A raça será uma string
  const currentLevel = parseInt(document.getElementById('currentLevel').value);
  const currenthealthMax = parseInt(document.getElementById('currenthealthMax').value);
  const currentkiMax = parseInt(document.getElementById('currentkiMax').value);
  const currentKiDmg = parseInt(document.getElementById('currentkiDmg').value);
  const currentMeleeDmg = parseInt(document.getElementById('currentmeleeDmg').value);
  const currentKiRes = parseInt(document.getElementById('currentkiRes').value);
  const currentMeleeRes = parseInt(document.getElementById('currentmeleeRes').value);
  const currentSpeed = parseInt(document.getElementById('currentspeed').value);

  if (!currentLevel || !currenthealthMax || !currentkiMax || !currentKiDmg || !currentMeleeDmg || !currentKiRes || !currentMeleeRes || !currentSpeed) {
    // Exibe a mensagem de erro
    document.getElementById('error-message').style.display = 'block';
    return; // Interrompe a execução da função
  } else {
    // Se todos os campos foram preenchidos corretamente, esconda a mensagem de erro
    document.getElementById('error-message').style.display = 'none';
  }

  // Ajustando o bstat de acordo com a raça
  let bstat;
  if (currentRace === "Android") {
    // Para Android, o stat sobe a cada nível
    bstat = currentLevel;
  }
  else if (currentRace === 'Saiyan') {
    bstat = Math.floor(currentLevel / 3);
  }
  else {
    // Para outras raças, sobe 1 a cada 2 níveis
    bstat = Math.floor(currentLevel / 2);  // Arredonda para baixo
  }

  raceSelect.value = currentRace;

  // Inicialização de pontos de skill (2 pontos no nível 1, 3 pontos no nível 2, etc)
  let initialSkillPoints = currentLevel >= 1 ? 2 : 0; // Se nível for 1, começa com 2 pontos de skill

  // Calculando os pontos gastos (spentPoints)
  spentPoints = {
    healthMax: currenthealthMax - bstat,
    kiMax: currentkiMax - bstat,
    kiDmg: currentKiDmg - bstat,
    meleeDmg: currentMeleeDmg - bstat,
    kiRes: currentKiRes - bstat,
    meleeRes: currentMeleeRes - bstat,
    speed: currentSpeed - bstat
  };

  // Atualiza o nível baseado no total de pontos gastos
  level = currentLevel;

  // Calculando o total de spentPoints
  const totalSpentPoints = Object.values(spentPoints).reduce((a, b) => a + b, 0);

  // Se totalSpentPoints for maior que o limite de nível, ajusta
  const maxSpentPoints = currentLevel + initialSkillPoints; // O máximo de pontos que podem ser gastos é igual ao nível, com inicialização de pontos

  if (totalSpentPoints > maxSpentPoints) {
    // Ajusta os pontos gastos para não ultrapassarem o limite
    Object.keys(spentPoints).forEach(stat => {
      spentPoints[stat] = Math.min(spentPoints[stat], maxSpentPoints); // Garante que nenhum stat ultrapasse o limite
    });
  }

  // Atualiza os stats na tela
  updateStats();

  // Muda para a aba de builder após calcular
  showTab('builderTab');
}
function toggleSubraceCheckbox() {
  const raceSelect = document.getElementById('raceSelect');
  const subraceContainer = document.getElementById('subraceContainer');


  // Se a raça for Alien, exibe o contêiner com o checkbox e a label
  if (raceSelect.value === "Alien") {
    subraceContainer.style.display = 'block';  // Exibe a label e o checkbox

  } else {
    subraceContainer.style.display = 'none';   // Esconde a label e o checkbox

  }
}
document.getElementById('raceSelect').addEventListener('change', toggleSubraceCheckbox);
toggleSubraceCheckbox();

// CAPSULES


function isItemEquipped(itemName) {
  const slots = ['slot1', 'slot2', 'slot3', 'slot4'];
  for (let slot of slots) {
    const slotValue = document.getElementById(slot).value;
    // Verifica se o slot está preenchido com um item diferente de "none"
    if (slotValue !== 'none' && slotValue === itemName) {
      return true;
    }
  }
  return false;
}


// Função para exibir nome e descrição do item no slot
function updateItemDescription(slotId, item) {
  const infoElement = document.getElementById(slotId + '-info');
  if (item === 'none') {
    infoElement.textContent = ''; // Se não houver item, remove a descrição
  } else {
    const itemData = items[item];
    infoElement.textContent = `${itemData.name}: ${itemData.description}`;
  }
}

function preventDuplicateItems() {
  const selectedItems = {
    slot1: document.getElementById('slot1').value,
    slot2: document.getElementById('slot2').value,
    slot3: document.getElementById('slot3').value,
    slot4: document.getElementById('slot4').value,
  };

  // Filtra os itens selecionados para remover os valores 'none'
  const validItems = Object.values(selectedItems).filter(item => item !== 'none');

  // Verifica se algum item está repetido entre os slots (ignorando 'none')
  /*
  const itemsInUse = new Set(validItems);
   if (itemsInUse.size !== validItems.length) {
     // Se algum item foi repetido, impede a seleção duplicada
     alert('You cannot equip the same item in multiple slots.');
 
     // Reseta os slots com valores válidos
     Object.keys(selectedItems).forEach(slot => {
       const selectElement = document.getElementById(slot);
       selectElement.value = 'none'; // Reseta o slot
     });
   }
  */
}
function populateItemSelects() {
  const slots = ['slot1', 'slot2', 'slot3', 'slot4']; // IDs dos selects
  slots.forEach(slotId => {
    const selectElement = document.getElementById(slotId);

    // Limpa o conteúdo atual do select
    selectElement.innerHTML = '';

    // Adiciona a opção "None" (sem item)
    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'None';
    selectElement.appendChild(noneOption);

    // Adiciona as opções dos itens
    Object.keys(items).forEach(itemKey => {
      const option = document.createElement('option');
      option.value = itemKey;
      option.textContent = `${items[itemKey].name}`;
      selectElement.appendChild(option);
    });


    let optionsArray = Array.from(selectElement.options);



    selectElement.innerHTML = "";


    optionsArray.forEach(option => selectElement.appendChild(option));
    const choices = new Choices(selectElement, {
      searchEnabled: true,
      removeItemButton: true,
      placeholder: false,
      duplicateItemsAllowed: false,
      shouldSort: true,
      sortFields: ['label', 'value'],
      sorter: (a, b) => a.label.localeCompare(b.label),
      noResultsText: 'No Capsules found'
    });


    selectElement.value = 'none';

  });
}


const equippedItems = {
  slot1: null,
  slot2: null,
  slot3: null,
  slot4: null
};

function handleSlotSelection(slotId) {
  const slotElement = document.getElementById(slotId);
  const selectedItem = slotElement.value; // Obtém o item selecionado

  // Obtém o elemento onde as informações do item serão exibidas
  const infoElement = document.getElementById(`${slotId}-info`);

  const previousItem = equippedItems[slotId];

  if (previousItem && previousItem !== 'none') {

    updateStatsFromItem(slotId, previousItem, false); // Removendo o item anterior
  }

  // Verifica se o item selecionado é diferente de 'none'
  if (selectedItem !== 'none') {
    // Verifica se o item já está equipado em outro slot


    // Obtém os dados do item
    const item = items[selectedItem];

    // Aplica os buffs do item aos stats
    updateStatsFromItem(slotId, selectedItem, true); // Equipando o item
    equippedItems[slotId] = selectedItem
    // Exibe o nome e a descrição do item
    infoElement.textContent = `${item.name}: ${item.description}`;
  } else {

    infoElement.textContent = '';
  }

  // Atualiza os stats após a mudança
  updateStats();
}


function updateStatsFromItem(slotId, itemName, isEquipping) {
  const item = items[itemName]; // Obtém o item pelo nome

  if (!item) return; // Se o item não existir, nada será feito

  for (let stat in item) {
    if (item[stat] !== 0 && stat !== 'name' && stat !== 'description') {
      if (isEquipping) {
        // Se estamos equipando, adiciona o buff ao stat
        itemBuffs[stat].push(item[stat]);
      } else {
        // Se estamos removendo, remove o valor correspondente do array
        const index = itemBuffs[stat].indexOf(item[stat]);

        if (index !== -1) {

          itemBuffs[stat].splice(index, 1);
        }
      }
    }
  }
}





function Initialize() {
  populateItemSelects();
}

window.onload = Initialize;


