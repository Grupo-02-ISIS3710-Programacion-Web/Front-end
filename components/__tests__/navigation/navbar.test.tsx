import { render, screen } from '@testing-library/react'
import NavBar, { NavBarDesktop, NavBarMobile } from '../../NavBar'

jest.mock('@/components/ui/sheet', () => {
  const React = require('react')
  return {
    Sheet: ({ children }: any) => <div>{children}</div>,
    SheetTrigger: ({ children }: any) => <div>{children}</div>,
    SheetContent: ({ children }: any) => <div>{children}</div>,
    SheetHeader: ({ children }: any) => <div>{children}</div>,
    SheetTitle: ({ children }: any) => <div>{children}</div>,
  }
})

describe('NavBar', () => {
  it('renders desktop and mobile wrappers in the root component', () => {
    render(<NavBar />)

    expect(screen.getAllByText('Skin4All').length).toBeGreaterThan(0)
  })

  it('renders desktop auth actions when logged out and user actions when logged in', () => {
    const { rerender } = render(<NavBarDesktop isLoggedIn={false} />)

    expect(screen.getByRole('button', { name: 'NavBar.register' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'NavBar.login' })).toBeInTheDocument()

    rerender(<NavBarDesktop isLoggedIn />)

    expect(screen.getAllByRole('button').length).toBeGreaterThan(2)
  })

  it('renders mobile menu links', () => {
    render(<NavBarMobile />)

    expect(screen.getAllByRole('link', { name: 'NavBar.home' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'NavBar.discover' }).length).toBeGreaterThan(0)
  })
})
