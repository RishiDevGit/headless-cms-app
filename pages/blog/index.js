import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import { useEffect, useState } from "react";

// export async function getStaticProps() {
//     const allPosts = await getAllPosts();

//     return {
//         props: {
//             allPosts: allPosts?allPosts:[],
//         },
//     }
// }

export default function BlogHome({ allPosts=[] }) {

    const [posts, setPosts] = useState(allPosts);
   async function graphqlRequest(query) {
        const url = "https://staging.makewebbetter.com/graphql";
        const headers = { 'Content-Type': 'application/json' };
    
        if(process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
            headers[
                'Authorization'
            ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
        }
        const res = await fetch(url, {
         
            headers,
            method: 'POST',
            body: JSON.stringify(query)
        });
          
        const resJson = await res.json();
          if(res.status==200)
          {
            setPosts(resJson?.data?.posts?.nodes);
          }
        return resJson;
    
    }
 async function getAllPosts() {
    const query={
        query:`query NewQuery {
            posts {
              nodes {
                slug
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
    const arr=async()=>{
        const allPosts = await getAllPosts();
    }
  useEffect( ()=>{
  
arr();
   
  },[])
    return (
        <>
        <Head>
            <title>Blog</title>
        </Head>
        <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

            <div className="container lg:max-w-4xl mx-auto">
                <SiteHeader className="header-blog-home z-10 relative" />
            </div>

            <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">BLOG</h1>            

            <p className="relative z-10 text-center text-slate-200 text-2xl">Read our latest articles</p>

        </div>
        <main>
            <section className="container mx-auto lg:max-w-5xl post-list mt-4">
             {posts.length===0 && <h1>Loading Posts Data ....</h1>}
                <ul>
                    {
                        posts?.map((post,i) => (
                            <li key={i} className="grid grid-cols-5 gap-4 mb-4">
                                {/* <div className="col-span-2">
                                    <FeaturedImage post={post} />
                                </div> */}
                                <div className="col-span-3">
                                    <h2 className="py-4">
                                        <Link href={`/blog/${post.slug}`} className="text-blue-400 text-2xl hover:text-blue-600">{post.title}</Link>
                                    </h2>
                                    <div className="py-4">
                                        Published on <Date dateString={post.date} />
                                    </div>
                                    <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    <div className="py-4">
                                        Posted under {
                                            post?.categories?.nodes.map((category) => (
                                                <Link className="text-blue-400 hover:text-blue-500" href={`/category/${category.slug}`} key={category.slug}>
                                                    {category.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                {/* <div className="py-4 text-center">
                <LoadMore posts={posts} setPosts={setPosts} />
                </div> */}
                
            </section>
        </main>
        {/* <SiteFooter /> */}
        </>
    );
}