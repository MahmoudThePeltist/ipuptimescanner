const knex = require("./knex.service");
const { performance } = require("perf_hooks");
const cron = require("node-cron");
const axios = require('axios');

// cron.schedule("*/10 * * * * *", () => fetchCPEs());


 const fetchCPEsFromSector = async (serverIP, serverPort=8080, sectorIP, errorMargin = 300) => {

    let url = `http://${serverIP}:${serverPort}/coords?ip=${sectorIP}&errorMargin=${errorMargin}`;
    
    try {
        cpeData = await axios.get(url);
        console.log("fetchCPEsFromSector() ", cpeData);
        return cpeData;
    } catch(error) {
        console.warn("fetchCPEsFromSector() error: ", error);
        return error;
    }

}

module.exports = fetchCPEsFromSector;