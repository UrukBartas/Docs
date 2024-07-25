const fs = require('fs');
const axios = require('axios');
const path = require('path');

const baseApi = 'https://api.urukbartas.com/';
// URLs de tu backend
const API_URLS = [
    { url: `${baseApi}stats/ganked-monsters-rates`, name: 'ganked-monsters-rates' },
    { url: `${baseApi}stats/drop-rates-quest`, name: 'drop-rates-quest' },
    { url: `${baseApi}stats/lootbox-drop-rate/Lootbox`, name: 'lootbox-drop-rate' },
    { url: `${baseApi}stats/factors`, name: 'factors' },
    { url: `${baseApi}stats/get-quest-roll`, name: 'quest-roll' },  // Nueva URL agregada aquí
];

// Función para obtener datos del backend
async function fetchBackendData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// Función para generar contenido Markdown para "ganked-monsters-rates"
function generateMarkdownGankedMonsters(data, title) {
    let markdownContent = `# ${title}\n\n`;

    for (const rarity in data) {
        markdownContent += `## ${rarity.charAt(0) + rarity.slice(1).toLowerCase()}\n\n`;
        markdownContent += `| Monster   | Chance       |\n`;
        markdownContent += `|-----------|--------------|\n`;

        data[rarity].forEach(item => {
            markdownContent += `| ${item.monster} | ${(item.chance * 100).toFixed(2)}% |\n`;
        });

        markdownContent += '\n';
    }

    return markdownContent;
}

// Función para generar contenido Markdown para "drop-rates-quest"
function generateMarkdownDropRates(data, title) {
    let markdownContent = `# ${title}\n\n`;
    markdownContent += `| Rarity    | Drop Chance  |\n`;
    markdownContent += `|-----------|--------------|\n`;

    for (const rarity in data) {
        markdownContent += `| ${rarity.charAt(0) + rarity.slice(1).toLowerCase()} | ${data[rarity]}% |\n`;
    }

    markdownContent += `\nNote: For each quest completed, there is an additional 3-5% chance to receive an item of a higher rarity.\n`;

    return markdownContent;
}

// Función para generar contenido Markdown para "lootbox-drop-rate"
function generateMarkdownLootboxDropRates(data, title) {
    let markdownContent = `# ${title}\n\n`;

    for (const lootbox in data) {
        markdownContent += `## ${lootbox.charAt(0) + lootbox.slice(1).toLowerCase()} Lootbox\n\n`;
        markdownContent += `| Rarity of Item | Chance       |\n`;
        markdownContent += `|----------------|--------------|\n`;

        for (const rarity in data[lootbox]) {
            markdownContent += `| ${rarity.charAt(0) + rarity.slice(1).toLowerCase()} | ${(data[lootbox][rarity] * 100).toFixed(2)}% |\n`;
        }

        markdownContent += '\n';
    }

    return markdownContent;
}

// Función para generar contenido Markdown para "factors"
function generateMarkdownFactors(data, title) {
    let markdownContent = `# ${title}\n\n`;
    markdownContent += `| Factor                  | Value        |\n`;
    markdownContent += `|-------------------------|--------------|\n`;
    markdownContent += `| Experience              | ${data.experience}  |\n`;
    markdownContent += `| Item Shop Price Factor  | ${data.itemShopItemPriceFactor}  |\n`;
    markdownContent += `| Item Roll Price Factor  | ${data.itemRollPriceFactor}  |\n`;
    markdownContent += `\n`;

    markdownContent += `## Descriptions\n\n`;
    markdownContent += `- **Experience**: The factor of experience gained in the game. If it is 1, there is no bonus or penalty on the base experience obtained.\n`;
    markdownContent += `- **Item Shop Price Factor**: The factor for the prices of items in the shop.\n`;
    markdownContent += `- **Item Roll Price Factor**: The factor paid over the price of item rolls. Each time you roll, you pay more, but you can get better items.\n`;

    return markdownContent;
}

// Nueva función para generar contenido Markdown para "quest-roll"
function generateMarkdownQuestRoll(data, title) {
    let markdownContent = `# ${title}\n\n`;

    data.forEach(item => {
        const rangeText = `${item.range[0]} - ${item.range[1] !== null ? item.range[1] : '∞'}`;
        markdownContent += `## Level Range: ${rangeText}\n\n`;
        markdownContent += `| Rarity    | Chance       |\n`;
        markdownContent += `|-----------|--------------|\n`;

        for (const rarity in item.chances) {
            markdownContent += `| ${rarity.charAt(0) + rarity.slice(1).toLowerCase()} | ${(item.chances[rarity] * 100).toFixed(2)}% |\n`;
        }

        markdownContent += '\n';
    });

    return markdownContent;
}

// Función principal
async function main() {
    const dir = path.join(__dirname, 'in-game-chances');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    for (const { url, name } of API_URLS) {
        const data = await fetchBackendData(url);
        if (data) {
            let markdownContent;
            if (name === 'ganked-monsters-rates') {
                markdownContent = generateMarkdownGankedMonsters(data, name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()));
            } else if (name === 'drop-rates-quest') {
                markdownContent = generateMarkdownDropRates(data, name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()));
            } else if (name === 'lootbox-drop-rate') {
                markdownContent = generateMarkdownLootboxDropRates(data, name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()));
            } else if (name === 'factors') {
                markdownContent = generateMarkdownFactors(data, name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()));
            } else if (name === 'quest-roll') {  // Nuevo caso manejado aquí
                markdownContent = generateMarkdownQuestRoll(data, name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()));
            }
            const filePath = path.join(dir, `${name}.md`);
            fs.writeFileSync(filePath, markdownContent);
            console.log(`Documentation for ${name} generated successfully.`);
        }
    }
}

main();
