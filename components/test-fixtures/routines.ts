import { Routine } from '../../types/routine'

export const mockRoutines: Routine[] = [
  {
    id: 'r1',
    name: 'Morning Basic',
    description: 'Simple AM routine',
    type: 'AM',
    steps: [
      { id: 's1', order: 1, product: 'p1' },
      { id: 's2', order: 2, product: 'p3' },
    ],
  },
  {
    id: 'r2',
    name: 'Night Repair',
    description: 'Simple PM routine',
    type: 'PM',
    steps: [{ id: 's3', order: 1, product: 'p2' }],
  },
]
