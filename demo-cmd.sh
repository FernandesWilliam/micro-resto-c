GATEWAY="http://localhost:9500"
KITCHEN="$GATEWAY/kitchen"
DINING="$GATEWAY/dining"

startItem() {
    shortName=$(curl -s -S -X POST "$KITCHEN/preparedItems/$1/start" | grep -o '"shortName":"[^"]*' | grep -o '[^"]*' | tail -1)
    echo "Start cooking ${shortName^}"
}

finishItem() {
    shortName=$(curl -s -S -X POST "$KITCHEN/preparedItems/$1/finish" | grep -o '"shortName":"[^"]*' | grep -o '[^"]*' | tail -1)
    echo "Finish cooking ${shortName^}"
}

startItems() {
    for itemId in $@
    do
        startItem $itemId
    done
}

finishItems() {
    for itemId in $@
    do
        finishItem $itemId
    done
}

prepareItem() {
    shortName=$(curl -s -S -X POST "$KITCHEN/preparedItems/$1/start" | grep -o '"shortName":"[^"]*' | grep -o '[^"]*' | tail -1)
    echo "Start cooking ${shortName^}"

    shortName=$(curl -s -S -X POST "$KITCHEN/preparedItems/$1/finish" | grep -o '"shortName":"[^"]*' | grep -o '[^"]*' | tail -1)
    echo "Finish cooking ${shortName^}"
}

prepareItems() {
    for itemId in $@
    do
        prepareItem $itemId
    done
}

deliverPreparations() {
    for id in $@
    do
        res=$(curl -s -S -X POST "$KITCHEN/preparations/$id/takenToTable")
    done
}

payForOrder() {
    tableNumber=$(curl -s -S -X POST "$DINING/tableOrders/$1/bill" | grep -o '"tableNumber":[^,]*' | grep -o '[^:,]*' | tail -1)
    echo "Order $tableNumber payed"
}

"$@"