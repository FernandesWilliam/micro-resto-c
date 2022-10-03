#!/bin/bash

docker build --target development -t micro-restaurant/bff -f ./bff/Dockerfile ./bff &

docker build --target development -t micro-restaurant/self-service-kiosk-bff -f ./self-service-kiosk/Dockerfile ./self-service-kiosk &

docker build --target development -t micro-restaurant/self-service-kiosk -f ./self-service-kiosk/Dockerfile ./self-service-kiosk &

# Build backend
cd ./backend_nestjs
./build-all.sh
cd ..