---
layout: posts
title:  "Extract K8 resources from namespace"
date:   2020-07-02
categories: kubernetes
---

# Chaos Day Summary:

 * Research: Read about DiRT (Disaster Recovery Tests) @ google - gave me same new ideas for more game days
 * Failure documentation about Log Appender

Unfortunately I had no time today for new chaos experiment, but I spent with @pihme some time to investigate how we can run the cluster plans in our gke.
We did a bit of progress. I'm finally able to create cluster plans in the ultratest and can extract all resource definitions via command line.

```shell
kubectl get pvc,configmap,service,deployment,statefulset,cronjob,storageclasses -o yaml --export | sed -e '/resourceVersion: "[0-9]\+"/d' -e '/uid: [a-z0-9-]\+/d' -e '/selfLink: [a-z0-9A-Z/]\+/d' -e '/status:/d' -e '/phase:/d' -e '/creationTimestamp:/d' > s-cluster.yaml
```

We now need to find a way to successfully deploy it in our cluster - it haven't been successful yet. We thought about using kustomize to adjust some values they use.
Much easier would be to just deploy the operator they use in our gke cloud and use the CRD to deploy the cluster plans. I think we need to investigate a bit more here what is the best approach. In the end I would like to run our chaos experiments against clusters which correspond to the real deployed ones.

## Participants

 * @pihme
 * @zelldon
