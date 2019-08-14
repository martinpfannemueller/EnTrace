# CoalaViz.js

This project is an improved version of CoalaViz presented in the Paper [CoalaViz: Supporting Traceability of Adaptation Decisions in Pervasive Communication Systems](https://ieeexplore.ieee.org/abstract/document/8730818). The development was done as part of a master thesis with the title *Enhanced Traceability in Adaptive Communication Systems* at University of Mannheim.

![Screenshot](screenshot.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8008
npm run dev

# build for production with minification (see dist folder)
npm run build
```

## Using the System

Currently, the system automatically connects to a MQTT broker on localhost via Websocket on port 8080. You can find a documentation of all available message types [here](message_types.md).

It exists an implementation of a generic module for using CoalaViz.js for the [OMNeT++](https://omnetpp.org/) simulator. In case you are interested in this implementation or have any questions feel free to contact me via [martin.pfannemueller@uni-mannheim.de](mailto:martin.pfannemueller@uni-mannheim.de).

## Improving the System

Pull requests for any kind of improvement or addition are very welcome. Some possible ideas and improvements:

- Adding a timeline so it is possible to jump back in time to an older state of the simulation
- Add possibility to show radii around nodes in topology view
- Add possibility to show a background image in topology view
- Add possibility to completely close view modules
- Add possibility to show the same view module twice with different content
- Migrate to Webpack 4
- ...