const msRestAzure = require('ms-rest-azure');
const AzureArmSb = require('azure-arm-sb');
const process = require('process');

const login = async () => {
    console.log('logging in');

    const loginType = process.env.loginType;
    const loginId = process.env.loginId;
    const loginSecret = process.env.loginSecret;
    const loginOpts = {domain: process.env.loginTenantId};

    let response;
    if (loginType === 'sp') {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L397
        response = await msRestAzure.loginWithServicePrincipalSecret(loginId, loginSecret, loginOpts);
    } else {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L356
        response = await msRestAzure.loginWithUsernamePassword(loginId, loginSecret, loginOpts);
    }

    console.log('login successful');

    return response;
};

const createOrUpdate = async (credentials) => {
    console.log('creating/updating topic');

    const azureArmSb = new AzureArmSb(credentials, process.env.subscriptionId);

    // see https://github.com/Azure/azure-sdk-for-node/blob/master/lib/services/serviceBusManagement2/lib/operations/topics.js#L2455
    const options = {
        autoDeleteOnIdle: process.env.autoDeleteOnIdle,
        defaultMessageTimeToLive: process.env.defaultMessageTimeToLive,
        duplicateDetectionHistoryTimeWindow: process.env.duplicateDetectionHistoryTimeWindow,
        enableBatchedOperations: (process.env.enableBatchedOperations === 'true'),
        enableExpress: (process.env.enableExpress === 'true'),
        enablePartitioning: (process.env.enablePartitioning === 'true'),
        enableSubscriptionPartitioning: (process.env.enableSubscriptionPartitioning === 'true'),
        filteringMessagesBeforePublishing: (process.env.filteringMessagesBeforePublishing === 'true'),
        isAnonymousAccessible: (process.env.isAnonymousAccessible === 'true'),
        isExpress: (process.env.isExpress === 'true'),
        location: process.env.location,
        requiresDuplicateDetection: (process.env.requiresDuplicateDetection === 'true'),
        maxSizeInMegabytes: parseInt(process.env.maxSizeInMegabytes),
        supportOrdering: (process.env.supportOrdering === 'true'),
    };

    await azureArmSb.topics.createOrUpdate(
        process.env.resourceGroup,
        process.env.namespace,
        process.env.name,
        options
    );

    console.log('creating/updating topic successful');
};

login().then(createOrUpdate).catch(error => {
    console.log(error);
    process.exit(1)
});