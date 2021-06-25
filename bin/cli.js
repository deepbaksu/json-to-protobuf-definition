#!/usr/bin/env node

const fs = require('fs')
const lib = require('../dist/index')
const data = fs.readFileSync(0, 'utf-8')

console.log(
  lib.convertProtoMessageToString(
    lib.parseRootObjectToProtoMessage(JSON.parse(data)),
  ),
)
