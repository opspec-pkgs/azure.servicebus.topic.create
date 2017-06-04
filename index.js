const azure = require('azure');

const serviceBusService = azure.createServiceBusService(process.env.connectionString);

// see https://github.com/Azure/azure-sdk-for-node/blob/master/lib/services/serviceBus/lib/servicebusservice.js#L730
serviceBusService.createTopicIfNotExists(
    process.env.connectionString,
    {
        MaxSizeInMegabytes: process.env.maxSizeInMb,
    },
    error => {
        if (error) {
            throw error;
        }
        // Topic was created or exists
        console.log('topic created or exists.');
    }
);