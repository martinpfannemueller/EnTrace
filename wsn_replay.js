'use strict'

const fs = require('fs');
const mqtt = require('mqtt');

const wsn_events = JSON.parse(fs.readFileSync('wsn_events.json', 'utf8'));
const client = mqtt.connect('mqtt://localhost');

// Make sure events are properly sorted
wsn_events.sort((a, b) => Number(a.timedEventId) - Number(b.timedEventId));

let overallTime = 0;

client.on('connect', async function () {

    while(wsn_events.length > 0){
        
        const eventsAtSameTime = [];
    
        const event = wsn_events.shift();
        eventsAtSameTime.push(event);
        
        if(wsn_events.length > 0){
            var nextEvent = wsn_events[0];
            while(event.timeStampMilliseconds == nextEvent.timeStampMilliseconds){
                eventsAtSameTime.push(wsn_events.shift());
                nextEvent = wsn_events[0];
            }
        }
        
        const nextTime = event.timeStampMilliseconds-overallTime
        overallTime += nextTime;
    
        await sleep(nextTime).then(() => {
            if(eventsAtSameTime.length == 1){
                client.publish(eventsAtSameTime[0].event.type, JSON.stringify(eventsAtSameTime[0].event), {qos: 2}, function(err){
                    if(err){
                        console.log("Error publishing:");
                        console.log(err);
                    }
                });
            }else{
                for(var i = 0; i < eventsAtSameTime.length; i++){
                    client.publish(eventsAtSameTime[i].event.type, JSON.stringify(eventsAtSameTime[i].event), {qos: 2}, function(err){
                        if(err){
                            console.log("Error publishing:");
                            console.log(err);
                        }
                    });
                }
            }
        });

        
    }

    console.log("Replay finished");
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}