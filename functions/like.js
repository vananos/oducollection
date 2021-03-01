const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const LikedEnum = {
  liked: 1,
  unliked: -1,
};

exports.handler = async function (event) {
  const {
    resourceId,
    likedState,
  } = JSON.parse(event.body);

  const likedInc = LikedEnum[likedState];
  if (likedInc === undefined) {
    throw new Error('Invalid liked state');
  }

  return client.query(
    q.Get(q.Match(q.Index('likes_index'), resourceId)),
  )
    .then(({
      ref,
      data,
    }) => q.Update(ref, {
      data: {
        ...data,
        count: data.count + likedInc,
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
