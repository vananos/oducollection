const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = async function (event) {
  const { resourceIds } = JSON.parse(event.body);
  return client.query(
    q.Map(
      q.Paginate(
        q.Union(
          ...resourceIds.map((resourceId) => q.Match(q.Index('likes_index'), resourceId)),
        ),
      ),
      q.Lambda('count', q.Get(q.Var('count'))),
    ),
  )
    .then((res) => ({
      statusCode: 200,
      body: JSON.stringify(res.data.reduce(
        (acc, { data }) => (
          Object.assign(acc, {
            [data.resourceId]: data.count,
          })
        ), {},
      )),
    }));
};
