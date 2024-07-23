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
    markdownContent += `| Factor      | Value        |\n`;
    markdownContent += `|-------------|--------------|\n`;
    markdownContent += `| Experience  | ${(data.experience * 100).toFixed(2)}%  |\n`;

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
            }
            const filePath = path.join(dir, `${name}.md`);
            fs.writeFileSync(filePath, markdownContent);
            console.log(`Documentation for ${name} generated successfully.`);
        }
    }
}

main();
