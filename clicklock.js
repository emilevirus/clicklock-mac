var robot = require("robotjs");


var clicktime = 0;
var cooldown = 0;
var holding = false;

const ioHook = require('iohook');

ioHook.on('mousedown', event => {
    clicktime = Date.now();
    if (holding && Date.now() - cooldown > 800){
      robot.mouseToggle("up");
  
      holding = false;  
    }
  });

  ioHook.on('mousemove', event => {
      if (!holding) return;
      robot.dragMouse(event.x, event.y);
  });

ioHook.on('mouseup', event => {
    if (clicktime == 0) return;
    console.log(Date.now() - clicktime);
    if (!holding && Date.now() - clicktime > 700){
        holding = true;
        clicktime = 0;
        cooldown = Date.now();
        robot.mouseToggle("down");
        console.log('Dragging');
    }
  });

// Register and start hook
ioHook.start();
