export const baseURL="http://51.103.209.76"
export const schemas = [
    {
        id: 1,
        name: "Event 1",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "similarity",
                default: "Shamith",
                cluster: false
            },
            {
                id: 2,
                name: "rating",
                type: "range_clustering",
                default: "0",
                cluster: true
            },
            {
                id: 3,
                name: "Comfortable",
                type: "multiple_classifier",
                default: false,
                cluster: false
            },
        ]
    },
    {
        id: 2,
        name: "Event 2",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 3,
        name: "Event 3",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 4,
        name: "Event 4",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 5,
        name: "Event 5",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
    , {
        id: 6,
        name: "Event 6",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
    , {
        id: 7,
        name: "Event 7",
        parameters: [
            {
                id: 1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
]


export const clusterTypes = [
    {
        value: 'location',
        label: 'Location',
    },
    {
        value: 'similarity',
        label: 'Similarity',
    },
    {
        value: 'range_clustering',
        label: 'Range Based',
    },
    {
        value: 'multiple_classifier',
        label: 'Multiple Classifier',
    },
];


export const dataPointsSchema1 = [
    {
        id: 1,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"
    },
    {
        id: 2,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"

    }, {
        id: 3,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"

    }, {
        id: 4,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"

    }, {
        id: 5,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"

    }, {
        id: 6,
        parameters: {
            name: "Shamith",
            rating: "Good",
            comfortable: true,
        },
        schemaName: "Event 1"
    },
]

export const treeData = {
    name: 'Colour',
    children: [
        {
            name: 'Black',
        },
        {
            name: 'Blue',
            children: [
                {
                    name: 'Aquamarine',
                    children: [
                        {
                            name: 'Sushi',
                            children: [
                                {
                                    name: 'Android',
                                    children: [
                                        {
                                            name: 'Lollipop',
                                            children: [
                                                {
                                                    name: '5.0',
                                                    children: [
                                                        {
                                                            name: '5.0.1',
                                                            children: [
                                                                {
                                                                    name: 'Android One',
                                                                    children: [
                                                                        { name: 'Mi A1' },
                                                                        {
                                                                            name: 'Mi A2',
                                                                            children: [
                                                                                {
                                                                                    name: 'Gold',
                                                                                    children: [
                                                                                        { name: '32GB@4GB' },
                                                                                        { name: '64GB@4GB' }
                                                                                    ]
                                                                                },
                                                                                { name: 'Lake Blue' },
                                                                                { name: 'Black' },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    name: 'Mi UI',
                                                                    children: [
                                                                        { name: 'Mi 5X' },
                                                                        { name: 'Mi 6X' },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        { name: '5.0.2' },
                                                    ],
                                                },
                                                { name: '5.1', children: [{ name: '5.1.1' }] },
                                            ],
                                        },
                                        {
                                            name: 'Marshmallow',
                                        },
                                    ],
                                },
                                {
                                    name: 'iOS',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Cyan',
                },
                {
                    name: 'Navy',
                },
                {
                    name: 'Turquoise',
                },
            ],
        },
        {
            name: 'Green',
        },
        {
            name: 'Purple',
            children: [
                {
                    name: 'Indigo',
                },
                {
                    name: 'Violet',
                },
            ],
        },
        {
            name: 'Red',
            children: [
                {
                    name: 'Crimson',
                },
                {
                    name: 'Maroon',
                },
                {
                    name: 'Scarlet',
                },
            ],
        },
        {
            name: 'White',
        },
        {
            name: 'Yellow',
        },
    ],
}
