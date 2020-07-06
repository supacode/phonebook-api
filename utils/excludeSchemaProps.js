const excludeProps = (schema, fields) => {
  fields.forEach(field => delete schema[field]);

  if (schema._id) {
    schema.id = schema._id;
    delete schema._id;
  }

  return schema;
};

module.exports = excludeProps;
