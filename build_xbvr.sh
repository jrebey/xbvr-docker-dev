#!/bin/bash

yarn install
yarn build
go generate
go build -tags="json1" -o xbvr main.go