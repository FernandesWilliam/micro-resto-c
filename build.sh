#!/bin/bash

APP=micro-restaurant

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

  echo "Building INTERACTIVE-TABLE image"
  docker build -t "$APP/interactive-table:$VERSION}" ./interactive-table
  echo "Done"

  echo "Building INTERACTIVE-TABLE-BFF image"
  docker build -t "$APP/interactive-table-bff:$VERSION" ./interactive-table-bff
  echo "Done"
else
  echo "Building BFF image"
  docker build --target development -t "$APP/bff" -f ./bff/Dockerfile ./bff
  echo "Done"
  echo "Building SELF-SERVICE-KIOSK image"
  docker build --target development -t "$APP/self-service-kiosk" -f ./self-service-kiosk/Dockerfile ./self-service-kiosk
  echo "Done"

  echo "Building INTERACTIVE-TABLE image"
  docker build --target development -t "$APP/interactive-table" ./interactive-table
  echo "Done"

  echo "Building INTERACTIVE-TABLE-BFF image"
  docker build --target development -t "$APP/interactive-table-bff" ./interactive-table-bff
  echo "Done"
fi

# Build backend
cd ./backend_nestjs
./build-all.sh
cd ..