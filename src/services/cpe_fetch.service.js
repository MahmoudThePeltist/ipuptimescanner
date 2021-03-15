const knex = require("./knex.service");
const { performance } = require("perf_hooks");
const cron = require("node-cron");
const axios = require('axios');

// cron.schedule("*/10 * * * * *", () => fetchCPEs());


 const fetchCPEsFromSector = async (serverIP, serverPort=8080, sectorIP, errorMargin = 300) => {

    let url = `http://${serverIP}:${serverPort}/coords?ip=${sectorIP}&errorMargin=${errorMargin}`;
        
    let validDevices = [];
    let deviceErrors = 0;
    let coordinateErrors = 0;
    
    try {
        cpeData = await axios.get(url);

        cpeData?.data?.Devices.forEach((device, index) => {
            if(!!device.Err) {
                // console.log(index, " - Device Error ", device.Err);
                deviceErrors += 1;
            } else if(!!device.Coords.Err) {
                // console.log(index, " - Coords Error ", device.Err);
                coordinateErrors += 1;
            } else {
                // console.log(index, " - device ", device);
                validDevices.push(device);
            }
        })

        console.log("devices: ", cpeData?.data?.Devices.length," working devices: ", validDevices.length, " device errors: ", deviceErrors, " coords errors: ", coordinateErrors);

        return validDevices;
    } catch(error) {
        console.warn("fetchCPEsFromSector() error: ", error);
        return error;
    }

}

module.exports = fetchCPEsFromSector;