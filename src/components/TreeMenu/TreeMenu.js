import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TreeWrapper from './TreeWrapper';
import TreeState from './Tree/state/TreeState';
import { Expandable } from './Tree/renderers';

export default function TreeMenu({ data, width, height, nodeMarginLeft, scrollToId, expandNode}) {
    const [treeState, setTreeState] = useState(TreeState.createFromTree(data));
    const [scrollToIndex, setScrollToIndex] = useState();

    useEffect(() => {
        let indexObj = { id: scrollToId, position: null};
        const tempTreeState = TreeState.createFromTree(treeState.tree, indexObj);
        if (indexObj.position) {
            setScrollToIndex(indexObj.position);
        }
        setTreeState(tempTreeState);
    }, [scrollToId]);

    useEffect(() => {
        let indexObj = { id: expandNode.nodeId, position: null};
        const updatedState = TreeState.updateTreeById(treeState, indexObj.id, expandNode.expanded);
        const tempTreeState = TreeState.createFromTree(updatedState.tree, indexObj);
        if (indexObj.position && expandNode.scrollTo) {
            setScrollToIndex(indexObj.position);
        }
        setTreeState(tempTreeState);
    }, [expandNode]);

    const handleChange = nodes => {
        setTreeState(nodes);
    };

    return (
        <div style={{ height: height}}>
            <TreeWrapper
                nodes={treeState}
                onChange={handleChange}
                width={width}
                nodeMarginLeft={nodeMarginLeft}
                scrollToIndex={scrollToIndex}
            >
                {({style, node, ...rest}) => (
                    <div style={style}>
                        <Expandable node={node} {...rest}>
                            {node.name}
                        </Expandable>
                    </div>
                )}
            </TreeWrapper>
        </div>
    );
}

TreeMenu.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    nodeMarginLeft: PropTypes.number,
    scrollToId: PropTypes.number,
    expandNode: PropTypes.shape({
        nodeId: PropTypes.number.isRequired,
        expanded: PropTypes.bool.isRequired,
        scrollTo: PropTypes.bool.isRequired,
    }),
};

TreeMenu.defaultProps = {
    height: 750,
    nodeMarginLeft: 30,
    scrollToId: 0
};
