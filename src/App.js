import React, { PureComponent } from 'react';
import './App.css';
import Graph from 'react-graph-vis';

class App extends PureComponent {
  options = {
    layout: {
      hierarchical: {
        direction: 'UD',
        sortMethod: 'directed'
      }
    },
    physics: {
      hierarchicalRepulsion: {
        avoidOverlap: 1
      }
    },
    nodes: {
      shape: 'dot',
      size: 16
    },
    height: '1024px' // (document.getElementById('root').offsetWidth-100)+'px'
  };

  events = {
    select: event => {
      // const { nodes, edges } = event;
    }
  };

  state = {
    graph: null,
    error: null
  };

  render() {
    const { graph, error } = this.state;
    if (error) {
      return <div>Ops.. {error}</div>;
    }
    if (!graph) {
      return <div>Loading..</div>;
    }
    return (
      <div className="familyTree">
        <Graph
          graph={graph}
          options={this.options}
          events={this.events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.loadFamilyTree();
  }

  loadFamilyTree = url => {
    if (!url) {
      const { PUBLIC_URL, REACT_APP_FAMILY_TREE_DATA_URL } = process.env;
      url = REACT_APP_FAMILY_TREE_DATA_URL || `${PUBLIC_URL}/assets/family-tree.json`;
    }
    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setTitle(data.familyTreeName);
        this.buildGraph(data.data);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  setTitle = title => {
    document.title = title;
  };

  buildGraph = familyTree => {
    const graph = {
      nodes: [],
      edges: []
    };
    const getLabel = function(node) {
      const { first_name, second_name, surname } = node;
      return `${first_name || ''}${second_name ? ` ${second_name}\n` : ''} ${surname || ''}`;
    };
    Object.keys(familyTree).forEach(n => {
      graph.nodes.push({
        id: n,
        label: getLabel(familyTree[n]),
        group: familyTree[n].surname
      });
      if (familyTree[n].parents) {
        familyTree[n].parents.forEach(parent => {
          graph.edges.push({
            from: parent,
            to: n
          });
        });
      }
    });
    this.setState({ graph });
  };
}

export default App;
