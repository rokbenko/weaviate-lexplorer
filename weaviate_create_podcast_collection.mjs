import weaviate from "weaviate-client";
import { vectorizer, dataType } from "weaviate-client";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { parse } from "csv-parse/sync";
import fs from "fs";

// Function to create the Weaviate client
async function createWeaviateClient() {
  // Connect to the local Weaviate instance
  return await weaviate.connectToLocal();
}

// Function to create the Podcast collection
async function createPodcastCollection(client) {
  // Create the collection with specified properties and vectorizer
  return await client.collections.create({
    name: "Podcast",
    vectorizers: vectorizer.text2VecOllama({
      apiEndpoint: "http://host.docker.internal:11434",
      model: "nomic-embed-text",
    }),
    properties: [
      {
        name: "number",
        dataType: dataType.INT,
      },
      {
        name: "guest",
        dataType: dataType.TEXT,
      },
      {
        name: "title",
        dataType: dataType.TEXT,
      },
      {
        name: "transcription",
        dataType: dataType.TEXT,
      },
    ],
  });
}

// Function to read and parse the CSV file
function readCSVFile(filepath) {
  // Read and parse the CSV file into an array of arrays
  return parse(fs.readFileSync(filepath, "utf-8"));
}

// Function to process and insert each podcast
async function processAndInsertPodcasts(podcastCollection, podcasts) {
  // Initialize the text splitter with specified settings
  const textSplitter = new RecursiveCharacterTextSplitter({
    separators: [
      "\n\n",
      "\n",
      " ",
      ".",
      ",",
      "\u200b",
      "\uff0c",
      "\u3001",
      "\uff0e",
      "\u3002",
      "",
    ],
    chunkSize: 500,
    chunkOverlap: 50,
  });

  // Initialize the overall chunk counter
  let overallChunkCounter = 0;

  // Iterate over each podcast in the dataset
  for (let podcast of podcasts) {
    const [number, guest, title, transcription] = podcast;

    // Split the transcription into smaller chunks
    const chunkedTranscription = await textSplitter.splitText(transcription);

    // Initialize the episode chunk counter
    let episodeChunkCounter = 0;

    // Iterate over each chunk and create an object for insertion
    for (const chunk of chunkedTranscription) {
      const podcastObject = {
        number: parseInt(number), // Convert number to integer
        guest: guest,
        title: title,
        transcription: chunk,
      };

      // Increment the overall and episode chunk counters
      overallChunkCounter++;
      episodeChunkCounter++;

      // Attempt to insert the podcast object into the collection
      try {
        await podcastCollection.data.insert(podcastObject);

        console.log(
          `Inserted episode #${number} chunk #${episodeChunkCounter} successfully`
        );
      } catch (error) {
        console.log(
          `Failed to insert episode #${number} chunk #${episodeChunkCounter}:`,
          error
        );
      }
    }
  }

  // Return the number of episodes and chunks inserted
  return { episodeCount: podcasts.length, chunkCount: overallChunkCounter };
}

async function main() {
  /**
   * Executes the main function which creates a Weaviate client, creates a Podcast collection,
   * reads and parses a CSV file, removes the first line (header) from the dataset,
   * processes and inserts all podcast episodes, logs success messages or errors, and finally
   * closes the client connection.
   *
   * @return {Promise<void>} A promise that resolves when all podcast episodes are inserted successfully.
   * @throws {Error} If an error occurs while inserting the podcast episodes.
   */

  // Create the Weaviate client
  const client = await createWeaviateClient();

  try {
    // Create the Podcast collection
    const podcastCollection = await createPodcastCollection(client);

    // Read and parse the CSV file
    const podcastDataset = readCSVFile("data/podcast_dataset.csv");

    // Remove the first line (header) from the dataset
    const allExceptFirst = podcastDataset.slice(1);

    // Process and insert all podcast episodes
    const { episodeCount, chunkCount } = await processAndInsertPodcasts(
      podcastCollection,
      allExceptFirst
    );

    console.log(
      `Collection created successfully with ${episodeCount} episodes and ${chunkCount} chunks`
    );
  } catch (error) {
    // Print any errors that occur to the console
    console.log("Error occurred while inserting episodes:", error);
  } finally {
    // Close the Weaviate client
    client.close();
  }
}

// Call the main function to execute the script
main();
