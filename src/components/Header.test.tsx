import { Header } from './Header'
import { render } from '../utils/test-utils'
import { screen } from '@testing-library/react'

describe('Header Component', () => {
  it("should render website's logo", () => {
    render(<Header />)
    const logo = screen.getByRole('img', { name: /pizza logo/i })

    expect(logo).toBeInTheDocument()
  })
  it("should render website's title text", () => {
    render(<Header />)
    const title = screen.getByRole('heading', { name: /satori pizzas/i })

    expect(title).toHaveTextContent('Satori Pizzas')
  })

  it("should render slogan's text", () => {
    render(<Header />)
    const slogan = screen.getByText(/попробуй дзен на вкус/i)

    expect(slogan).toHaveTextContent('попробуй дзен на вкус')
  })

  it('logo block should be a link', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', {
      name: /pizza logo satori pizzas попробуй дзен на вкус/i,
    })

    expect(logoLink).toHaveAttribute('href', '/')
  })
})
