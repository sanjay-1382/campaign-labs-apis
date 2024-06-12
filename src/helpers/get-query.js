export const getSqlQuery = (listid, deleteBy, clicked, sent, opened, date, action) => {
    const baseQuery = `${action === 'delete'
        ? 'DELETE'
        : 'SELECT COUNT(*) AS count'} FROM email_list_records WHERE listid = '${listid}' AND DATE(added_here) ${deleteBy === 'On' ? '=' : '<='} '${date}'`;

    const conditions = [];
    if (clicked === '1') conditions.push('last_clicked IS NULL');
    if (sent === '1') conditions.push('last_sent IS NULL');
    if (opened === '1') conditions.push('last_opened IS NULL');

    const conditionQuery = conditions.length
        ? ` AND ${conditions.join(' AND ')}`
        : '';

    return baseQuery + conditionQuery;
}
