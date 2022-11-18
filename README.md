 # Micro store

## The team
* Gabriel Cogne
* Marine Demonchaux
* William Fernandes
* Taha Kherraf

## Requirements
* Node, version 18
* Docker & docker-compose

## Launch the project
### Build the docker images
```zsh
> ./build.sh
```

To be able to run the UIs and the BFFs, you will need to install the node dependencies (using `npm install`) in the following directory:
[`interactive-table`](./interactive-table/), [`interactive-table-bff`](./interactive-table-bff/), [`self-service-kiosk`](./self-service-kiosk/) and [`bff`](./bff/)

### Run the images
The UIs uses Webpack to compile, so it may take a while to start. Use `-d` option to run docker in detach mode.
```zsh
> ./start.sh
```

| UI                             |                  Access                 |
|:-------------------------------|:---------------------------------------:|
| Interactive table              | [localhost:3006](http://localhost:3006) |
| Self service kiosk with BFF    | [localhost:3004](http://localhost:3004) |
| Self service kiosk without BFF | [localhost:3003](http://localhost:3003) |

### Stoping the server
```zsh
> ./stop.sh
```