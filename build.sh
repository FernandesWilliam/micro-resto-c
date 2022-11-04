#!/bin/bash

if [ '-p' = "$1" -o '--production' = "$1" ]
then
  APP=micro-restaurant
  VERSION=1.0

  echo "Building BFF image"
  docker build -t "$APP/bff:$VERSION" ./bff
  echo "Done"
  echo "Building SELF-SERVICE-KIOSK image"
  docker build -t "$APP/self-service-kiosk:$VERSION" ./self-service-kiosk
  echo "Done"
else
  echo "Building BFF image"
  docker build --target development -t micro-restaurant/bff -f ./bff/Dockerfile ./bff
#  docker build --target development -t micro-restaurant/self-service-kiosk-bff -f ./self-service-kiosk/Dockerfile ./self-service-kiosk
  echo "Done"
  echo "Building SELF-SERVICE-KIOSK image"
  docker build --target development -t micro-restaurant/self-service-kiosk -f ./self-service-kiosk/Dockerfile ./self-service-kiosk
  echo "Done"
fi

# Build backend
cd ./backend_nestjs
./build-all.sh
cd ..