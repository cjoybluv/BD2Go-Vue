export default [
  {
    _id: 'relationshipLabels',
    data: {
      records: [
        {
          label: ['grandpa', 'grandfather', 'grandma', 'grandmother'],
          nodeType: 'parent',
          reciprocalLabel: ['grandchild', 'grandson', 'granddaughter'],
          viaLabel: ['child', 'son', 'daughter'],
          viaReciprocalLabel: ['parent', 'father', 'mother']
        },
        {
          label: ['child', 'son', 'daughter'],
          nodeType: 'child',
          reciprocalLabel: ['parent', 'father', 'mother'],
          viaLabel: [],
          viaReciprocalLabel: []
        },
        {
          label: ['parent', 'father', 'mother'],
          nodeType: 'parent',
          reciprocalLabel: ['child', 'son', 'daughter'],
          viaLabel: [],
          viaReciprocalLabel: []
        },
        {
          label: ['grandchild', 'grandson', 'granddaughter'],
          nodeType: 'child',
          reciprocalLabel: ['grandpa', 'grandfather', 'grandma', 'grandmother'],
          viaLabel: ['parent', 'father', 'mother'],
          viaReciprocalLabel: ['child', 'son', 'daughter']
        }
      ]
    }
  }
]
