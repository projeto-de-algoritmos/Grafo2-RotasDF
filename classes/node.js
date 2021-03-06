class Node {
    constructor(props){
        this._edges = [];
        this._label = props.label;
        this._latitude = props.latitude;
        this._longitude = props.longitude;
    }
}

module.exports = Node;