import { gql } from "graphql-request";

export const getRelease = gql`
  query getRelease($releaseSlug: String!, $soundHandle: String!) {
    mintedRelease(soundHandle: $soundHandle, releaseSlug: $releaseSlug) {
      id
      title
      artist {
        id
        name
      }
      coverImage {
        url
      }
      staticCoverImage {
        url
      }
      price
      eggGame {
        nft {
          serialNumber
        }
      }
      topNftsWithComment {
        songSlot
        comment {
          message
        }
      }
      track {
        id
        revealedAudio {
          url
        }
        normalizedPeaks
      }
    }
  }
`;
