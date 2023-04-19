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
  
export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost {
              post(id: "${slug}", idType: SLUG) {
                content(format: RENDERED)
                date
                excerpt(format: RENDERED)
                modified
                slug
                title(format: RENDERED)
                databaseId
                featuredImage {
                  node {
                    mediaDetails {
                      sizes {
                        sourceUrl
                        width
                        height
                      }
                    }
                  }
                }
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }`,
  };

  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;

  return singlePost;
}