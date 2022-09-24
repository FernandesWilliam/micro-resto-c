#!/bin/bash

docker-compose --env-file ./.env.docker \
               --file  ./backend_nestjs/menu-service/docker-compose-menu.yml \
               --file  ./backend_nestjs/dining-service/docker-compose-dining.yml \
               --file  ./backend_nestjs/kitchen-service/docker-compose-kitchen.yml \
               --file  ./backend_nestjs/gateway/docker-compose-gateway.yml \
               --file ./docker-compose.yml down
