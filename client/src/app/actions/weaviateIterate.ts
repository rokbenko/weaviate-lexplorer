"use server";

import weaviate from "weaviate-client";
import { PodcastType } from "@/app/types/podcast";

// Define and export the iteratePodcastLinks function
export async function iteratePodcastLinks(podcasts: PodcastType[]) {
  /**
   * Iterates through the Podcast_links collection and extracts links with associated numbers
   * based on input podcasts.
   *
   * @param {PodcastType[]} podcasts - The array of podcasts to extract numbers from.
   * @return {Promise<{ number: number; link: string }[]>} - The array of objects containing number and link pairs.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  // Get the Podcast_links collection
  const podcastLinksCollection = await client.collections.get("Podcast_links");

  // Initialize an array to store links with their associated numbers
  let linksArray: { number: number; link: string }[] = [];

  // Iterate through all podcasts to get their numbers
  const podcastNumbers = podcasts.map((podcast) => podcast.number);

  // Perform the iterator on the Podcast_links collection
  const links = await podcastLinksCollection.iterator();

  // Iterate through the links
  for await (let link of links) {
    // Get the link number and link URL
    const linkNumber = link.properties.number as number | null;
    const linkUrl = link.properties.youtube_link as string | null;

    // Check if linkNumber and linkUrl are not null
    if (
      linkNumber !== null &&
      linkUrl !== null &&
      podcastNumbers.includes(linkNumber)
    ) {
      // Add the link with its number to the linksArray
      linksArray.push({
        number: linkNumber,
        link: linkUrl,
      });
    }
  }

  // Return the linksArray
  return linksArray;
}
