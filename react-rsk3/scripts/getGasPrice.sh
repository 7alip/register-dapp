#!/usr/bin/env bash

curl -s \
  https://public-node.testnet.rsk.co/2.0.1/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' \
  > .testnet.gas-price.json