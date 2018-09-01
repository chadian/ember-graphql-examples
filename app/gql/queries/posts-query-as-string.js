export default `
query posts {
  allPosts {
    id
    post
    date
    source
    User {
      id
      name
      image
    }
  }
}
`;
