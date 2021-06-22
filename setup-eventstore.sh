#!/usr/bin/env sh

# enable $by_category projection:
curl -v -d'' -H 'Accept: application/json' 'http://192.168.39.167:32729/projection/$by_category/command/enable'

# create projection for order entity:
curl -v -H 'Accept: application/json' -H 'Content-type: application/json' \
    -d 'fromCategory("order")
    .foreachStream()
    .when({
        $init: function() {
            return { data: {} };
        },
        $any: function(state, event) {
            state.data = {...state.data, ...event.data};
        }
    })' \
    'http://192.168.39.167:32729/projections/continuous?name=entity-orders'
