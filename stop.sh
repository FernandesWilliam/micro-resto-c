#!/bin/bash

if [ '-p' = "$1" -o '--production' = "$1" ]
then
    docker-compose --env-file ./.env.docker \
                --file ./docker-compose.prod.yml \
                --file  ./backend_nestjs/menu-service/docker-compose-menu.yml \
                --file  ./backend_nestjs/dining-service/docker-compose-dining.yml \
                --file  ./backend_nestjs/kitchen-service/docker-compose-kitchen.yml \
                --file  ./backend_nestjs/gateway/docker-compose-gateway.yml down
else
    docker-compose --env-file ./.env.docker \
                --file ./docker-compose.prod.yml \
                --file  ./backend_nestjs/menu-service/docker-compose-menu.yml \
                --file  ./backend_nestjs/dining-service/docker-compose-dining.yml \
                --file  ./backend_nestjs/kitchen-service/docker-compose-kitchen.yml \
                --file  ./backend_nestjs/gateway/docker-compose-gateway.yml down
fi
