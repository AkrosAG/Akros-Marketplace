#!/bin/bash

function run_ui_server {
    npm run start_ssl
}

function kill_ui_server {
    local ui_pid=$(ps | grep "ng serve --ssl" | awk '{print $1}')
    kill -9 $ui_pid
    return 0
}

function wait_for_ui_server {
    echo -n "waiting for ui...."
    for (( c=1; c<=30; c++ )); do 
        lsof -i -P -n | grep "127.0.0.1:4200"
        if [ $? -eq 0 ]; then
            echo "ui is up and running"
            sleep 2
            return 0
        fi
        echo -n "."
        sleep 2
    done
    echo "ui did not start"
    return 1
}

function run_basic_test {
    echo "check if ui has loaded correctly"
    curl -k https://localhost:4200 2> /dev/null | grep "<mp-root></mp-root>"
    if [ $? -eq 0 ]; then
        echo "ui has successfully loaded"
        return 0
    fi

    echo "test failed: ui did not load correctly"
    return 1
}

#----------------------------------------------
WK_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $WK_DIR
cd ..

run_ui_server &

wait_for_ui_server
if [ $? -ne 0 ]; then
    kill_ui_server
    exit 1
fi

run_basic_test
RET=$?

kill_ui_server

exit $RET
