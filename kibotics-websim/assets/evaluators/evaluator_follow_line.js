var evaluator = {};

var car1;
var timeInit;
var clock;

evaluator.createInterface=()=>{
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  var node = document.createElement("div");
  node.setAttribute("class","evaluator");
  var img1 = document.createElement("img");
  img1.setAttribute("class","carMarker");
  img1.setAttribute("src",evaluator_icon1)
  node.appendChild(img1);
  var node2 = document.createElement("div");
  node2.setAttribute("id","car1Progress");
  var node3 = document.createElement("div");
  node3.setAttribute("id","a-car1bar");
  node3.innerHTML = "0%";
  node2.appendChild(node3);
  node.appendChild(node2);
  var time = document.createElement("div");
  time.setAttribute("id","time");
  time.innerHTML="Tiempo: 00:00";
  time.style.marginTop="-87px";
  time.style.color="black";
  node.appendChild(time);
  var myiframe= document.getElementById("myIFrame");
  myiframe.insertBefore(node,myiframe.childNodes[0]);
}

evaluator.setEvaluator = (arrayRobots) => {
  let robot1=Websim.robots.getHalAPI(arrayRobots[0]);
  if(!clock){
    timeInit = new Date();
    car1 = {pos:{x:robot1.getPosition().x,z:robot1.getPosition().z},
                      dist: 0
                    }
  }
  if(robot1.velocity.x>0){
    clock=true;
    var time= document.getElementById("time");
    progressBar(arrayRobots,[car1]);
    var realTime = new Date(new Date() - timeInit);
    var formatTime = timeFormatter(realTime);
    time.innerHTML = "Tiempo: " + formatTime;
    }
}

function timeFormatter(time){
  var formatTime;
  if (time.getMinutes()<10){
    formatTime="0"+time.getMinutes();
  }else{
    formatTime=time.getMinutes();
  }
  formatTime+=":";
  if (time.getSeconds()<10){
    formatTime+="0"+time.getSeconds();
  }else{
    formatTime+=time.getSeconds();
  }
  return formatTime;
}

function progressBar(arrayRobots,cars){
  /**
  *Do a progress bar and text how much percent walked each robot
  */
  var i=0;
  arrayRobots.forEach(function(robotID){
    let robot = Websim.robots.getHalAPI(robotID);
    var posNow = {x:robot.getPosition().x,z:robot.getPosition().z};
    distNow =  Math.sqrt(Math.pow(cars[i].pos.x-posNow.x,2)+Math.pow(cars[i].pos.z-posNow.z,2));
    cars[i].pos=posNow;
    cars[i].dist=cars[i].dist+Math.abs(distNow);
    var completed = (cars[i].dist*100/370);
    var element = document.getElementById("a-car1bar");
    if(completed>100){
      element.style.width = 100 + '%';
      element.innerHTML = 100 + '%';
    }else{
      element.style.width = Math.round(completed) + '%';
      element.innerHTML = Math.round(completed) + '%';
    }
    i++;
  });
}

module.exports = evaluator;