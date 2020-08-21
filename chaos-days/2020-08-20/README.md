# Chaos Day Summary

In order to make our chaos experiments more realistic we have setup a new gke cluster, which is similar to the camunda cloud cluster.
It allows us to test and experiment with Zeebe clusters which have the same configuration as Zeebe clusters in the Camunda cloud.

As part of the chaos day I run the same benchmark we normally run in our gke with our configuration against the Camunda Cloud Zeebe clusters.

## Configurations of Zeebe Clusters

| Name | Our Default | Prod S | Prod M | Prod L |
|------|-------------|--------|--------|--------|
|Partitions|  3      |   1    |   4    |  8     |
|Nodes|       3       |   3    |   3    |   6    |
|Replication| 3     |   3     |   3   |    3   |
|SnapshotPeriod| 15 | 5 | 5 | 5 |
|CPU_THREADS| 4 | 1 | 4 | 4 |
|IO_THREADS| 4 | 2 | 4 | 4 |
|CPU LIMIT| 5 | 1 | 4 | 4 |
|CPU REQUEST| 5 | 200m | 200m | 200m |
|RAM LIMIT| 12Gi | 2Gi | 8Gi | 8Gi |
|RAM REQUEST| 12Gi | 250Mi | 250Mi | 250Mi|
|Gateway|Standalone|Embedded|Embedded|Embedded|

## Benchmarks

| Name | Our Default | Prod S | Prod M | Prod L |
|------|-------------|--------|--------|--------|
|General|![base](base.png)|![prods](prod-s-general)|![prods](prod-m-general)|![prods](prod-l-general)|
