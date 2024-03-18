export default {
  name: 'save',
  title: 'Save',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'userID',
      title: 'User ID',
      type: 'string',
    },
  ],
}
