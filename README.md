# problem statement
creates an azure servicebus topic (if it doesn't already exist)

# example usage

> note: in examples, VERSION represents a version of the azure.servicebus.topic.create pkg

## install

```shell
opctl pkg install github.com/opspec-pkgs/azure.servicebus.topic.create#VERSION
```

## run

```
opctl run github.com/opspec-pkgs/azure.servicebus.topic.create#VERSION
```

## compose

```yaml
run:
  op:
    pkg: { ref: github.com/opspec-pkgs/azure.servicebus.topic.create#VERSION }
    inputs: 
      subscriptionId:
      location:
      loginId:
      loginSecret:
      loginTenantId:
      name:
      namespace:
      resourceGroup:
      # begin optional args
      autoDeleteOnIdle:
      defaultMessageTimeToLive:
      duplicateDetectionHistoryTimeWindow:
      enableBatchedOperations:
      enableExpress:
      enablePartitioning:
      enableSubscriptionPartitioning:
      filteringMessagesBeforePublishing:
      isAnonymousAccessible:
      loginType:
      maxSizeInMegabytes:
      requiresDuplicateDetection:
      supportOrdering:
      # end optional args
```
