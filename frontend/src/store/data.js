export const schemas = [
    {
        id: 1,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            },
            {
                id:2,
                name: "rating",
                type: "number",
                default: "0",
                cluster: true
            },
            {
                id:3,
                name: "Comfortable",
                type: "boolean",
                default: false,
                cluster: false
            },
        ]
    },
    {
        id: 2,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 3,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 4,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    }, {
        id: 5,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
    , {
        id: 6,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
    , {
        id: 7,
        name: "Event Car",
        parameters: [
            {
                id:1,
                name: "name",
                type: "text",
                default: "Shamith",
                cluster: false
            }
        ]
    },
]


export const paramTypes = [
    {
      value: 'text',
      label: 'text',
    },
    {
      value: 'number',
      label: 'number',
    },
    {
      value: 'boolean',
      label: 'boolean',
    },
  ];



  export const treeData= {
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
                                          { name: 'Gold',
                                          children: [
                                            {name:'32GB@4GB'},
                                            {name: '64GB@4GB'}
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
  