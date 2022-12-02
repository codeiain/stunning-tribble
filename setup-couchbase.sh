#!/bin/bash

set -m

/entrypoint.sh couchbase-server &

sleep 15

curl -v -X POST http://couchbase:8091/pools/default -d memoryQuota=256 -d indexMemoryQuota=256 -d ftsMemoryQuota=256


  sleep 10s 

curl -v http://couchbase:8091/node/controller/setupServices -d services=kv%2Cn1ql%2Cindex%2Cfts


  sleep 10s 

curl -v http://couchbase:8091/settings/web -d port=8091 -d username=Administrator -d password=password

  sleep 10s 

curl -v -X POST http://couchbase:8091/pools/default/buckets -u Administrator:password -d name=maps -d bucketType=couchbase -d ramQuotaMB=256


  sleep 10s 

 curl -v -X POST http://couchbase:8091/settings/indexes -u Administrator:password -d storageMode=memory_optimized

   sleep 10s 

#   /opt/couchbase/bin/curl -v http://couchbase:8093/query/service \
#   -u Administrator:password \
#   -d 'statement=CREATE INDEX `Idx_Type_IMEI` ON `fleet`(`Type`,`IMEI`) WITH { "defer_build":false }'

#   sleep 10s 

# /opt/couchbase/bin/cbimport json --format list \
#   -c http://couchbase:8091 \
#   -u Administrator \
#   -p password \
#   -d "file:///opt/couchbase/lytx_registration_sample_data.json" -b 'fleet' -g %AssetId%
# fg 1