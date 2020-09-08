import React, { useState } from 'react';

import { TreeMenu, constructRandomTree } from './components/TreeMenu';

function App() {
    const MIN_NUMBER_OF_PARENTS = 2000;
    const MAX_NUMBER_OF_CHILDREN = 6;
    const MAX_DEEPNESS = 4;

    const getTotalNumberOfElements = (nodes, counter = 0) => {
        return counter + nodes.length + nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), 0);
    };

    const [randomTree] = useState(constructRandomTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS));
    const [totalNumberOfNodes] = useState(getTotalNumberOfElements(randomTree));

    return (
        <div>
            <h4>Total number of nodes: {totalNumberOfNodes}</h4>
            <TreeMenu data={randomTree} width={500} />
        </div>
    );
}

export default App;
