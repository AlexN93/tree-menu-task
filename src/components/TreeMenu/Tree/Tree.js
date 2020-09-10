import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Node} from '../Tree/shapes/nodeShapes';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';
import 'react-virtualized/styles.css';

import TreeState, {State} from './state/TreeState';

export default function Tree({nodes, NodeRenderer, onChange, nodeMarginLeft, width, scrollToIndex, scrollToAlignment}) {
    const [cache] = useState(new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    }));

    const getRowCount = () => {
        return nodes instanceof State ? nodes.flattenedTree.length : nodes.length;
    };

    const getNodeDeepness = (node, index) => {
        if (nodes instanceof State) {
            TreeState.getNodeDeepness(nodes, index);
        }

        return nodes instanceof State ? TreeState.getNodeDeepness(nodes, index) : node.deepness;
    };

    const getNode = index => {
        return nodes instanceof State
            ? {...TreeState.getNodeAt(nodes, index), deepness: getNodeDeepness({}, index)}
            : nodes[index];
    };

    const rowRenderer = ({node, key, measure, style, NodeRenderer, index}) => {
        return (
            <NodeRenderer
                key={key}
                style={{
                    ...style,
                    marginLeft: node.deepness * nodeMarginLeft,
                    userSelect: 'none',
                    cursor: 'pointer',
                }}
                node={node}
                onChange={onChange}
                measure={measure}
                index={index}
            />
        );
    };

    const measureRowRenderer = nodes => ({key, index, style, parent}) => {
        const node = getNode(index);

        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                {m => rowRenderer({...m, index, node, key, style, NodeRenderer})}
            </CellMeasurer>
        );
    };

    return (
        <AutoSizer disableWidth={Boolean(width)}>
            {({height, width: autoWidth}) => (
                <List
                    deferredMeasurementCache={cache}
                    height={height}
                    rowCount={getRowCount()}
                    rowHeight={cache.rowHeight}
                    rowRenderer={measureRowRenderer(nodes)}
                    width={width || autoWidth}
                    scrollToIndex={scrollToIndex}
                />
            )}
        </AutoSizer>
    );
}

Tree.propTypes = {
    nodes: PropTypes.shape({
        flattenedTree: PropTypes.arrayOf(PropTypes.array).isRequired,
        tree: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
    }),
    NodeRenderer: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    nodeMarginLeft: PropTypes.number,
    width: PropTypes.number,
    scrollToIndex: PropTypes.number,
};
