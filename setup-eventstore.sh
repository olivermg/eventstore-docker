#!/usr/bin/env sh

# enable $by_category projection:
curl -v -d'' -H 'Accept: application/json' 'http://localhost:2113/projection/$by_category/command/enable'

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
    'http://localhost:2113/projections/continuous?name=entity-orders'
