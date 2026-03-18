import { fireEvent, render, screen } from '@testing-library/react'
import CommunityPage from '../../community/CommunityPage'
import { getRoutines } from '@/lib/routine'
import { getUsers } from '@/lib/api'
import { SkinType } from '@/types/product'

jest.mock('@/lib/routine', () => ({
    getRoutines: jest.fn(),
}))

jest.mock('@/lib/api', () => ({
    getUsers: jest.fn(),
}))

jest.mock('@/i18n/navigation', () => ({
    Link: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

describe('community/CommunityPage', () => {
    beforeEach(() => {
        ; (getUsers as jest.Mock).mockReturnValue([
            { id: 'u1', name: 'Sarah J.', avatarUrl: 'https://example.com/u1.png' },
        ])

            ; (getRoutines as jest.Mock).mockReturnValue([
                {
                    id: 'r1',
                    userId: 'u1',
                    name: 'Morning Routine',
                    description: 'Daily routine',
                    skinType: SkinType.NORMAL,
                    upvotes: ['u2'],
                    downvotes: [],
                    comments: [{ id: 'c1' }],
                    views: 1500,
                    publishedAt: '2026-03-16T11:05:00.000Z',
                },
            ])
    })

    it('renders forum sections and routine cards', () => {
        render(<CommunityPage />)

        expect(screen.getAllByText('CommunityPage.forumTitle').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Morning Routine').length).toBeGreaterThan(0)
        expect(screen.getAllByRole('link', { name: 'CommunityPage.createPost' }).length).toBeGreaterThan(0)
    })

    it('updates vote count when upvote is clicked', () => {
        render(<CommunityPage />)

        const upvoteButton = screen.getAllByRole('button', { name: 'RoutineDetail.upvote' })[0]

        expect(upvoteButton).toHaveTextContent('1')

        fireEvent.click(upvoteButton)

        expect(screen.getAllByRole('button', { name: 'RoutineDetail.upvote' })[0]).toHaveTextContent('2')
    })
})
