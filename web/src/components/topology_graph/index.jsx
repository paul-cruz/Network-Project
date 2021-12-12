import React, { useEffect, useRef } from 'react';
import './styles.css';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

const TopologyGraph = ({ nodes, edges }) => {
    // A reference to the div rendered by this component
    const domNode = useRef(null);

    // A reference to the vis network instance
    const network = useRef(null);

    // An array of nodes
    const nodesSet = new DataSet(nodes);

    // An array of edges
    const edgesSet = new DataSet(edges);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = {
        nodesSet,
        edgesSet
    };

    useEffect(() => {
        const options = {
            autoResize: true,
            height: '100%',
            width: '100%'
        };

        network.current = new Network(domNode.current, data, options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domNode, network, data]);

    return (
        <div className="graphContainer" ref={domNode} />
    );
};

export default TopologyGraph;