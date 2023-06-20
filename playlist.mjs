var playlistFromSpoti;
let codeVerifier = localStorage.getItem("code_verifier");

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");

let body = new URLSearchParams({
  grant_type: "authorization_code",
  code: code,
  redirect_uri: "http://http://127.0.0.1:5500/SpotV2/playlistl.html",
  client_id: "8232546c1fe64f439ac1ed2e991f58c2",
  code_verifier: codeVerifier,
});

async function updateToken() {
  const response = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("token ") + data;
      localStorage.setItem("access_token", data.access_token);
      getProfile();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(response);
}

async function getProfile() {
  let accessToken = localStorage.getItem("access_token");

  const response = await fetch(
    "https://api.spotify.com/v1/playlists/5HbNHADuYvl55kePbLEXmy",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  playlistFromSpoti = data;
  console.log(playlistFromSpoti);
}

updateToken();

/* let playlist = {
  collaborative: "false",
  description: "",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/5HbNHADuYvl55kePbLEXmy",
  },
  followers: {
    href: null,
    total: 0,
  },
  href: "https://api.spotify.com/v1/playlists/5HbNHADuYvl55kePbLEXmy",
  id: "5HbNHADuYvl55kePbLEXmy",
  images: [
    {
      height: 640,
      url: "https://mosaic.scdn.co/640/ab67616d0000b2730a2fa2dbfd1e639bbfc3ab99ab67616d0000b273796bb82c48e767e67ab538b7ab67616d0000b273f034b00d0a05cd6504b49bebab67616d0000b273f5c584384450e0e01356a9ac",
      width: 640,
    },
    {
      height: 300,
      url: "https://mosaic.scdn.co/300/ab67616d0000b2730a2fa2dbfd1e639bbfc3ab99ab67616d0000b273796bb82c48e767e67ab538b7ab67616d0000b273f034b00d0a05cd6504b49bebab67616d0000b273f5c584384450e0e01356a9ac",
      width: 300,
    },
    {
      height: 60,
      url: "https://mosaic.scdn.co/60/ab67616d0000b2730a2fa2dbfd1e639bbfc3ab99ab67616d0000b273796bb82c48e767e67ab538b7ab67616d0000b273f034b00d0a05cd6504b49bebab67616d0000b273f5c584384450e0e01356a9ac",
      width: 60,
    },
  ],
  name: "Programando ☕💻",
  owner: {
    display_name: "Mario CX",
    external_urls: {
      spotify: "https://open.spotify.com/user/galleta227",
    },
    href: "https://api.spotify.com/v1/users/galleta227",
    id: "galleta227",
    type: "user",
    uri: "spotify:user:galleta227",
  },
  primary_color: null,
  public: false,
  snapshot_id: "MjMsMWMzZTEwZjk2MDVlZjA4ZGExNDQ0ZTA5YzZlOTZjN2MzMGJlMjQ0Ng==",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/5HbNHADuYvl55kePbLEXmy/tracks?offset=0&limit=100&locale=es-ES,es;q=0.9,en;q=0.8",
    items: [
      {
        added_at: "2023-01-09T16:19:45Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5vfEaoOBcK0Lzr07WN8KaK",
                },
                href: "https://api.spotify.com/v1/artists/5vfEaoOBcK0Lzr07WN8KaK",
                id: "5vfEaoOBcK0Lzr07WN8KaK",
                name: "Darius",
                type: "artist",
                uri: "spotify:artist:5vfEaoOBcK0Lzr07WN8KaK",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/4ipvRPuGyE1Y1XvG904i3t",
            },
            href: "https://api.spotify.com/v1/albums/4ipvRPuGyE1Y1XvG904i3t",
            id: "4ipvRPuGyE1Y1XvG904i3t",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273f5c584384450e0e01356a9ac",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02f5c584384450e0e01356a9ac",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851f5c584384450e0e01356a9ac",
                width: 64,
              },
            ],
            name: "Romance",
            release_date: "2014-02-24",
            release_date_precision: "day",
            total_tracks: 5,
            type: "album",
            uri: "spotify:album:4ipvRPuGyE1Y1XvG904i3t",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5vfEaoOBcK0Lzr07WN8KaK",
              },
              href: "https://api.spotify.com/v1/artists/5vfEaoOBcK0Lzr07WN8KaK",
              id: "5vfEaoOBcK0Lzr07WN8KaK",
              name: "Darius",
              type: "artist",
              uri: "spotify:artist:5vfEaoOBcK0Lzr07WN8KaK",
            },
          ],

          disc_number: 1,
          duration_ms: 242242,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "FR9W11400557",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3hGc6zv9LgSxGrIlhFdfT6",
          },
          href: "https://api.spotify.com/v1/tracks/3hGc6zv9LgSxGrIlhFdfT6",
          id: "3hGc6zv9LgSxGrIlhFdfT6",
          is_local: false,
          name: "Espoir",
          popularity: 57,
          preview_url:
            "https://p.scdn.co/mp3-preview/527f664b6f8613f7a2fcacfc1ca3bcf669b187f9?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:3hGc6zv9LgSxGrIlhFdfT6",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:24:45Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5VInCfhytxHsRkAtV1Ho4J",
                },
                href: "https://api.spotify.com/v1/artists/5VInCfhytxHsRkAtV1Ho4J",
                id: "5VInCfhytxHsRkAtV1Ho4J",
                name: "Sloth Brite",
                type: "artist",
                uri: "spotify:artist:5VInCfhytxHsRkAtV1Ho4J",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/4fCup6ccd6Z42vZcwUyQK2",
            },
            href: "https://api.spotify.com/v1/albums/4fCup6ccd6Z42vZcwUyQK2",
            id: "4fCup6ccd6Z42vZcwUyQK2",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273796bb82c48e767e67ab538b7",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02796bb82c48e767e67ab538b7",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851796bb82c48e767e67ab538b7",
                width: 64,
              },
            ],
            name: "Chanchullo",
            release_date: "2020-05-24",
            release_date_precision: "day",
            total_tracks: 11,
            type: "album",
            uri: "spotify:album:4fCup6ccd6Z42vZcwUyQK2",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5VInCfhytxHsRkAtV1Ho4J",
              },
              href: "https://api.spotify.com/v1/artists/5VInCfhytxHsRkAtV1Ho4J",
              id: "5VInCfhytxHsRkAtV1Ho4J",
              name: "Sloth Brite",
              type: "artist",
              uri: "spotify:artist:5VInCfhytxHsRkAtV1Ho4J",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5MOE8DFWAHa51a5gKzz78m",
              },
              href: "https://api.spotify.com/v1/artists/5MOE8DFWAHa51a5gKzz78m",
              id: "5MOE8DFWAHa51a5gKzz78m",
              name: "Sr. Guayaba",
              type: "artist",
              uri: "spotify:artist:5MOE8DFWAHa51a5gKzz78m",
            },
          ],

          disc_number: 1,
          duration_ms: 157951,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "TCAEW2013871",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3PseDi0qEhVP55MRaPK2wC",
          },
          href: "https://api.spotify.com/v1/tracks/3PseDi0qEhVP55MRaPK2wC",
          id: "3PseDi0qEhVP55MRaPK2wC",
          is_local: false,
          name: "Ganga - Bonus track",
          popularity: 38,
          preview_url:
            "https://p.scdn.co/mp3-preview/c0d0aa1c10d6436c1235a132d6f08ae02e32779d?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 11,
          type: "track",
          uri: "spotify:track:3PseDi0qEhVP55MRaPK2wC",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:27:49Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/13OXgp0fFDhWRPSXnN8yLT",
                },
                href: "https://api.spotify.com/v1/artists/13OXgp0fFDhWRPSXnN8yLT",
                id: "13OXgp0fFDhWRPSXnN8yLT",
                name: "BRVMES",
                type: "artist",
                uri: "spotify:artist:13OXgp0fFDhWRPSXnN8yLT",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/5eQ67Ly32ZzzZle1m6KonH",
            },
            href: "https://api.spotify.com/v1/albums/5eQ67Ly32ZzzZle1m6KonH",
            id: "5eQ67Ly32ZzzZle1m6KonH",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2730a2fa2dbfd1e639bbfc3ab99",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e020a2fa2dbfd1e639bbfc3ab99",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048510a2fa2dbfd1e639bbfc3ab99",
                width: 64,
              },
            ],
            name: "Rêve",
            release_date: "2020-09-08",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:5eQ67Ly32ZzzZle1m6KonH",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/13OXgp0fFDhWRPSXnN8yLT",
              },
              href: "https://api.spotify.com/v1/artists/13OXgp0fFDhWRPSXnN8yLT",
              id: "13OXgp0fFDhWRPSXnN8yLT",
              name: "BRVMES",
              type: "artist",
              uri: "spotify:artist:13OXgp0fFDhWRPSXnN8yLT",
            },
          ],

          disc_number: 1,
          duration_ms: 228000,
          episode: false,
          explicit: true,
          external_ids: {
            isrc: "CA5KR2079947",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/4JgCLSsPYhABzfDJUSOufy",
          },
          href: "https://api.spotify.com/v1/tracks/4JgCLSsPYhABzfDJUSOufy",
          id: "4JgCLSsPYhABzfDJUSOufy",
          is_local: false,
          name: "Rêve",
          popularity: 34,
          preview_url:
            "https://p.scdn.co/mp3-preview/e6a0640aef506bfe57dcbf83517dd253547a6bfb?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:4JgCLSsPYhABzfDJUSOufy",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:29:33Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/7rf1qZJ6hGSlPN7K9ShsVV",
            },
            href: "https://api.spotify.com/v1/albums/7rf1qZJ6hGSlPN7K9ShsVV",
            id: "7rf1qZJ6hGSlPN7K9ShsVV",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273f034b00d0a05cd6504b49beb",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02f034b00d0a05cd6504b49beb",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851f034b00d0a05cd6504b49beb",
                width: 64,
              },
            ],
            name: "Recess",
            release_date: "2014-03-14",
            release_date_precision: "day",
            total_tracks: 11,
            type: "album",
            uri: "spotify:album:7rf1qZJ6hGSlPN7K9ShsVV",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
          ],

          disc_number: 1,
          duration_ms: 229213,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT21400801",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/6phWVUn5CCTCRBepIKnf6D",
          },
          href: "https://api.spotify.com/v1/tracks/6phWVUn5CCTCRBepIKnf6D",
          id: "6phWVUn5CCTCRBepIKnf6D",
          is_local: false,
          name: "Try It Out (with Alvin Risk) - Neon Mix",
          popularity: 57,
          preview_url:
            "https://p.scdn.co/mp3-preview/d6eea31579d51c970f49e23c022252f8d76d93c0?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 4,
          type: "track",
          uri: "spotify:track:6phWVUn5CCTCRBepIKnf6D",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:39:18Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/108ugtkRFQzP9nGgNiyERO",
                },
                href: "https://api.spotify.com/v1/artists/108ugtkRFQzP9nGgNiyERO",
                id: "108ugtkRFQzP9nGgNiyERO",
                name: "Hundred Waters",
                type: "artist",
                uri: "spotify:artist:108ugtkRFQzP9nGgNiyERO",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/7pPVcx3O9eZrPCgBmpW5HV",
            },
            href: "https://api.spotify.com/v1/albums/7pPVcx3O9eZrPCgBmpW5HV",
            id: "7pPVcx3O9eZrPCgBmpW5HV",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273c3724ff57308e247c99101dd",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02c3724ff57308e247c99101dd",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851c3724ff57308e247c99101dd",
                width: 64,
              },
            ],
            name: "Show Me Love (feat. Chance the Rapper, Moses Sumney and Robin Hannibal) [Skrillex Remix]",
            release_date: "2016-03-22",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:7pPVcx3O9eZrPCgBmpW5HV",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/108ugtkRFQzP9nGgNiyERO",
              },
              href: "https://api.spotify.com/v1/artists/108ugtkRFQzP9nGgNiyERO",
              id: "108ugtkRFQzP9nGgNiyERO",
              name: "Hundred Waters",
              type: "artist",
              uri: "spotify:artist:108ugtkRFQzP9nGgNiyERO",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/1anyVhU62p31KFi8MEzkbf",
              },
              href: "https://api.spotify.com/v1/artists/1anyVhU62p31KFi8MEzkbf",
              id: "1anyVhU62p31KFi8MEzkbf",
              name: "Chance the Rapper",
              type: "artist",
              uri: "spotify:artist:1anyVhU62p31KFi8MEzkbf",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5W10uJRsbt9bROJDKoI1Wn",
              },
              href: "https://api.spotify.com/v1/artists/5W10uJRsbt9bROJDKoI1Wn",
              id: "5W10uJRsbt9bROJDKoI1Wn",
              name: "Moses Sumney",
              type: "artist",
              uri: "spotify:artist:5W10uJRsbt9bROJDKoI1Wn",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/0qVb1coEo0OVOpP9kphf6U",
              },
              href: "https://api.spotify.com/v1/artists/0qVb1coEo0OVOpP9kphf6U",
              id: "0qVb1coEo0OVOpP9kphf6U",
              name: "Robin Hannibal",
              type: "artist",
              uri: "spotify:artist:0qVb1coEo0OVOpP9kphf6U",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
          ],

          disc_number: 1,
          duration_ms: 241846,
          episode: false,
          explicit: true,
          external_ids: {
            isrc: "USAT21600398",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/5PnBpKOVvQxeFvXVNYSoxs",
          },
          href: "https://api.spotify.com/v1/tracks/5PnBpKOVvQxeFvXVNYSoxs",
          id: "5PnBpKOVvQxeFvXVNYSoxs",
          is_local: false,
          name: "Show Me Love (feat. Chance the Rapper, Moses Sumney and Robin Hannibal) - Skrillex Remix",
          popularity: 52,
          preview_url:
            "https://p.scdn.co/mp3-preview/be2c6afbc52cbf2e71b35b7015de47b27836969c?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:5PnBpKOVvQxeFvXVNYSoxs",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:41:54Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/18Eu7uJEMPWwwt1QUdCglQ",
                },
                href: "https://api.spotify.com/v1/artists/18Eu7uJEMPWwwt1QUdCglQ",
                id: "18Eu7uJEMPWwwt1QUdCglQ",
                name: "INZO",
                type: "artist",
                uri: "spotify:artist:18Eu7uJEMPWwwt1QUdCglQ",
              },
            ],
            available_markets: [],
            external_urls: {
              spotify: "https://open.spotify.com/album/47Sz2iGhaRNkj6yIZgIgqF",
            },
            href: "https://api.spotify.com/v1/albums/47Sz2iGhaRNkj6yIZgIgqF",
            id: "47Sz2iGhaRNkj6yIZgIgqF",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b27379cf2e63b01a9f47aa83320e",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e0279cf2e63b01a9f47aa83320e",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d0000485179cf2e63b01a9f47aa83320e",
                width: 64,
              },
            ],
            name: "Local Void",
            release_date: "2018-10-18",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:47Sz2iGhaRNkj6yIZgIgqF",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/18Eu7uJEMPWwwt1QUdCglQ",
              },
              href: "https://api.spotify.com/v1/artists/18Eu7uJEMPWwwt1QUdCglQ",
              id: "18Eu7uJEMPWwwt1QUdCglQ",
              name: "INZO",
              type: "artist",
              uri: "spotify:artist:18Eu7uJEMPWwwt1QUdCglQ",
            },
          ],
          available_markets: [],
          disc_number: 1,
          duration_ms: 219333,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USA2P1880806",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3Qgf9x6O1MTvCTl0Wy6ibh",
          },
          href: "https://api.spotify.com/v1/tracks/3Qgf9x6O1MTvCTl0Wy6ibh",
          id: "3Qgf9x6O1MTvCTl0Wy6ibh",
          is_local: false,
          name: "Local Void",
          popularity: 5,
          preview_url: null,
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:3Qgf9x6O1MTvCTl0Wy6ibh",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:45:34Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/4oLeXFyACqeem2VImYeBFe",
                },
                href: "https://api.spotify.com/v1/artists/4oLeXFyACqeem2VImYeBFe",
                id: "4oLeXFyACqeem2VImYeBFe",
                name: "Fred again..",
                type: "artist",
                uri: "spotify:artist:4oLeXFyACqeem2VImYeBFe",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/07CimrZi5vs9iEao47TNQ4",
                },
                href: "https://api.spotify.com/v1/artists/07CimrZi5vs9iEao47TNQ4",
                id: "07CimrZi5vs9iEao47TNQ4",
                name: "Flowdan",
                type: "artist",
                uri: "spotify:artist:07CimrZi5vs9iEao47TNQ4",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/6YVJQPJNzHbqgBblpMSPUi",
            },
            href: "https://api.spotify.com/v1/albums/6YVJQPJNzHbqgBblpMSPUi",
            id: "6YVJQPJNzHbqgBblpMSPUi",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273352f154c54727bc8024629bc",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02352f154c54727bc8024629bc",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851352f154c54727bc8024629bc",
                width: 64,
              },
            ],
            name: "Rumble",
            release_date: "2023-01-04",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:6YVJQPJNzHbqgBblpMSPUi",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4oLeXFyACqeem2VImYeBFe",
              },
              href: "https://api.spotify.com/v1/artists/4oLeXFyACqeem2VImYeBFe",
              id: "4oLeXFyACqeem2VImYeBFe",
              name: "Fred again..",
              type: "artist",
              uri: "spotify:artist:4oLeXFyACqeem2VImYeBFe",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/07CimrZi5vs9iEao47TNQ4",
              },
              href: "https://api.spotify.com/v1/artists/07CimrZi5vs9iEao47TNQ4",
              id: "07CimrZi5vs9iEao47TNQ4",
              name: "Flowdan",
              type: "artist",
              uri: "spotify:artist:07CimrZi5vs9iEao47TNQ4",
            },
          ],

          disc_number: 1,
          duration_ms: 146571,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT22221613",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/1GfBLbAhZUWdseuDqhocmn",
          },
          href: "https://api.spotify.com/v1/tracks/1GfBLbAhZUWdseuDqhocmn",
          id: "1GfBLbAhZUWdseuDqhocmn",
          is_local: false,
          name: "Rumble",
          popularity: 74,
          preview_url:
            "https://p.scdn.co/mp3-preview/eb79af9f809883de0632f02388ec354478612754?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:1GfBLbAhZUWdseuDqhocmn",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T16:58:05Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/1HxJeLhIuegM3KgvPn8sTa",
                },
                href: "https://api.spotify.com/v1/artists/1HxJeLhIuegM3KgvPn8sTa",
                id: "1HxJeLhIuegM3KgvPn8sTa",
                name: "Jack Ü",
                type: "artist",
                uri: "spotify:artist:1HxJeLhIuegM3KgvPn8sTa",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5fMUXHkw8R8eOP2RNVYEZX",
                },
                href: "https://api.spotify.com/v1/artists/5fMUXHkw8R8eOP2RNVYEZX",
                id: "5fMUXHkw8R8eOP2RNVYEZX",
                name: "Diplo",
                type: "artist",
                uri: "spotify:artist:5fMUXHkw8R8eOP2RNVYEZX",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/6bfkwBrGYKJFk6Z4QVyjxd",
            },
            href: "https://api.spotify.com/v1/albums/6bfkwBrGYKJFk6Z4QVyjxd",
            id: "6bfkwBrGYKJFk6Z4QVyjxd",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b27357fc4730e06c9ab20c1e073b",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e0257fc4730e06c9ab20c1e073b",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d0000485157fc4730e06c9ab20c1e073b",
                width: 64,
              },
            ],
            name: "Skrillex and Diplo present Jack Ü",
            release_date: "2015-02-24",
            release_date_precision: "day",
            total_tracks: 10,
            type: "album",
            uri: "spotify:album:6bfkwBrGYKJFk6Z4QVyjxd",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/1HxJeLhIuegM3KgvPn8sTa",
              },
              href: "https://api.spotify.com/v1/artists/1HxJeLhIuegM3KgvPn8sTa",
              id: "1HxJeLhIuegM3KgvPn8sTa",
              name: "Jack Ü",
              type: "artist",
              uri: "spotify:artist:1HxJeLhIuegM3KgvPn8sTa",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5fMUXHkw8R8eOP2RNVYEZX",
              },
              href: "https://api.spotify.com/v1/artists/5fMUXHkw8R8eOP2RNVYEZX",
              id: "5fMUXHkw8R8eOP2RNVYEZX",
              name: "Diplo",
              type: "artist",
              uri: "spotify:artist:5fMUXHkw8R8eOP2RNVYEZX",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4abEgIF5hnsotmbZleI4Du",
              },
              href: "https://api.spotify.com/v1/artists/4abEgIF5hnsotmbZleI4Du",
              id: "4abEgIF5hnsotmbZleI4Du",
              name: "Fly Boi Keno",
              type: "artist",
              uri: "spotify:artist:4abEgIF5hnsotmbZleI4Du",
            },
          ],

          disc_number: 1,
          duration_ms: 173077,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT21500549",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/4gwF1NiLbZl2uKJDS3AX9O",
          },
          href: "https://api.spotify.com/v1/tracks/4gwF1NiLbZl2uKJDS3AX9O",
          id: "4gwF1NiLbZl2uKJDS3AX9O",
          is_local: false,
          name: "Beats Knockin (feat. Fly Boi Keno)",
          popularity: 52,
          preview_url:
            "https://p.scdn.co/mp3-preview/8eadae8919bd6f8d1adc8ba34dc50baee46c5e56?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 2,
          type: "track",
          uri: "spotify:track:4gwF1NiLbZl2uKJDS3AX9O",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T17:00:36Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/35TRsDL0Sv3Qxy17N3xd53",
            },
            href: "https://api.spotify.com/v1/albums/35TRsDL0Sv3Qxy17N3xd53",
            id: "35TRsDL0Sv3Qxy17N3xd53",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273fde6b82eea8105f5c5fe47b1",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02fde6b82eea8105f5c5fe47b1",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851fde6b82eea8105f5c5fe47b1",
                width: 64,
              },
            ],
            name: "Stranger (Skrillex Remix with Tennyson & White Sea)",
            release_date: "2016-01-15",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:35TRsDL0Sv3Qxy17N3xd53",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/3Nb8N20WChM0swo5qWTvm8",
              },
              href: "https://api.spotify.com/v1/artists/3Nb8N20WChM0swo5qWTvm8",
              id: "3Nb8N20WChM0swo5qWTvm8",
              name: "Tennyson",
              type: "artist",
              uri: "spotify:artist:3Nb8N20WChM0swo5qWTvm8",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5WzsdqnI9jOwLrW9YuXI4t",
              },
              href: "https://api.spotify.com/v1/artists/5WzsdqnI9jOwLrW9YuXI4t",
              id: "5WzsdqnI9jOwLrW9YuXI4t",
              name: "White Sea",
              type: "artist",
              uri: "spotify:artist:5WzsdqnI9jOwLrW9YuXI4t",
            },
          ],

          disc_number: 1,
          duration_ms: 270000,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT21504276",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/4EBqxBv4U2qro1UoBXtGhG",
          },
          href: "https://api.spotify.com/v1/tracks/4EBqxBv4U2qro1UoBXtGhG",
          id: "4EBqxBv4U2qro1UoBXtGhG",
          is_local: false,
          name: "Stranger (with KillaGraham and Sam Dew) - Skrillex Remix with Tennyson & White Sea",
          popularity: 42,
          preview_url:
            "https://p.scdn.co/mp3-preview/455f10defee8e250a634027219fb0af6ebe75067?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:4EBqxBv4U2qro1UoBXtGhG",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T17:17:58Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/2o5jDhthVPhrJdv3cEQ99Z",
                },
                href: "https://api.spotify.com/v1/artists/2o5jDhthVPhrJdv3cEQ99Z",
                id: "2o5jDhthVPhrJdv3cEQ99Z",
                name: "Tiësto",
                type: "artist",
                uri: "spotify:artist:2o5jDhthVPhrJdv3cEQ99Z",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5nki7yRhxgM509M5ADlN1p",
                },
                href: "https://api.spotify.com/v1/artists/5nki7yRhxgM509M5ADlN1p",
                id: "5nki7yRhxgM509M5ADlN1p",
                name: "Oliver Heldens",
                type: "artist",
                uri: "spotify:artist:5nki7yRhxgM509M5ADlN1p",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/4fb7waBlbxdo27oW09QrUg",
            },
            href: "https://api.spotify.com/v1/albums/4fb7waBlbxdo27oW09QrUg",
            id: "4fb7waBlbxdo27oW09QrUg",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273602b820ab2580496221dfdf3",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02602b820ab2580496221dfdf3",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851602b820ab2580496221dfdf3",
                width: 64,
              },
            ],
            name: "Wombass",
            release_date: "2015-11-27",
            release_date_precision: "day",
            total_tracks: 2,
            type: "album",
            uri: "spotify:album:4fb7waBlbxdo27oW09QrUg",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/2o5jDhthVPhrJdv3cEQ99Z",
              },
              href: "https://api.spotify.com/v1/artists/2o5jDhthVPhrJdv3cEQ99Z",
              id: "2o5jDhthVPhrJdv3cEQ99Z",
              name: "Tiësto",
              type: "artist",
              uri: "spotify:artist:2o5jDhthVPhrJdv3cEQ99Z",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5nki7yRhxgM509M5ADlN1p",
              },
              href: "https://api.spotify.com/v1/artists/5nki7yRhxgM509M5ADlN1p",
              id: "5nki7yRhxgM509M5ADlN1p",
              name: "Oliver Heldens",
              type: "artist",
              uri: "spotify:artist:5nki7yRhxgM509M5ADlN1p",
            },
          ],

          disc_number: 1,
          duration_ms: 240010,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CYA111500099",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/6etVFDSbFabj0tPY10MAXR",
          },
          href: "https://api.spotify.com/v1/tracks/6etVFDSbFabj0tPY10MAXR",
          id: "6etVFDSbFabj0tPY10MAXR",
          is_localidid: false,
          name: "Wombass",
          popularity: 53,
          preview_url:
            "https://p.scdn.co/mp3-preview/27963fa79fe8c2a03891bbe2135b214c9f730141?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:6etVFDSbFabj0tPY10MAXR",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T17:21:58Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/7rf1qZJ6hGSlPN7K9ShsVV",
            },
            href: "https://api.spotify.com/v1/albums/7rf1qZJ6hGSlPN7K9ShsVV",
            id: "7rf1qZJ6hGSlPN7K9ShsVV",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273f034b00d0a05cd6504b49beb",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02f034b00d0a05cd6504b49beb",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851f034b00d0a05cd6504b49beb",
                width: 64,
              },
            ],
            name: "Recess",
            release_date: "2014-03-14",
            release_date_precision: "day",
            total_tracks: 11,
            type: "album",
            uri: "spotify:album:7rf1qZJ6hGSlPN7K9ShsVV",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
          ],

          disc_number: 1,
          duration_ms: 302520,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT21400807",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3AGawd3ZkLbYQlxe4nZIEK",
          },
          href: "https://api.spotify.com/v1/tracks/3AGawd3ZkLbYQlxe4nZIEK",
          id: "3AGawd3ZkLbYQlxe4nZIEK",
          is_localid: false,
          name: "Ease My Mind (feat. Niki and the Dove)",
          popularity: 54,
          preview_url:
            "https://p.scdn.co/mp3-preview/67103f01ce8b5e6ec8de51023152ed45da86646d?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 10,
          type: "track",
          uri: "spotify:track:3AGawd3ZkLbYQlxe4nZIEK",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T17:27:58Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5dNqUwGTZcQQ09ecTKkCGH",
                },
                href: "https://api.spotify.com/v1/artists/5dNqUwGTZcQQ09ecTKkCGH",
                id: "5dNqUwGTZcQQ09ecTKkCGH",
                name: "Dirt Monkey",
                type: "artist",
                uri: "spotify:artist:5dNqUwGTZcQQ09ecTKkCGH",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/1H2sQcxrSaufbwZfOJCENB",
                },
                href: "https://api.spotify.com/v1/artists/1H2sQcxrSaufbwZfOJCENB",
                id: "1H2sQcxrSaufbwZfOJCENB",
                name: "Tucker Kreway",
                type: "artist",
                uri: "spotify:artist:1H2sQcxrSaufbwZfOJCENB",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/49LTRZVWYVH8RohdBvGtG8",
            },
            href: "https://api.spotify.com/v1/albums/49LTRZVWYVH8RohdBvGtG8",
            id: "49LTRZVWYVH8RohdBvGtG8",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273dcc4e0654c56a63645d07f93",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02dcc4e0654c56a63645d07f93",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851dcc4e0654c56a63645d07f93",
                width: 64,
              },
            ],
            name: "Party Anthem",
            release_date: "2014-11-24",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:49LTRZVWYVH8RohdBvGtG8",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5dNqUwGTZcQQ09ecTKkCGH",
              },
              href: "https://api.spotify.com/v1/artists/5dNqUwGTZcQQ09ecTKkCGH",
              id: "5dNqUwGTZcQQ09ecTKkCGH",
              name: "Dirt Monkey",
              type: "artist",
              uri: "spotify:artist:5dNqUwGTZcQQ09ecTKkCGH",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/1H2sQcxrSaufbwZfOJCENB",
              },
              href: "https://api.spotify.com/v1/artists/1H2sQcxrSaufbwZfOJCENB",
              id: "1H2sQcxrSaufbwZfOJCENB",
              name: "Tucker Kreway",
              type: "artist",
              uri: "spotify:artist:1H2sQcxrSaufbwZfOJCENB",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/6SGzHTNsuiDZbJnylcfxZl",
              },
              href: "https://api.spotify.com/v1/artists/6SGzHTNsuiDZbJnylcfxZl",
              id: "6SGzHTNsuiDZbJnylcfxZl",
              name: "Turner Jackson",
              type: "artist",
              uri: "spotify:artist:6SGzHTNsuiDZbJnylcfxZl",
            },
          ],

          disc_number: 1,
          duration_ms: 215172,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USLZJ1457331",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/6hsV46eyDKhXwJ2HGX6x4g",
          },
          href: "https://api.spotify.com/v1/tracks/6hsV46eyDKhXwJ2HGX6x4g",
          id: "6hsV46eyDKhXwJ2HGX6x4g",
          is_localid: false,
          name: "Party Anthem (feat. Turner Jackson) - Original Mix",
          popularity: 10,
          preview_url:
            "https://p.scdn.co/mp3-preview/5fbe3d3a6dbd7927fe8329d94569e858c7a6bcdb?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:6hsV46eyDKhXwJ2HGX6x4g",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T18:01:15Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/14XqctcPu0lzQjrUZ06Tsn",
                },
                href: "https://api.spotify.com/v1/artists/14XqctcPu0lzQjrUZ06Tsn",
                id: "14XqctcPu0lzQjrUZ06Tsn",
                name: "Going Quantum",
                type: "artist",
                uri: "spotify:artist:14XqctcPu0lzQjrUZ06Tsn",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/60PzPeEJV7zY0eu89FLBiS",
            },
            href: "https://api.spotify.com/v1/albums/60PzPeEJV7zY0eu89FLBiS",
            id: "60PzPeEJV7zY0eu89FLBiS",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273fe115b1b1c685299bce55878",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02fe115b1b1c685299bce55878",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851fe115b1b1c685299bce55878",
                width: 64,
              },
            ],
            name: "Raw",
            release_date: "2014-12-03",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:60PzPeEJV7zY0eu89FLBiS",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/14XqctcPu0lzQjrUZ06Tsn",
              },
              href: "https://api.spotify.com/v1/artists/14XqctcPu0lzQjrUZ06Tsn",
              id: "14XqctcPu0lzQjrUZ06Tsn",
              name: "Going Quantum",
              type: "artist",
              uri: "spotify:artist:14XqctcPu0lzQjrUZ06Tsn",
            },
          ],

          disc_number: 1,
          duration_ms: 229761,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CA6D21400078",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3S4Q8UyIrniN17nbkaxc8a",
          },
          href: "https://api.spotify.com/v1/tracks/3S4Q8UyIrniN17nbkaxc8a",
          id: "3S4Q8UyIrniN17nbkaxc8a",
          is_localid: false,
          name: "Raw",
          popularity: 34,
          preview_url:
            "https://p.scdn.co/mp3-preview/86611f8895119c4ca65e1709cab8b9d1f9b2c95d?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:3S4Q8UyIrniN17nbkaxc8a",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T18:04:58Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/24neLwyYRyj4ItaGnFeIT0",
                },
                href: "https://api.spotify.com/v1/artists/24neLwyYRyj4ItaGnFeIT0",
                id: "24neLwyYRyj4ItaGnFeIT0",
                name: "JOYRYDE",
                type: "artist",
                uri: "spotify:artist:24neLwyYRyj4ItaGnFeIT0",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/6L0LlKHUm3Tm72MYu1nQI8",
            },
            href: "https://api.spotify.com/v1/albums/6L0LlKHUm3Tm72MYu1nQI8",
            id: "6L0LlKHUm3Tm72MYu1nQI8",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b27371e6dcd829aad69e1baf6d4e",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e0271e6dcd829aad69e1baf6d4e",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d0000485171e6dcd829aad69e1baf6d4e",
                width: 64,
              },
            ],
            name: "FUEL TANK",
            release_date: "2016-11-11",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:6L0LlKHUm3Tm72MYu1nQI8",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/24neLwyYRyj4ItaGnFeIT0",
              },
              href: "https://api.spotify.com/v1/artists/24neLwyYRyj4ItaGnFeIT0",
              id: "24neLwyYRyj4ItaGnFeIT0",
              name: "JOYRYDE",
              type: "artist",
              uri: "spotify:artist:24neLwyYRyj4ItaGnFeIT0",
            },
          ],

          disc_number: 1,
          duration_ms: 230400,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CA5KR1532967",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/35JPDRlJ0mYEVktwBNYzoZ",
          },
          href: "https://api.spotify.com/v1/tracks/35JPDRlJ0mYEVktwBNYzoZ",
          id: "35JPDRlJ0mYEVktwBNYzoZ",
          is_localid: false,
          name: "FUEL TANK",
          popularity: 42,
          preview_url:
            "https://p.scdn.co/mp3-preview/3cb49e2f9a58efb835c188578268ea9c4b37ce8e?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:35JPDRlJ0mYEVktwBNYzoZ",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T18:11:45Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/043Bey7ngSGRFpJftAlKpi",
                },
                href: "https://api.spotify.com/v1/artists/043Bey7ngSGRFpJftAlKpi",
                id: "043Bey7ngSGRFpJftAlKpi",
                name: "Spag Heddy",
                type: "artist",
                uri: "spotify:artist:043Bey7ngSGRFpJftAlKpi",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/1FmvCvnTpGAnhEPTVrUUiz",
            },
            href: "https://api.spotify.com/v1/albums/1FmvCvnTpGAnhEPTVrUUiz",
            id: "1FmvCvnTpGAnhEPTVrUUiz",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2733dff73e82245b70a8046ce3c",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e023dff73e82245b70a8046ce3c",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048513dff73e82245b70a8046ce3c",
                width: 64,
              },
            ],
            name: "the Classics",
            release_date: "2017-05-05",
            release_date_precision: "day",
            total_tracks: 20,
            type: "album",
            uri: "spotify:album:1FmvCvnTpGAnhEPTVrUUiz",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/043Bey7ngSGRFpJftAlKpi",
              },
              href: "https://api.spotify.com/v1/artists/043Bey7ngSGRFpJftAlKpi",
              id: "043Bey7ngSGRFpJftAlKpi",
              name: "Spag Heddy",
              type: "artist",
              uri: "spotify:artist:043Bey7ngSGRFpJftAlKpi",
            },
          ],

          disc_number: 1,
          duration_ms: 205524,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CA5KR1554927",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/0kwOgIgYIKEsUXVWqt7qRI",
          },
          href: "https://api.spotify.com/v1/tracks/0kwOgIgYIKEsUXVWqt7qRI",
          id: "0kwOgIgYIKEsUXVWqt7qRI",
          is_localid: false,
          name: "Love On First Sine",
          popularity: 40,
          preview_url:
            "https://p.scdn.co/mp3-preview/65eca17bf7a95f25388234351c5f4c3779056fba?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 2,
          type: "track",
          uri: "spotify:track:0kwOgIgYIKEsUXVWqt7qRI",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T18:19:02Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5ttgIeUVka6FLyi00Uu5h8",
                },
                href: "https://api.spotify.com/v1/artists/5ttgIeUVka6FLyi00Uu5h8",
                id: "5ttgIeUVka6FLyi00Uu5h8",
                name: "Jauz",
                type: "artist",
                uri: "spotify:artist:5ttgIeUVka6FLyi00Uu5h8",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/548YUkLaLzti0BLqaWpn1W",
                },
                href: "https://api.spotify.com/v1/artists/548YUkLaLzti0BLqaWpn1W",
                id: "548YUkLaLzti0BLqaWpn1W",
                name: "Ephwurd",
                type: "artist",
                uri: "spotify:artist:548YUkLaLzti0BLqaWpn1W",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/2d1DhaOEU7QC6HbtBMJE99",
            },
            href: "https://api.spotify.com/v1/albums/2d1DhaOEU7QC6HbtBMJE99",
            id: "2d1DhaOEU7QC6HbtBMJE99",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2737513981214e71b7808498a7d",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e027513981214e71b7808498a7d",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048517513981214e71b7808498a7d",
                width: 64,
              },
            ],
            name: "Rock the Party",
            release_date: "2015-07-31",
            release_date_precision: "day",
            total_tracks: 2,
            type: "album",
            uri: "spotify:album:2d1DhaOEU7QC6HbtBMJE99",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5ttgIeUVka6FLyi00Uu5h8",
              },
              href: "https://api.spotify.com/v1/artists/5ttgIeUVka6FLyi00Uu5h8",
              id: "5ttgIeUVka6FLyi00Uu5h8",
              name: "Jauz",
              type: "artist",
              uri: "spotify:artist:5ttgIeUVka6FLyi00Uu5h8",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/548YUkLaLzti0BLqaWpn1W",
              },
              href: "https://api.spotify.com/v1/artists/548YUkLaLzti0BLqaWpn1W",
              id: "548YUkLaLzti0BLqaWpn1W",
              name: "Ephwurd",
              type: "artist",
              uri: "spotify:artist:548YUkLaLzti0BLqaWpn1W",
            },
          ],

          disc_number: 1,
          duration_ms: 190784,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "NLZ541500432",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/7uEPknv11u25vw3tRH6thx",
          },
          href: "https://api.spotify.com/v1/tracks/7uEPknv11u25vw3tRH6thx",
          id: "7uEPknv11u25vw3tRH6thx",
          is_localid: false,
          name: "Rock the Party - Radio Edit",
          popularity: 33,
          preview_url:
            "https://p.scdn.co/mp3-preview/b0977d7bda169e4f07dee4de765028ca268ac59a?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 2,
          type: "track",
          uri: "spotify:track:7uEPknv11u25vw3tRH6thx",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T20:14:38Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/0FvgCHaMG7KL6M83yJuhmL",
                },
                href: "https://api.spotify.com/v1/artists/0FvgCHaMG7KL6M83yJuhmL",
                id: "0FvgCHaMG7KL6M83yJuhmL",
                name: "Stephen Walking",
                type: "artist",
                uri: "spotify:artist:0FvgCHaMG7KL6M83yJuhmL",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/70XclGWx8qdDMXCNHgPNMU",
            },
            href: "https://api.spotify.com/v1/albums/70XclGWx8qdDMXCNHgPNMU",
            id: "70XclGWx8qdDMXCNHgPNMU",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273c436beb956d91ba3e8f7321e",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02c436beb956d91ba3e8f7321e",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851c436beb956d91ba3e8f7321e",
                width: 64,
              },
            ],
            name: "Top of the World 2",
            release_date: "2014-12-17",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:70XclGWx8qdDMXCNHgPNMU",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/0FvgCHaMG7KL6M83yJuhmL",
              },
              href: "https://api.spotify.com/v1/artists/0FvgCHaMG7KL6M83yJuhmL",
              id: "0FvgCHaMG7KL6M83yJuhmL",
              name: "Stephen Walking",
              type: "artist",
              uri: "spotify:artist:0FvgCHaMG7KL6M83yJuhmL",
            },
          ],

          disc_number: 1,
          duration_ms: 212466,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CA6D21400086",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/6s0iSdv9dForfYwakxE81m",
          },
          href: "https://api.spotify.com/v1/tracks/6s0iSdv9dForfYwakxE81m",
          id: "6s0iSdv9dForfYwakxE81m",
          is_localid: false,
          name: "Top of the World 2",
          popularity: 32,
          preview_url:
            "https://p.scdn.co/mp3-preview/d3a70118a0ff633161d3f2efb7ed900c9f3f03ef?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:6s0iSdv9dForfYwakxE81m",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T20:25:33Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
                },
                href: "https://api.spotify.com/v1/artists/3dz0NnIZhtKKeXZxLOxCam",
                id: "3dz0NnIZhtKKeXZxLOxCam",
                name: "Porter Robinson",
                type: "artist",
                uri: "spotify:artist:3dz0NnIZhtKKeXZxLOxCam",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/7AJPV0L05IyIBid97AvwVD",
            },
            href: "https://api.spotify.com/v1/albums/7AJPV0L05IyIBid97AvwVD",
            id: "7AJPV0L05IyIBid97AvwVD",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2731f675e7b8bae408653346dd9",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e021f675e7b8bae408653346dd9",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048511f675e7b8bae408653346dd9",
                width: 64,
              },
            ],
            name: "Worlds",
            release_date: "2014-08-12",
            release_date_precision: "day",
            total_tracks: 12,
            type: "album",
            uri: "spotify:album:7AJPV0L05IyIBid97AvwVD",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
              },
              href: "https://api.spotify.com/v1/artists/3dz0NnIZhtKKeXZxLOxCam",
              id: "3dz0NnIZhtKKeXZxLOxCam",
              name: "Porter Robinson",
              type: "artist",
              uri: "spotify:artist:3dz0NnIZhtKKeXZxLOxCam",
            },
          ],

          disc_number: 1,
          duration_ms: 141226,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USUG11400555",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/1p2t6x0xFXuB6zWcZZ0SmZ",
          },
          href: "https://api.spotify.com/v1/tracks/1p2t6x0xFXuB6zWcZZ0SmZ",
          id: "1p2t6x0xFXuB6zWcZZ0SmZ",
          is_localid: false,
          name: "Natural Light",
          popularity: 42,
          preview_url:
            "https://p.scdn.co/mp3-preview/8b4a6a052cf8678b2007f976199fc4fb1bbb407e?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 8,
          type: "track",
          uri: "spotify:track:1p2t6x0xFXuB6zWcZZ0SmZ",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T20:37:35Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
                },
                href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
                id: "5he5w2lnU9x7JFhnwcekXX",
                name: "Skrillex",
                type: "artist",
                uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/3QJzdZJYIAcoET1GcfpNGi",
                },
                href: "https://api.spotify.com/v1/artists/3QJzdZJYIAcoET1GcfpNGi",
                id: "3QJzdZJYIAcoET1GcfpNGi",
                name: "Damian Marley",
                type: "artist",
                uri: "spotify:artist:3QJzdZJYIAcoET1GcfpNGi",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/381oom8nio77eU6BuUb4UO",
            },
            href: "https://api.spotify.com/v1/albums/381oom8nio77eU6BuUb4UO",
            id: "381oom8nio77eU6BuUb4UO",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273599d75148c77c356edd9ea6f",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02599d75148c77c356edd9ea6f",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851599d75148c77c356edd9ea6f",
                width: 64,
              },
            ],
            name: "Make It Bun Dem",
            release_date: "2012-05-01",
            release_date_precision: "day",
            total_tracks: 1,
            type: "album",
            uri: "spotify:album:381oom8nio77eU6BuUb4UO",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5he5w2lnU9x7JFhnwcekXX",
              },
              href: "https://api.spotify.com/v1/artists/5he5w2lnU9x7JFhnwcekXX",
              id: "5he5w2lnU9x7JFhnwcekXX",
              name: "Skrillex",
              type: "artist",
              uri: "spotify:artist:5he5w2lnU9x7JFhnwcekXX",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/3QJzdZJYIAcoET1GcfpNGi",
              },
              href: "https://api.spotify.com/v1/artists/3QJzdZJYIAcoET1GcfpNGi",
              id: "3QJzdZJYIAcoET1GcfpNGi",
              name: "Damian Marley",
              type: "artist",
              uri: "spotify:artist:3QJzdZJYIAcoET1GcfpNGi",
            },
          ],

          disc_number: 1,
          duration_ms: 213696,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "USAT21202262",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/6AbVJjzv7thIvmMCuhZrmK",
          },
          href: "https://api.spotify.com/v1/tracks/6AbVJjzv7thIvmMCuhZrmK",
          id: "6AbVJjzv7thIvmMCuhZrmK",
          is_localid: false,
          name: "Make It Bun Dem",
          popularity: 68,
          preview_url:
            "https://p.scdn.co/mp3-preview/c8f71b4d3cc1c18ac4d9ab019cbd030213e03643?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 1,
          type: "track",
          uri: "spotify:track:6AbVJjzv7thIvmMCuhZrmK",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T20:41:58Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/74RET4rCZPTGzhsLjD0i3g",
                },
                href: "https://api.spotify.com/v1/artists/74RET4rCZPTGzhsLjD0i3g",
                id: "74RET4rCZPTGzhsLjD0i3g",
                name: "ATLiens",
                type: "artist",
                uri: "spotify:artist:74RET4rCZPTGzhsLjD0i3g",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/3MhFBixY5AIsosKy6Ol7HD",
            },
            href: "https://api.spotify.com/v1/albums/3MhFBixY5AIsosKy6Ol7HD",
            id: "3MhFBixY5AIsosKy6Ol7HD",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b273cada8a9b044e00f05aeabd2c",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e02cada8a9b044e00f05aeabd2c",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d00004851cada8a9b044e00f05aeabd2c",
                width: 64,
              },
            ],
            name: "Ghost Planet",
            release_date: "2019-07-24",
            release_date_precision: "day",
            total_tracks: 7,
            type: "album",
            uri: "spotify:album:3MhFBixY5AIsosKy6Ol7HD",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/74RET4rCZPTGzhsLjD0i3g",
              },
              href: "https://api.spotify.com/v1/artists/74RET4rCZPTGzhsLjD0i3g",
              id: "74RET4rCZPTGzhsLjD0i3g",
              name: "ATLiens",
              type: "artist",
              uri: "spotify:artist:74RET4rCZPTGzhsLjD0i3g",
            },
          ],

          disc_number: 1,
          duration_ms: 160014,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "CA5KR1937248",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/0lnfwG0JtYYmcmyHU7u0yi",
          },
          href: "https://api.spotify.com/v1/tracks/0lnfwG0JtYYmcmyHU7u0yi",
          id: "0lnfwG0JtYYmcmyHU7u0yi",
          is_localid: false,
          name: "Tantra",
          popularity: 47,
          preview_url:
            "https://p.scdn.co/mp3-preview/171617ca9175c281efd7482da474460a4123c87e?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 5,
          type: "track",
          uri: "spotify:track:0lnfwG0JtYYmcmyHU7u0yi",
        },
        video_thumbnail: {
          url: null,
        },
      },
      {
        added_at: "2023-01-09T20:48:47Z",
        added_by: {
          external_urls: {
            spotify: "https://open.spotify.com/user/galleta227",
          },
          href: "https://api.spotify.com/v1/users/galleta227",
          id: "galleta227",
          type: "user",
          uri: "spotify:user:galleta227",
        },
        is_localid: false,
        primary_color: null,
        track: {
          album: {
            album_type: "single",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/67qogtRNI0GjUr8PlaG6Zh",
                },
                href: "https://api.spotify.com/v1/artists/67qogtRNI0GjUr8PlaG6Zh",
                id: "67qogtRNI0GjUr8PlaG6Zh",
                name: "Zeds Dead",
                type: "artist",
                uri: "spotify:artist:67qogtRNI0GjUr8PlaG6Zh",
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5nki7yRhxgM509M5ADlN1p",
                },
                href: "https://api.spotify.com/v1/artists/5nki7yRhxgM509M5ADlN1p",
                id: "5nki7yRhxgM509M5ADlN1p",
                name: "Oliver Heldens",
                type: "artist",
                uri: "spotify:artist:5nki7yRhxgM509M5ADlN1p",
              },
            ],

            external_urls: {
              spotify: "https://open.spotify.com/album/6r41CMBKSxirkmFxBUEZLC",
            },
            href: "https://api.spotify.com/v1/albums/6r41CMBKSxirkmFxBUEZLC",
            id: "6r41CMBKSxirkmFxBUEZLC",
            images: [
              {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2733d62703fe420f69733001643",
                width: 640,
              },
              {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e023d62703fe420f69733001643",
                width: 300,
              },
              {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048513d62703fe420f69733001643",
                width: 64,
              },
            ],
            name: "You Know",
            release_date: "2015-03-02",
            release_date_precision: "day",
            total_tracks: 2,
            type: "album",
            uri: "spotify:album:6r41CMBKSxirkmFxBUEZLC",
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/67qogtRNI0GjUr8PlaG6Zh",
              },
              href: "https://api.spotify.com/v1/artists/67qogtRNI0GjUr8PlaG6Zh",
              id: "67qogtRNI0GjUr8PlaG6Zh",
              name: "Zeds Dead",
              type: "artist",
              uri: "spotify:artist:67qogtRNI0GjUr8PlaG6Zh",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/5nki7yRhxgM509M5ADlN1p",
              },
              href: "https://api.spotify.com/v1/artists/5nki7yRhxgM509M5ADlN1p",
              id: "5nki7yRhxgM509M5ADlN1p",
              name: "Oliver Heldens",
              type: "artist",
              uri: "spotify:artist:5nki7yRhxgM509M5ADlN1p",
            },
          ],

          disc_number: 1,
          duration_ms: 197429,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: "NLZ541400766",
          },
          external_urls: {
            spotify: "https://open.spotify.com/track/3f112WpuQSaVSIA6eA3PID",
          },
          href: "https://api.spotify.com/v1/tracks/3f112WpuQSaVSIA6eA3PID",
          id: "3f112WpuQSaVSIA6eA3PID",
          is_localid: false,
          name: "You Know - Radio Edit",
          popularity: 45,
          preview_url:
            "https://p.scdn.co/mp3-preview/1d45490a6f610da3adf2083b623479107b8c1de5?cid=0b297fa8a249464ba34f5861d4140e58",
          track: true,
          track_number: 2,
          type: "track",
          uri: "spotify:track:3f112WpuQSaVSIA6eA3PID",
        },
        video_thumbnail: {
          url: null,
        },
      },
    ],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 21,
  },
  type: "playlist",
  uri: "spotify:playlist:5HbNHADuYvl55kePbLEXmy",
};

userPlaylist.textContent = "User: " + playlist.owner.display_name; 
playlistImgMenu.src = playlist.images[1].url;
playlistName.textContent = "Playlist: " + playlist.name;
playlistNameMenu.textContent = playlist.name;

let songCount = 0;
// Obtener la referencia del tbody
const tbody = document.getElementById("playlistTableBody");

// Recorrer los items del mock
playlist.tracks.items.forEach((track) => {
  songCount++;

  //Contienen datos por ID del playlist -> HTML
  playlistImg.src = playlist.images[1].url;
  songsTotal.textContent = "Total de canciones: " + playlist.tracks.total;
  playlistOwner.textContent = "Autor: " + playlist.owner.display_name;


  // Crear una nueva fila (tr)
  const tr = document.createElement("tr");

  // Crear las celdas (td) con los datos correspondientes del numSong
  const numSong = document.createElement("th");
  numSong.textContent = songCount;

  //Crea las celdas (td) con los datos correspondientes al nombre de la canción
  const nameSong = document.createElement("td");
  nameSong.textContent = track.track.name;

  //Crea las celdas (td) con los datos correspondientes al nombre del artista
  const artistSong = document.createElement("td");
  artistSong.textContent = track.track.artists[0].name;

  //Crea las celdas (td) con los datos correspondientes a la duración de la canción
  const durationSong = document.createElement("td");
  const durationSongMinutes = Math.floor(track.track.duration_ms / 60000);
  const durationSongSegundos = Math.floor(
    (track.track.duration_ms % 60000) / 1000
  );
  const durationSongMS =
    durationSongMinutes +
    ":" +
    durationSongSegundos.toString().padStart(2, "0");
  durationSong.textContent = durationSongMS;

  //Crea las celdas (td) con los datos correspondientes al nombre del album
  const albumSong = document.createElement("td");
  albumSong.textContent = track.track.album.name;

  //Crea el elemento (button)
  const favButton = document.createElement("button");
  favButton.setAttribute("onClick", "songFav()");
  favButton.textContent = "Fav";
  
  //Asigna el elemento button a un td 
  const buttonCell = document.createElement("td");
  buttonCell.appendChild(favButton);

  //Crea el elemento (button)
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("onClick", "songDelete()");
  deleteButton.textContent = "delete";
  
  //Asigna el elemento button a un td 
  const buttonCellDelete = document.createElement("td");
  buttonCellDelete.appendChild(deleteButton);

  //Imprime valores en tr, orden de valores
  tr.appendChild(numSong);
  tr.appendChild(nameSong);
  tr.appendChild(artistSong);
  tr.appendChild(durationSong);
  tr.appendChild(albumSong);
  tr.appendChild(buttonCell);
  tr.appendChild(buttonCellDelete);

  // Agregar la fila al tbody
  tbody.appendChild(tr);
});

function songDelete(){
  console.log("Funciono y borro")
}

function songFav(){
  console.log("Funciono y añado a fav")
}
function goToFav(){
  const playlistSection = document.getElementById("sectionPlaylist");
  const playlistFavSection = document.getElementById("sectionPlaylistFav");

  playlistSection.style.display = "none";
  playlistFavSection.style.display = "block";
}
function goToSectionPlaylist(){
  const playlistFavSection = document.getElementById("sectionPlaylistFav");
  const playlistSection = document.getElementById("sectionPlaylist");

  playlistFavSection.style.display = "none";
  playlistSection.style.display = "block";
} */
