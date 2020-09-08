import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/fontawesome-free-solid';

import {submitEvent} from '../../utils/eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

const Expandable = ({
                        onChange,
                        node,
                        children,
                        index,
                    }) => {
    const {hasChildren, isExpanded} = getNodeRenderOptions(node);

    const handleChange = () => onChange({...updateNode(node, {expanded: !isExpanded}), index});

    return (
        <span onDoubleClick={handleChange}>
            {hasChildren && isExpanded && (
                <FontAwesomeIcon onKeyDown={submitEvent(handleChange)} onClick={handleChange} icon={faMinus} />
            )}
            {hasChildren && !isExpanded && (
                <FontAwesomeIcon onKeyDown={submitEvent(handleChange)} onClick={handleChange} icon={faPlus} />
            )}
            {!hasChildren && (
                <i style={{width: 14}} />
            )}
            {children}
        </span>
    );
};

Expandable.propTypes = {
    ...Renderer,
};

export default Expandable;
