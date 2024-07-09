import weaviate from "weaviate-client";
import { vectorizer, dataType } from "weaviate-client";
import { parse } from "csv-parse/sync";
import fs from "fs";

// Function to create the Weaviate client
async function createWeaviateClient() {
  // Connect to the local Weaviate instance
  return await weaviate.connectToLocal();
}

// Function to create the Podcast_links collection
async function createPodcastLinksCollection(client) {
  // Create the collection with specified properties and vectorizer
  return await client.collections.create({
    name: "Podcast_links",
    vectorizers: vectorizer.text2VecOllama({
      apiEndpoint: "http://host.docker.internal:11434",
      model: "nomic-embed-text",
    }),
    properties: [
      {
        name: "number",
        dataType: dataType.INT,
        skipVectorization: true,
      },
      {
        name: "youtube_link",
        dataType: dataType.TEXT,
        skipVectorization: true,
      },
    ],
  });
}

// Function to read and parse the CSV file
function readCSVFile(filepath) {
  // Read and parse the CSV file into an array of arrays
  return parse(fs.readFileSync(filepath, "utf-8"));
}

// Function to process and insert each podcast link
async function processAndInsertPodcastLinks(
  podcastLinksCollection,
  podcastLinks
) {
  // Iterate over each link in the dataset
  for (let podcastLink of podcastLinks) {
    const [number, link] = podcastLink;

    // Create an object for insertion
    const linkObject = {
      number: parseInt(number), // Convert number to integer
      youtube_link: link,
    };

    // Attempt to insert the link object into the collection
    try {
      await podcastLinksCollection.data.insert(linkObject);

      console.log(`Inserted episode #${number} link successfully`);
    } catch (error) {
      console.log(`Failed to insert episode #${number} link:`, error);
    }
  }

  // Return the number of podcast links inserted
  return { linkCount: podcastLinks.length };
}

async function main() {
  /**
   * Executes the main function which creates a Weaviate client, creates a Podcast_links collection,
   * reads and parses a CSV file, removes the first line (header) from the dataset,
   * processes and inserts all podcast links, logs success messages or errors, and finally
   * closes the client connection.
   *
   * @return {Promise<void>} A promise that resolves when all podcast links are inserted successfully.
   * @throws {Error} If an error occurs while inserting the podcast links.
   */

  // Create the Weaviate client
  const client = await createWeaviateClient();

  try {
    // Create the Podcast_links collection
    const podcastLinksCollection = await createPodcastLinksCollection(client);

    // Read and parse the CSV file
    const podcastLinksDataset = readCSVFile("data/podcast_links_dataset.csv");

    // Remove the first line (header) from the dataset
    const allExceptFirst = podcastLinksDataset.slice(1);

    // Process and insert all podcast links
    const { linkCount } = await processAndInsertPodcastLinks(
      podcastLinksCollection,
      allExceptFirst
    );

    console.log(`Collection created successfully with ${linkCount} links`);
  } catch (error) {
    // Print any errors that occur to the console
    console.log("Error occurred while inserting links:", error);
  } finally {
    // Close the Weaviate client
    client.close();
  }
}

// Call the main function to execute the script
main();
