#!/bin/bash
file='node_modules/react-dev-utils/ModuleScopePlugin.js'
sed -i -e 's/return relative.*/return true;/' $file

