export const isNodeExpanded = node => node.state && node.state.expanded;
export const nodeHasChildren = node => node.children && node.children.length;
export const verifyId = (node, index, paths) => {
    if (index.id === node.id) {
        index.position = paths.length;
    }
};

export const getFlattenedTreePaths = (nodes, parents = [], index = {}) => {
    const paths = [];

    for (const node of nodes) {
        const {id} = node;

        if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
            paths.push(parents.concat(id));
            verifyId(node, index, paths);
        } else {
            paths.push(parents.concat(id));
            verifyId(node, index, paths);
            paths.push(...getFlattenedTreePaths(node.children, [...parents, id], index));
        }
    }

    return paths;
};

export const doesChangeAffectFlattenedTree = (previousNode, nextNode) => {
    return isNodeExpanded(previousNode) !== isNodeExpanded(nextNode);
};
