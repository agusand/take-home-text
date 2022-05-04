export default function CommitItem({ commit: { commit } }) {
    return (
        <tr className='commitItem'>
            <td className='commitItem__tableCell'>
                <span className='commitItem__tableCellText'>
                    {commit.author.name}
                </span>
            </td>
            <td className='commitItem__tableCell'>
                <span className='commitItem__tableCellText'>
                    {commit.message}
                </span>
            </td>
            <td className='commitItem__tableCell'>
                <span className='commitItem__tableCellText'>
                    {commit.author.date.slice(0, 10)}
                </span>
            </td>
        </tr>
    )
}
