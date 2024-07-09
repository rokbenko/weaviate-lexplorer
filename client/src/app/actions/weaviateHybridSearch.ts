"use server";

import weaviate from "weaviate-client";
import { PodcastType } from "@/app/types/podcast";

// Define and export the queryPodcasts function
export async function queryPodcasts(searchTerm: string, alpha: number) {
  /**
   * Queries the Podcast collection based on a search term and alpha value.
   *
   * @param {string} searchTerm - The search term to query for.
   * @param {number} alpha - The alpha value to use for the hybrid search.
   * @return {Promise<PodcastType[]>} - The array of PodcastType objects representing the search results.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  // Get the Podcast collection
  const podcastCollection = await client.collections.get<
    Omit<PodcastType, "distance">
  >("Podcast");

  // Perform the hybrid search on the Podcast collection
  const { objects } = await podcastCollection.query.hybrid(searchTerm, {
    limit: 10,
    alpha: alpha,
    returnMetadata: ["score"],
    returnProperties: ["number", "guest", "title", "transcription"],
  });

  // Process the results
  const podcasts: PodcastType[] = objects.map((podcast: any) => ({
    ...podcast.properties,
    distance: podcast.metadata?.score!!,
  }));

  // Return the podcasts
  return podcasts;
}
