// Maintain a set of explored nodes S for which we have determined the shortest path distance d(u) from s to u
// Initialize S = {s}, d(s) = 0
// Repeatedly choose unexplored node v which minimizes
// pi(v) = min(){e = (u, v): u pertence S} d(u) + c_e
// add v to S, and set d(v) = pi(v)

const Graph = require("../classes/graph");
const routes = require("../data/citiesRoutes");
const cities = require('../data/cities');


function Enqueue(queue, element) {
  queue.push(element); 
}
function Dequeue(queue) {
  return queue.shift(); 
}

function setDistance(distances, city, distance) {
  distances.map((x)=>{
    if(x.city === city){
      x.distance = distance;
    }
  });
}

// BFS(graph, 'Taguatinga');
function dijkstra(graph, start, end) {
  // let treeGraph = new Graph;
  let distances = [];
  cities.forEach(city => {
    // treeGraph.addNode(city[0], city[1], city[2]);
    distances.push({ city : city[0], distance : -1 });
  });
  let visitedCities = [start];
  setDistance(distances, start, 0);
  let citiesQueue = [start]
  let candidates = [];

  let actualCity = citiesQueue.pop();
  let actualNode = graph._nodes.filter((x) => x._label === actualCity)[0]
  

  actualNode._edges.forEach(edge => {
    Enqueue(candidates, { from : actualCity, to : edge._destination._label , weight : edge._weight })
  });

  


  console.log(candidates);

  return;

};

module.exports = dijkstra;