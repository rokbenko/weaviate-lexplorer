import weaviate from "weaviate-client";

async function main() {
  /**
   * Deletes the 'Podcast' collection from the local Weaviate instance.
   *
   * @return {Promise<void>} Promise that resolves when the 'Podcast' collection is deleted successfully.
   * @throws {Error} If an error occurs while deleting the 'Podcast' collection.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  try {
    // Delete the 'Podcast' collection
    await client.collections.delete("Podcast");

    console.log("Collection deleted successfully");
  } catch (error) {
    // Print any errors that occur to the console
    console.log("Error occurred while deleting the collection:", error);
  } finally {
    // Close the Weaviate client
    client.close();
  }
}

// Call the main function to execute the script
main();
