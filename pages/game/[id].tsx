import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import router from "../../lib/router";
import styled from "styled-components";
import Achievements from "../../components/achievements";

const Section = styled.section`
  background: radial-gradient(
    ${(props) => props.theme.lightBlue},
    ${(props) => props.theme.blue}
  );

  padding: 32px 0;

  color: ${(props) => props.theme.white};

  display: flex;
  justify-content: center;

  h1 {
    padding: 20px;
  }
`;

const News = styled.div`
  max-width: 800px;
`;

const Article = styled.article`
  padding: 20px;

  h3 {
    margin-bottom: 8px;
  }
`;

type News = typeof initNews;
const initNews = [];

type AppId = typeof initAppId;
const initAppId = 0;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Game({ user, gameName }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/game/${id}`, fetcher);
  const [news, setNews] = useState<News>(initNews);
  const [appId, setAppId] = useState<AppId>(initAppId);

  useEffect(() => {
    if (data) {
      setNews(data?.data?.appnews?.newsitems);
      setAppId(data?.data?.appnews?.appid);
    }
  }, [data]);

  // Removes html tags from the description (html entities are still an issue)
  const cleanText = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <Section>
      <News>
        <h1>Latest news</h1>

        {user ? (
          <div>
            {news.map((item, index) => (
              <Article key={index}>
                <h3>{item.title}</h3>
                <p>{cleanText(item.contents)}</p>
              </Article>
            ))}
          </div>
        ) : (
          <div>Can't load news...</div>
        )}
      </News>
      <Achievements user={user} appid={appId}/>
    </Section>
  );
}

export async function getServerSideProps({ req, res }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
