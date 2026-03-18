import { fireEvent, render, screen } from '@testing-library/react'
import RoutineContent from '../../profile/routineContent'
import { mockRoutines } from '../../test-fixtures/routines'
import { mockProducts } from '../../test-fixtures/products'

jest.mock('@/lib/api', () => ({
  getProducts: jest.fn(() => mockProducts),
}))

describe('RoutineContent', () => {
  it('renders routines and resolves product names for steps', () => {
    render(<RoutineContent filteredRoutines={mockRoutines} />)

    expect(screen.getByText('Morning Basic')).toBeInTheDocument()
    expect(screen.getByText('Night Repair')).toBeInTheDocument()
    expect(screen.getByText('Hydra Cream')).toBeInTheDocument()
    expect(screen.getByText('Cleanser Plus')).toBeInTheDocument()
  })

  it('renders fallback label when product is not found', () => {
    render(
      <RoutineContent
        filteredRoutines={[
          {
            ...mockRoutines[0],
            id: 'r-missing',
            steps: [{ id: 'sx', order: 1, product: 'not-found' }],
          },
        ]}
      />
    )

    expect(screen.getByText('Producto no encontrado')).toBeInTheDocument()
  })

  it('keeps delete control interactive', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<RoutineContent filteredRoutines={[mockRoutines[0]]} />)

    fireEvent.click(screen.getByRole('button'))

    expect(consoleSpy).toHaveBeenCalledWith('Delete routine', 'r1')
    consoleSpy.mockRestore()
  })
})
