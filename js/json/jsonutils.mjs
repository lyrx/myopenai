import fs from 'fs/promises';
import path from 'path';

async function parseJSONFile(aFile) {
    try {
        // Check if the input file exists
        try {
            await fs.access(aFile);
        } catch (err) {
            console.error(`Input file '${aFile}' does not exist.`);
            return;
        }

        // Read the input JSON file
        const data = await fs.readFile(aFile, 'utf8');
        return data;
    }
    catch (err) {
        console.error('Error:', err);
    }
}

export { parseJSONFile };
