import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeWrapper from './TreeWrapper';
import TreeState from './Tree/state/TreeState';
import { Expandable } from './Tree/renderers';

export default function TreeMenu({ data, width, height, nodeMarginLeft, scrollToIndex, scrollToAlignment }) {
    const [treeState, setTreeState] = useState(TreeState.createFromTree(data));

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
                scrollToAlignment={scrollToAlignment}
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
    scrollToIndex: PropTypes.number,
    scrollToAlignment: PropTypes.string,
};

TreeMenu.defaultProps = {
    height: 750,
    nodeMarginLeft: 30,
    scrollToIndex: 0,
    scrollToAlignment: 'auto'
};
