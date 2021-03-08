const Graph = require('./classes/graph');
const cities = require('./data/cities');
const routes = require('./data/citiesRoutes');
const cors = require('cors');
const express = require('express');
const dijkstra = require('./search/dijkstra');

const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.post('/', (req, res) => {
    const {origem, destino} = req.body;

    if(req.body) {

        const graph = new Graph();

        cities.forEach(city => {
            graph.addNode(city[0], city[1], city[2]);
        });
        routes.forEach(route => {
            graph.addEdge(route[0], route[1], route[2]);
        });

        const path = dijkstra(graph, origem, destino);
        console.log(path);
        let answer = {};
        answer.path = [];
        answer.distance = path[path.length-1].weight._distance;
        answer.time = path[path.length-1].weight._time;
        path.forEach((x) => {
            answer.path.push(x.city);
        });


        return res.json({caminho : answer});
    
    } else {
        console.log("deu ruim");
        return res.send(500);
    }
});

app.listen(8000, () => console.log(""));