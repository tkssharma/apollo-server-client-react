class Querybuilder {
  static insertQuery(tableFields, data, tableName) {
    const fields = [];
    const values = [];
    Object.keys(data).forEach(item => {
      if (tableFields.includes(item)) {
        fields.push(item);
        if (data[item] && typeof data[item] === 'object') {
          values.push(`'${JSON.stringify(data[item])}'`);
        } else if (data[item] && typeof data[item] === 'string' && data[item].length > 0) {
          if (tableName !== 'User') {
            values.push(`"${data[item]}"`);
          } else {
            values.push(`"${data[item]}"`);
          }
        } else {
          values.push(`${data[item] || null}`);
        }
      }
    });
    return `INSERT INTO ${tableName} (${fields.join()}) VALUE (${values.join()})`;
  }

  static updateQuery(tableFields, data, key, tableName) {
    const values = ['updated_at=NOW()'];
    this.buildUpdateArray(data, tableFields, values, tableName);
    let query = `UPDATE ${tableName} SET ${values.join()}`;
    if (tableName === 'User') {
      query = `${query} WHERE email = ${key}`;
    } else {
      query = `${query} WHERE id = ${key}`;
    }
    return query;
  }
}

module.exports = Querybuilder;
