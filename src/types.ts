export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    created: string;
    films: string[];
    homeworld: string;
    species: string[];
  }
  export interface HomeWorld {
    name: string;
    terrain: string;
    climate: string;
    residents: string[];
  }
  export type Species =
    | "human"
    | "droid"
    | "wookie"
    | "rodian"
    | "hutt"
    | "unknown"
    | "sullustan"
    | "ewok"
    | "moncalamari"
    | "trandoshan"
    | "yodasspecies"
    | "neimodian"
    | "gungan"
    | "toydarian"
    | "dug"
    | "twilek"
    | "aleena"
    | "vulptereen"
    | "xexto"
    | "toong"
    | "cerean"
    | "nautolan"
    | "zabrak"
    | "tholothian"
    | "iktotchi"
    | "quermian"
    | "keldor"
    | "chagrian"
    | "geonosian"
    | "mirialan"
    | "clawdite"
    | "besalisk"
    | "kaminoan"
    | "skakoan"
    | "muun"
    | "togruta"
    | "kaleesh"
    | "pauan";
  