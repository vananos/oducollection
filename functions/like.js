const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = async function (event) {
  const { resourceId } = JSON.parse(event.body);
  return client.query(
    q.Get(q.Match(q.Index('likes_index'), resourceId)),
  )
    .then(({
      ref,
      data,
    }) => q.Update(ref, {
      data: {
        ...data,
        count: data.count + 1,
      },
    }))
    .catch((reason) => {
      if (reason instanceof faunadb.errors.NotFound) {
        return q.Create(q.Collection('likes'), {
          data: {
            count: 1,
            resourceId,
          },
        });
      }
      throw reason;
    })
    .then((query) => client.query(query))
    .then(() => ({
      statusCode: 200,
    }));
};
