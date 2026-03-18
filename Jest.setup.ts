import '@testing-library/jest-dom'

// Basic browser polyfills used by UI libraries.
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

if (!window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		}),
	})
}

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: { alt?: string } & Record<string, unknown>) => {
		const React = require('react')
		return React.createElement('img', { alt: props.alt ?? '', ...props })
	},
}))

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({ children, href, ...props }: { children: unknown; href: unknown } & Record<string, unknown>) => {
		const React = require('react')
		const resolvedHref =
			typeof href === 'string'
				? href
				: href && typeof href === 'object' && 'pathname' in href
					? `${String(href.pathname)}${
							(href as { query?: Record<string, string> }).query
								? `?${new URLSearchParams((href as { query?: Record<string, string> }).query).toString()}`
								: ''
						}`
					: ''
		return React.createElement('a', { href: resolvedHref, ...props }, children)
	},
}))

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
	}),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
}))

jest.mock('next-intl', () => ({
	useLocale: () => 'es',
	useTranslations: (namespace?: string) => (key: string, values?: Record<string, string | number>) => {
		const base = namespace ? `${namespace}.${key}` : key
		if (!values) {
			return base
		}
		return Object.entries(values).reduce((acc, [token, value]) => {
			return acc.replace(new RegExp(`\\{${token}\\}`, 'g'), String(value))
		}, base)
	},
}))

jest.mock('@mui/material', () => {
	const React = require('react')

	const Div = ({ children, ...props }: Record<string, unknown>) =>
		React.createElement('div', props, children)
	const P = ({ children, ...props }: Record<string, unknown>) =>
		React.createElement('p', props, children)

	return {
		Stack: Div,
		Box: Div,
		CardContent: Div,
		Typography: P,
		Chip: ({ label, onDelete, ...props }: { label?: string; onDelete?: () => void } & Record<string, unknown>) =>
			React.createElement(
				'div',
				props,
				label,
				onDelete ? React.createElement('button', { onClick: onDelete, 'aria-label': 'delete-chip' }, 'x') : null
			),
	}
})

// Silencia errores de consola en los tests (opcional, comenta si los necesitas)
// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})
//   jest.spyOn(console, 'warn').mockImplementation(() => {})
// })

// afterAll(() => {
//   jest.restoreAllMocks()
// })