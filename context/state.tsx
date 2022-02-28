import React from "react";

// Default values of context.
interface AppContextInterface {
  user: {
    _json: {
      steamid: string;
      communityvisibilitystate: number;
      profilestate: number;
      personaname: string;
      commentpermission: number;
      profileurl: string;
      avatar: string;
      avatarmedium: string;
      avatarfull: string;
      avatarhash: string;
      lastlogoff: number;
      personastate: number;
      realname: string;
      primaryclanid: string;
      timecreated: number;
      personastateflags: number;
    };
    displayName: string;
    id: string;
    photos: [{ value: string }];
    provider: string;
  };
}

export const MyContext = React.createContext<AppContextInterface | null>(null);
