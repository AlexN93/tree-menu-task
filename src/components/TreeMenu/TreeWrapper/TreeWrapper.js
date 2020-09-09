import React from 'react';
import PropTypes from 'prop-types';
import Tree from '../Tree';
import {Node} from '../Tree/shapes/nodeShapes';
import TreeStateModifiers from '../Tree/state/TreeStateModifiers';
import {UPDATE_TYPE} from '../constants';

export default function TreeWrapper({ nodes, onChange, children, nodeMarginLeft, width, scrollToIndex, scrollToAlignment }) {

    const handleChange = ({node, type, index}) => {
        let updatedNodes;

        if (type === UPDATE_TYPE.UPDATE) {
            updatedNodes = TreeStateModifiers.editNodeAt(nodes, index, node);
        }

        onChange(updatedNodes);
    };

    return (
        <Tree
            nodeMarginLeft={nodeMarginLeft}
            nodes={nodes}
            onChange={handleChange}
            NodeRenderer={children}
            width={width}
            scrollToIndex={scrollToIndex}
            scrollToAlignment={scrollToAlignment}
        />
    );
}

TreeWrapper.propTypes = {
    extensions: PropTypes.shape({
        updateTypeHandlers: PropTypes.object,
    }),
    nodes: PropTypes.shape({
        flattenedTree: PropTypes.arrayOf(PropTypes.array).isRequired,
        tree: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
    }),
    onChange: PropTypes.func,
    children: PropTypes.func.isRequired,
    width: PropTypes.number,
    nodeMarginLeft: PropTypes.number,
    scrollToIndex: PropTypes.number,
    scrollToAlignment: PropTypes.string,
};