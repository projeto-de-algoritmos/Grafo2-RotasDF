const Node = require('./node');
const Edge = require('./edge');

class Graph {
    constructor(){
        this._nodes = [];
    }

    addNode(label, latitude, longitude){
        this._nodes.push(new Node({label, latitude, longitude}))
    }

    addEdge(origin, destination, weight){
        const [originNode] = this._nodes.filter((x) =>  x._label === origin );
        const [destNode] = this._nodes.filter((x) => x._label === destination );
        originNode._edges.push(new Edge({
            weight,
            destination: destNode,
        }));
        destNode._edges.push(new Edge({
            weight,
            destination: originNode,
        }));
    }

    showGraph(){
        // console.log(graph);
        this._nodes.map(
            (node) => console.log(
                node._label + ' -' + node._edges.map(
                    (edge) => {
                        return ' ' + edge._destination._label 
                    }
                )
            )
        );
    }
}

module.exports = Graph;