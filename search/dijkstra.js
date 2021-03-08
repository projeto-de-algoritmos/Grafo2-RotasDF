// Maintain a set of explored nodes S for which we have determined the shortest path distance d(u) from s to u
// Initialize S = {s}, d(s) = 0
// Repeatedly choose unexplored node v which minimizes
// pi(v) = min(){e = (u, v): u pertence S} d(u) + c_e
// add v to S, and set d(v) = pi(v)

const cities = require('../data/cities');


function Enqueue(queue, element) {
  queue.push(element); 
}
function Dequeue(queue) {
  return queue.shift(); 
}

function pathFinder(distances, start, end) {
  let next = end;
  let path = []
  distances.forEach((x) => {
    if(x._to === next) {
      path.unshift({ city : x._to, weight : x._weight });
      next = x._from;
      return;
    }
  });

  if(next === start) return path;
  
  let actual = end;
  while (actual !== start) {
    actual = next;
    distances.forEach((x) => {

      if(x._to === actual) {
      path.unshift({ city : x._to, weight : x._weight });
        next = x._from;
        return;
      }
    })
  }

  return path;
}

Array.prototype.setDistance = function (edge) {
  this.map((x)=>{
    if(x._to === edge._to && x._weight._distance < 0 ){
      x._weight = edge._weight;
      x._from = edge._from;
    }
  });
}

function dijkstra(graph, start, end) {
  let distances = [];
  cities.forEach(city => {
    distances.push({_from : '', _to : city[0], _weight : {_distance : -1, _time : -1} });
  });
  let visitedCities = [];

  let actualWeight =  { _distance : 0, _time : 0 };
  let candidates = [];
  let actualCity = start;

  distances.setDistance({ _from : start, _to : start , _weight : actualWeight });

  let count = 0;
  while(actualCity !== end) {

  // for(let count = 0; count < 9;){

    visitedCities.push(actualCity);
    let actualNode = graph._nodes.filter((x) => x._label === actualCity)[0]
    

    actualNode._edges.forEach(edge => {
      if(!visitedCities.find((element) => element === edge._destination._label))
        {
          let weight = {};
          weight._distance = edge._weight._distance + actualWeight._distance;
          weight._time = edge._weight._time + actualWeight._time;
          Enqueue(candidates, { _from : actualCity, _to : edge._destination._label , _weight : weight })
        }
    });  


    let short = Number.MAX_VALUE;
    let position = 0;
    for (let i = 0; i < candidates.length; i++) {
      let edge = candidates[i];
      if(edge._weight._distance < short)
      {
        if(visitedCities.find((element) => element === edge._to))
        {
          [candidates[0], candidates[i]] = [candidates[i], candidates[0]];
          Dequeue(candidates);
      
        }else{
          short = edge._weight._distance;
          position = i;
        }
      }
    }

    [candidates[0], candidates[position]] = [candidates[position], candidates[0]];
    const candidate = Dequeue(candidates);
    

    distances.setDistance(candidate);
    actualCity = candidate._to;    
    actualWeight = candidate._weight;


  }

  let path = pathFinder(distances, start, end)

  return path;

};

module.exports = dijkstra;