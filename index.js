const azureSb = require('azure-sb');

const serviceBusService = azureSb.createServiceBusService(process.env.connectionString);

// see https://github.com/Azure/azure-sdk-for-node/blob/master/lib/services/serviceBus/lib/servicebusservice.js#L730
const options = {
    MaxSizeInMegabytes: process.env.maxSizeInMb,
    DefaultMessageTimeToLive: process.env.defaultMsgTtl,
    RequiresDuplicateDetection: (process.env.enableDuplicateDetection === 'true'),
    DuplicateDetectionHistoryTimeWindow: process.env.duplicateDetectionWindow,
    MaxSubscriptionsPerTopic: process.env.maxSubscriptions,
    MaxSqlFiltersPerTopic: process.env.maxSqlFilters,
    MaxCorrelationFiltersPerTopic: process.env.maxCorrelationFilters,
    DeadLetteringOnMessageExpiration: (process.env.enableDeadLetteringOnMsgExp === 'true'),
    EnableDeadLetteringOnFilterEvaluationExceptions: (process.env.enableDeadLetteringOnFilterEvalException === 'true'),
    SupportOrdering: (process.env.enableOrdering === 'true'),
    EnablePartitioning: (process.env.enablePartitioning === 'true')
};

serviceBusService.createTopicIfNotExists(
    process.env.name,
    options,
    error => {
        if (error) {
            throw error;
        }
        // Topic was created or exists
        console.log('topic created or exists.');
    }
);