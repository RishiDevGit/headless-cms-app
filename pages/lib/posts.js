import graphqlRequest from "./graphqlRequest";

export async function getAllPosts() {
    const query={
        query:`query NewQuery {
            posts(first: 5) {
              nodes {
                content
                title
              }
            }
          }
        `
    }
    const {resJson,status} = await graphqlRequest(query);
    const allPosts = resJson?.data?.posts?.nodes;

    return allPosts;
}