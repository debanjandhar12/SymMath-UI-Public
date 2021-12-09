const CosmosClient = require('@azure/cosmos').CosmosClient
const endpoint = 'https://symmath-ui-db-account.documents.azure.com:443/';
const key = 'secret';
const databaseId = 'SymMath-UI-DB';
const containerId = 'UserWorksheets';
const partitionKey = { kind: 'Hash', paths: ['/id'] }

const client = new CosmosClient({endpoint: endpoint,key: key,userAgentSuffix: 'SymMath Server'});


class SymMathDB {
    static async initialize() {
        const { database } = await client.databases.createIfNotExists({
            id: databaseId
        });
        const { container } = await client.database(databaseId).containers.createIfNotExists(
          { id: containerId, partitionKey }
        );
    }
    static async setEqnSheet(id, EqnSheet) {
        console.log(EqnSheet);
        const { item } = await client.database(databaseId).container(containerId).items.upsert({id: id, sheet1: EqnSheet});
    }
    static async getEqnSheet(id) {
        let q = await client.database(databaseId).container(containerId).items.query(`SELECT * FROM c WHERE c.id = "${id}"`).fetchNext();
        if(q.resources[0])
            return q.resources[0].sheet1;
        else return [];
    }
}
module.exports = SymMathDB;