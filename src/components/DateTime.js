
function DateTime({ date }) {

    const newDate = new Date(date);
    const datum = newDate.toLocaleString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <time dateTime={datum}>
            {datum}
        </time>
    )
}

export default DateTime;