export default {
  name: 'comment',
  title: 'comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
}
