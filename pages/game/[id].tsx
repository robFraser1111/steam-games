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
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;

  h2 {
    padding: 20px;
  }

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Heading = styled.h1`
  text-align: center;
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

export default function Game({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/game/${id}`, fetcher);
  const [news, setNews] = useState<News>(initNews);
  const [appId, setAppId] = useState<AppId>(initAppId);
  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setNews(data?.data?.appnews?.newsitems);
      setAppId(data?.data?.appnews?.appid);
    }
  }, [data]);

  const nameHandler = (newName) => {
    setName(newName);
  };

  // Removes html tags from the description (html entities are still an issue)
  const cleanText = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <Section>
      <Heading>{name}</Heading>
      <Wrapper>
        <News>
          <h2>Latest news</h2>

          {user ? (
            <div>
              {news.map((item, index) => (
                <Article key={index}>
                  <h3>{item?.title}</h3>
                  <p>{cleanText(item?.contents)}</p>
                </Article>
              ))}
            </div>
          ) : (
            <div>Can't load news...</div>
          )}
        </News>
        <Achievements user={user} appid={appId} nameHandler={nameHandler} />
      </Wrapper>
    </Section>
  );
}

export async function getServerSideProps({ req, res }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
