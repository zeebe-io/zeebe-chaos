# Chaos Day Summary

The scripts we are using for our chaos experiments screamed already for a long time for some love, which is why I took today some hours to fix them based on the report of [shellcheck](https://github.com/koalaman/shellcheck). Shellcheck is quite an useful and interesting tool, I can really recommend it. I migrated the scripts to an upper level, such that they are used by all our current chaos experiments (helm and camunda-cloud). See related PR https://github.com/zeebe-io/zeebe-chaos/pull/44.

During this refactoring I fixed some problems with the connect/disconnect experiments [#43](https://github.com/zeebe-io/zeebe-chaos/issues/43). This gives us new possiblity to write new experiments.

## Chaos Experiment

## Related issues

### Zbctl Topology

## New Issues

 * https://github.com/zeebe-io/zeebe/issues/5812 
 
## Participants

  * @zelldon
