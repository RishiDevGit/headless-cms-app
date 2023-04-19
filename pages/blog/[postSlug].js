import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import graphqlRequest from "../lib/graphqlRequest";
import { getSinglePost } from "../lib/posts";

export async function getServerSideProps({ params }) {



  const postDataFinal = await getSinglePost(params.postSlug);
  return {
    props: { postDataFinal },
  };
}
export default function Post({ postDataFinal }) {

  const route = useRouter();
  const { postSlug } = route.query;
  return (
    <main>
      <section className="container mx-auto lg:max-w-5xl post-list mt-4">
        <div dangerouslySetInnerHTML={{ __html: postDataFinal?.content }}></div>
      </section>
    </main>
  );
}
