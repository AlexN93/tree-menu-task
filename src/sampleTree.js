export const COLLAPSED_CHILDREN = {
    id: 3,
    name: 'Node 3',
    state: {
        expanded: false,
        favorite: true,
        deletable: true,
    },
    children: [
        {
            id: '3-c',
            name: 'Node 3 Child',
            state: {},
        },
    ],
};

export const EXPANDED_CHILDREN = {
    id: 2,
    name: 'Node 2',
    state: {
        expanded: true,
        deletable: true,
    },
    children: [
        COLLAPSED_CHILDREN,
        {
            id: 4,
            name: 'Node 4',
        },
    ],
};

export const EXPANDED_NODE_IN_ROOT = {
    id: 0,
    name: 'Node 0',
    state: {
        expanded: true,
    },
    children: [
        EXPANDED_CHILDREN,
        {
            id: 5,
            name: 'Node 5',
        },
        {
            id: 500,
            name: 'Node 500',
        },
        {
            id: 501,
            name: 'Node 501',
        },
        {
            id: 502,
            name: 'Node 502',
        },
        {
            id: 503,
            name: 'Node 503',
        },
        {
            id: 504,
            name: 'Node 504',
        },
        {
            id: 505,
            name: 'Node 505',
        },
        {
            id: 506,
            name: 'Node 506',
        },
        {
            id: 507,
            name: 'Node 507',
        },
        {
            id: 508,
            name: 'Node 508',
        },
        {
            id: 509,
            name: 'Node 509',
        },
        {
            id: 510,
            name: 'Node 510',
        },
        {
            id: 511,
            name: 'Node 511',
        },
        {
            id: 512,
            name: 'Node 512',
        },
        {
            id: 513,
            name: 'Node 513',
        },
        {
            id: 514,
            name: 'Node 514',
        },
        {
            id: 515,
            name: 'Node 515',
        },
        {
            id: 516,
            name: 'Node 516',
        },
        {
            id: 517,
            name: 'Node 517',
        },
        {
            id: 518,
            name: 'Node 518',
        },
        {
            id: 519,
            name: 'Node 519',
            state: {
                expanded: false,
            },
            children: [
                {
                    id: '519-c',
                    name: 'Node 519 Child',
                    state: {},
                },
            ],
        },
        {
            id: 520,
            name: 'Node 520',
        },
    ],
};

export const COLLAPSED_NODE_IN_ROOT = {
    id: 1,
    name: 'Node 1',
    state: {
        expanded: false,
        deletable: true,
    },
    children: [
        {
            id: 6,
            name: 'Node 6',
            state: {
                expanded: false,
            },
            children: [
                {
                    id: 7,
                    name: 'Node 7',
                },
                {
                    id: 8,
                    name: 'Node 8',
                },
            ],
        },
        {
            id: 10,
            name: 'Node 10',
        },
    ],
};

export const DELETABLE_IN_ROOT = {
    id: 'z',
    name: 'Node z',
    state: {
        deletable: true,
        favorite: true,
    },
};

export const DELETABLE_CHILDREN = EXPANDED_CHILDREN;

export const Nodes = [EXPANDED_NODE_IN_ROOT, COLLAPSED_NODE_IN_ROOT, DELETABLE_IN_ROOT];