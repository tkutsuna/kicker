'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync'); // requiring sync module
const rp = require('request-promise');

const csvFileName = 'input.csv';
const WAIT_TIME = 3000;

async function main() {
    let csvFile = fs.readFileSync(csvFileName);
    let data = parse(csvFile);

    for (let row of data) {
        const url = row[0];
        if (!url) continue;

        process.stdout.write(url);
        let result = await rp(url);
        console.log(`\t${!!result}`);
        await sleep(WAIT_TIME);
    }
}

function sleep(time) {
    return new Promise(r => setTimeout(r, time));
}

main();
