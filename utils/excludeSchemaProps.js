const excludeProps = (options = { schema: null, fields: null }) => {
  const { schema } = options;
  const fields = options.fields || [];

  fields.push('__v');

  fields.forEach(field => delete schema[field]);

  if (schema._id) {
    schema.id = schema._id;
    delete schema._id;
  }

  return schema;
};

module.exports = excludeProps;
