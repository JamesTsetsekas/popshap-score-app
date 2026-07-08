import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SubmitScorePage from './SubmitScorePage'

describe('SubmitScorePage', () => {
  test('submits valid score data and shows success feedback', async () => {
    const createSubmission = jest.fn().mockResolvedValue(undefined)

    render(
      <SubmitScorePage
        onCreateSubmission={createSubmission}
        onNavigateToScores={jest.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Ronnen' } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Haddad' } })
    fireEvent.change(screen.getByLabelText(/score/i), { target: { value: '25' } })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(createSubmission).toHaveBeenCalledWith({
        firstName: 'Ronnen',
        lastName: 'Haddad',
        score: 25,
      })
    })

    expect(await screen.findByText(/score submitted successfully/i)).toBeInTheDocument()
  })
})
