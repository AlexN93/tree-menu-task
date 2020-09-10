import React, { useState } from 'react';

import {Nodes} from './sampleTree';
import { TreeMenu, constructRandomTree } from './components/TreeMenu';

function App() {
    const MIN_NUMBER_OF_PARENTS = 500;
    const MAX_NUMBER_OF_CHILDREN = 30;
    const MAX_DEEPNESS = 4;

    const getTotalNumberOfElements = (nodes, counter = 0) => {
        return counter + (nodes ? nodes.length + nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), 0) : 0);
    };

    // const [randomTree] = useState(constructRandomTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS));
    const [totalNumberOfNodes] = useState(getTotalNumberOfElements(Nodes));


    const [scrollToId, setScrollToId] = useState(0);
    const [expandNode, setExpandNode] = useState({
        nodeId: 0,
        expanded: true,
        scrollTo: false
    });

    return (
        <div>
            <h4>Total number of nodes: {totalNumberOfNodes}</h4>
            <TreeMenu data={Nodes} width={500} height={200} scrollToId={scrollToId} expandNode={expandNode}/>
            <button onClick={() => setScrollToId(519)}>Set scrollToId</button>
            <br/>
            <button onClick={() => setExpandNode({nodeId: 519, expanded: true, scrollTo: false})}>Set expandNode</button>
        </div>
    );
}

export default App;
