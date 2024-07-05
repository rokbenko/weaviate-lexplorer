import weaviate from "weaviate-client";

async function main() {
  /**
   * Connects to the local Weaviate instance, retrieves the 'Podcast' collection,
   * checks if the collection exists, creates an iterator for the items in the 'Podcast' collection,
   * loops through each item and prints it to the console. Catches and prints any errors that occur,
   * and finally closes the client connection.
   *
   * @return {Promise<void>} Promise that resolves when the function completes successfully.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  try {
    // Retrieve the 'Podcast' collection from Weaviate
    const podcastCollection = await client.collections.get("Podcast");

    // Check if the 'Podcast' collection exists
    if (!podcastCollection) {
      console.log("Collection not found");
      return;
    }

    // Create an iterator for the items in the 'Podcast' collection
    const podcastItems = await podcastCollection.iterator();

    // Loop through each item in the 'Podcast' collection
    for await (let item of podcastItems) {
      // Print the item to the console
      console.log(item);
    }

    console.log("Collection iterated successfully");
  } catch (error) {
    // Print any errors that occur to the console
    console.log("Error occurred while iterating the collection:", error);
  } finally {
    // Close the Weaviate client
    client.close();
  }
}

// Call the main function to execute the script
main();
