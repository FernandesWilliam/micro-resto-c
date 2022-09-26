#!/bin/bash

function dlDependencies(){ # $1 contains the directory path
  cd $1
  npm ci
  cd ..
}

dlDependencies bff
docker build --target development -t micro-restaurant/bff -f ./bff/Dockerfile ./bff

dlDependencies self-service-kiosk
docker build --target development -t micro-restaurant/self-service-kiosk-bff -f ./self-service-kiosk/Dockerfile ./self-service-kiosk

docker build --target development -t micro-restaurant/self-service-kiosk -f ./self-service-kiosk/Dockerfile ./self-service-kiosk

# Build backend
cd ./backend_nestjs
./build-all.sh
cd ..