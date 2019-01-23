### Web Input Detector
A Wekinator experiment using React, NodeJS, Express and Socket.io.

The input and the output is packaged within this repo. The input is the x and y coordinates of your mouse. The output is a hex value returned from a web socket connection, which will change the background color of the webpage. You can set any number of outputs and this should work to generate a hex. The ouput generated is a seed that dynamically generates a hex value. If you wanted to output something else, you can evaluate the output sent directly from wekinator within the outputData ws event.

### Dependencies
* NodeJS 8.9.4 or higher
* Wekinator
* Tested in Chrome browser (browser requries ws support)

### Start the app
* Run `npm i`
* Run `npm run start:server` to start the back-end server
* Run `npm run start` to start the front-end server
* OR you can run `npm run dev` to start both the back-end and the front-end server
* Navigate to `localhost:8080` to view webpage
* Move mouse around to send info to websocket
* Desktop only

### Wekinator 
* Open wekinator
* It has 2 inputs (x, y)
* Set any number of outputs. Output values must be integers.
* Output will contain a hex value representing the combination of integers returned from Wekinator
* To train the model, hover over a part of the screen.

### Contributors
Robert Greene