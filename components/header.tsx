import Link from "next/link";
import Image from "next/image";
import { MyContext } from "../context/state";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import logo from "../public/steam-logo-01.svg";
import avatarPlaceholder from "../public/avatar-placeholder-01.png";

const Banner = styled.header`
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.darkBlue};
  min-height: 100px;
`;

const Content = styled.section`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.tablet}) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Logo = styled.div`
  align-self: center;
  padding: 16px;
  cursor: pointer;
  transition: ${(props) => props.theme.transitionTime};

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

const User = styled.div`
  align-self: center;
  display: flex;
  padding: 16px;
  gap: 16px;
`;

const Name = styled.h3`
  align-self: center;
`;

export default function Header() {
  const value = useContext(MyContext);

  return (
    <Banner>
      <Content>
        <Logo>
          <Link href="/">
            <Image src={logo} width={176} height={44} />
          </Link>
        </Logo>
        {value.user && (
          <User>
            <Image
              src={value?.user?.photos[0]?.value || avatarPlaceholder}
              alt="Avatar"
              width={32}
              height={32}
              title={`Steam ID ${value?.user?.id}`}
            />
            <Name>
              Welcome{" "}
              {value?.user?.displayName.length > 20
                ? value?.user?.displayName.substring(0, 10) + "..."
                : value?.user?.displayName}
                <Link href="/api/auth/logout"><a><h6>Logout</h6></a></Link>
            </Name>
          </User>
        )}
      </Content>
    </Banner>
  );
}
