'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync'); // requiring sync module
const rp = require('request-promise');

const csvFileName = 'input.csv';
const baseUrl = 'http://wwwdev.mapfan.com';
const WAIT_TIME = 3000;

async function main() {
    const http = rp.defaults({ headers: { 'User-Agent': 'request' } });
    // const http = rp;
    let csvFile = fs.readFileSync(csvFileName);
    let data = parse(csvFile);

    for (let row of data) {
        let url = row[0];
        if (!url) continue;

        url = baseUrl + url;
        process.stdout.write(url);
        let result = await http.get(url).catch(err => console.log(err));
        console.log(`\t${!!result}`);
        await sleep(WAIT_TIME);
    }
}

function sleep(time) {
    return new Promise(r => setTimeout(r, time));
}

main();
