import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import router from "../../lib/router";

type News = typeof initNews;
const initNews = [];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Game({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/game/${id}`, fetcher);
  const [news, setNews] = useState<News>(initNews);

  console.log(data);

  useEffect(() => {
    if (data) {
      // Filter out items that don't have an image

      setNews(data?.data?.appnews?.newsitems);
    }
  }, [data]);

  return (
    <div>
      <h1>Game news</h1>

      {user ? (
        <div>
          <h1>Game ID {id}</h1>

          {news.map((item, index) => (
            <div key={index}>
              {item.title}
            </div>
          ))}

        </div>
      ) : (
        <div>Can't load news</div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
