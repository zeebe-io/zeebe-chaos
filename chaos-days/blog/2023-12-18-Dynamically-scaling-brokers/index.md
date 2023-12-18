---
layout: posts
title:  "Dynamically scaling brokers"
date:   2023-12-18
categories: 
  - chaos_experiment 
  - bpmn
tags:
  - availability
  - performance
authors: ole
---

# Chaos Day Summary

We experimented with the first version of dynamic scaling in Zeebe, adding or removing brokers for a running cluster.

**TL;DR;** Both scaling up and down is resilient to broker restarts, with the only effect that the operation takes longer than usual to complete.

<!--truncate-->

## Scaling up should be resilient to broker restarts

Scaling up is a high-level operation that consists of many steps that need to be carried out by all brokers in the cluster.
New brokers need to join the replication group of the assigned partitions and then catch up with the leader.

### Expected

Even when brokers are restarting, the scale operation should eventually succeed with the expected cluster topology as result.

### Actual

#### Verify steady state

The current cluster topology queried with `zbchaos cluster status` shows 6 partitions with 3 replicas each, evenly distributed across the 3 brokers.

```json
{
  "Version": 13,
  "Brokers": [
    {
      "Id": 1,
      "State": "ACTIVE",
      "Version": 40,
      "LastUpdatedAt": "2023-12-18T11:16:56.452114035Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 2
        }
      ]
    },
    {
      "Id": 2,
      "State": "ACTIVE",
      "Version": 34,
      "LastUpdatedAt": "2023-12-18T11:16:35.399362365Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 0,
      "State": "ACTIVE",
      "Version": 44,
      "LastUpdatedAt": "2023-12-18T11:17:22.000373993Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 1
        }
      ]
    }
  ],
  "LastChange": {
    "Id": 12,
    "Status": "COMPLETED",
    "StartedAt": "2023-12-18T11:13:47.548696276Z",
    "CompletedAt": "2023-12-18T11:17:44.207162216Z"
  },
  "PendingChange": null
}
```

All partitions are reported as healthy and leadership is balanced::

```bash
$ zbchaos topology
Node      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6
0         |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)
1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)
2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)
```

#### Scaling up with broker restarts

We start the scaling with `zbchaos cluster scale --brokers 6` and restart a random broker every 30 seconds:

```bash
$ zbchaos cluster scale --brokers 6 & 
$ while true; do sleep 30; zbchaos restart broker --nodeId $(shuf -i 0-5 -n 1); done
```

After the scaling completed, we stop the restarting and let the cluste settle again for a few minutes.

### Result

The scale operation succeeds and the newly reported cluster topology shows us 6 partitions with 3 replicas each, evenly distributed across 6 instead of 3 brokers:

```json
{
  "Version": 15,
  "Brokers": [
    {
      "Id": 1,
      "State": "ACTIVE",
      "Version": 47,
      "LastUpdatedAt": "2023-12-18T15:30:19.184655204Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 1
        }
      ]
    },
    {
      "Id": 2,
      "State": "ACTIVE",
      "Version": 40,
      "LastUpdatedAt": "2023-12-18T15:30:19.111616286Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 3,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:25:07.484956052Z",
      "Partitions": [
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 4,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:25:50.616089815Z",
      "Partitions": [
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 5,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:30:16.949863252Z",
      "Partitions": [
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 0,
      "State": "ACTIVE",
      "Version": 52,
      "LastUpdatedAt": "2023-12-18T15:30:20.920293674Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 2
        }
      ]
    }
  ],
  "LastChange": {
    "Id": 14,
    "Status": "COMPLETED",
    "StartedAt": "2023-12-18T15:12:57.790824149Z",
    "CompletedAt": "2023-12-18T15:30:20.920657536Z"
  },
  "PendingChange": null
}
```

All partitions are reported as healthy and leadership is balanced:

```bash
$ zbchaos topology
Node      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6
0         |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)
1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)
2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |
3         |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |
4         |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |
5         |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)
```

The operation succeeded in about 17 minutes, longer than usual because of the restarts:
![](scaleup-completed.png)


## Scaling down should be resilient to broker restarts

Exactly like scaling up, scaling down is also a high-level operation that consists of many steps that need to be carried out by all brokers in the cluster.
Before a broker can leave, another broker first needs to join the replication group to ensure that we maintain a replication factor of 3 at all times.

### Expected

Even when brokers are restarting, the scale operation should eventually succeed with the expected cluster topology as result.

### Actual

#### Verify steady state

We start with the cluster topology that we got as result of the previous experiment.
6 partitions with 3 replicas distributed over 6 brokers:

```json
{
  "Version": 15,
  "Brokers": [
    {
      "Id": 1,
      "State": "ACTIVE",
      "Version": 47,
      "LastUpdatedAt": "2023-12-18T15:30:19.184655204Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 1
        }
      ]
    },
    {
      "Id": 2,
      "State": "ACTIVE",
      "Version": 40,
      "LastUpdatedAt": "2023-12-18T15:30:19.111616286Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 3,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:25:07.484956052Z",
      "Partitions": [
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 4,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:25:50.616089815Z",
      "Partitions": [
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 5,
      "State": "ACTIVE",
      "Version": 8,
      "LastUpdatedAt": "2023-12-18T15:30:16.949863252Z",
      "Partitions": [
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 0,
      "State": "ACTIVE",
      "Version": 52,
      "LastUpdatedAt": "2023-12-18T15:30:20.920293674Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 2
        }
      ]
    }
  ],
  "LastChange": {
    "Id": 14,
    "Status": "COMPLETED",
    "StartedAt": "2023-12-18T15:12:57.790824149Z",
    "CompletedAt": "2023-12-18T15:30:20.920657536Z"
  },
  "PendingChange": null
}
```

All partitions are reported as healthy and leadership is balanced:

```bash
$ zbchaos topology
Node      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6
0         |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)
1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)
2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |
3         |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |
4         |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |
5         |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)
```


#### Scaling down with broker restarts

We scale down with `zbchaos cluster scale --brokers 3` and restart a random broker every 30 seconds:

```bash
$ zbchaos cluster scale --brokers 3 &
$ while true; do sleep 30; zbchaos restart broker --nodeId $(shuf -i 0-5 -n 1); done
```

### Result

All 6 partitions with 3 replicas each are evenly distributed across 3 brokers:

```json
{
  "Version": 17,
  "Brokers": [
    {
      "Id": 1,
      "State": "ACTIVE",
      "Version": 54,
      "LastUpdatedAt": "2023-12-18T16:24:24.619548623Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 2
        }
      ]
    },
    {
      "Id": 2,
      "State": "ACTIVE",
      "Version": 46,
      "LastUpdatedAt": "2023-12-18T16:24:16.029577221Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 3
        }
      ]
    },
    {
      "Id": 0,
      "State": "ACTIVE",
      "Version": 60,
      "LastUpdatedAt": "2023-12-18T16:28:35.518105574Z",
      "Partitions": [
        {
          "Id": 1,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 2,
          "State": "ACTIVE",
          "Priority": 1
        },
        {
          "Id": 3,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 4,
          "State": "ACTIVE",
          "Priority": 3
        },
        {
          "Id": 5,
          "State": "ACTIVE",
          "Priority": 2
        },
        {
          "Id": 6,
          "State": "ACTIVE",
          "Priority": 1
        }
      ]
    }
  ],
  "LastChange": {
    "Id": 16,
    "Status": "COMPLETED",
    "StartedAt": "2023-12-18T16:07:07.208363298Z",
    "CompletedAt": "2023-12-18T16:28:58.836369836Z"
  },
  "PendingChange": null
}
```

All partitions are healthy and leadership is distributed evenly:

```bash
$ zbchaos topology
Node      |Partition 1         |Partition 2         |Partition 3           |Partition 4         |Partition 5         |Partition 6
0         |LEADER (UNHEALTHY)  |FOLLOWER (HEALTHY)  |FOLLOWER (UNHEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (UNHEALTHY)
1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)    |FOLLOWER (HEALTHY)  |LEADER (UNHEALTHY)  |FOLLOWER (HEALTHY)
2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)      |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)
```

The operation completes in 21 minutes, longer than usual because of the restarts:
![](scaledown-completed.png)