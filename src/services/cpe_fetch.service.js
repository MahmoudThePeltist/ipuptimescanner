const knex = require("./knex.service");
const { performance } = require("perf_hooks");
const cron = require("node-cron");
const axios = require('axios');

// cron.schedule("*/10 * * * * *", () => fetchCPEs());


const getCPEsAndBuild = async () => {
    try {
        myCPEs = await fetchCPEsFromSector('127.0.0.1', '8080', '10.50.8.104', '300');

        myCPEs.forEach((cpe, index) => {

            data = {
                name: cpe.ContractNumber,
                address: cpe.IP,
                type: "cpe",
                attributes: JSON.stringify({
                    coordinates: { x: cpe.Coords.Longitude, y: cpe.Coords.Latitude }
                }),
                description: "Retrived from NP tool.",
            };
            
            let clientsFound = checkForClient(cpe.IP);
            clientsFound.length ? updateClient(data, rows[0].id) : createClient(data);
        })
    } catch(error) {
        console.warn("fetchCPEsFromSector() error: ", error);
    }

}

const checkForClient = async (ip) => {
    try {
        return await knex("clients").where("address", ip);
    } catch (error) {
        console.log("checkForClient() error ", error);
    }
}

const createClient = async (data) => {
    try {
        let response = await knex("clients").insert(data);
        console.log("successfully inserted a new client from np tool.");
    } catch (error) {
        console.log("createClient() error ", error);
    }
}


const updateClient = async (data, id) => {
    try {
        let response = await knex("clients").where("id", id).update(data);
        console.log("successfully updated a client from np tool.");
    } catch (error) {
        console.log("updateClient() error ", error);
    }
}


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
        throw(error);
    }

}

module.exports = getCPEsAndBuild;