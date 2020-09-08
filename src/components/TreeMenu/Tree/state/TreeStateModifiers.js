import {
    getFlattenedTreePaths,
    doesChangeAffectFlattenedTree,
    isNodeExpanded,
    nodeHasChildren,
} from '../selectors/getFlattenedTree';
import TreeState, {State} from './TreeState';
import { replaceNodeFromTree, deleteNodeFromTree } from '../selectors/nodes';

export default class TreeStateModifiers {

    static editNodeAt = (state, index, nodeUpdate) => {
        const node = TreeState.getNodeAt(state, index);
        const updatedNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate;
        const flattenedTree = [...state.flattenedTree];
        const flattenedNodeMap = flattenedTree[index];
        const parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

        if (doesChangeAffectFlattenedTree(node, updatedNode)) {
            const numberOfVisibleDescendants = TreeState.getNumberOfVisibleDescendants(state, index);

            if (isNodeExpanded(updatedNode)) {
                const updatedNodeSubTree = getFlattenedTreePaths([updatedNode], parents);

                flattenedTree.splice(index + 1, 0, ...updatedNodeSubTree.slice(1));
            } else {
                flattenedTree.splice(index + 1, numberOfVisibleDescendants);
            }
        }

        const tree = replaceNodeFromTree(state.tree, {...updatedNode, parents});

        return new State(tree, flattenedTree);
    };

    static deleteNodeAt = (state, index) => {
        const node = TreeState.getNodeAt(state, index);

        const flattenedTree = [...state.flattenedTree];
        const flattenedNodeMap = flattenedTree[index];
        const parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

        const numberOfVisibleDescendants = nodeHasChildren(node)
            ? TreeState.getNumberOfVisibleDescendants(state, index)
            : 0;

        flattenedTree.splice(index, 1 + numberOfVisibleDescendants);

        const tree = deleteNodeFromTree(state.tree, {...node, parents});

        return new State(tree, flattenedTree);
    };
}
