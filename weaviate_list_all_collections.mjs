import weaviate from "weaviate-client";

async function main() {
  /**
   * Connects to the local Weaviate instance and lists all collections.
   *
   * @return {Promise<void>} Promise that resolves when all collections are listed successfully.
   * @throws {Error} If an error occurs while listing collections.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  try {
    // List all collections from Weaviate
    const allCollections = await client.collections.listAll();

    // Check if any collections exist
    if (allCollections.length === 0) {
      console.log("No collections found");
      return;
    }

    // Print the list of collections to the console
    console.log(allCollections);

    console.log("Collections listed successfully");
  } catch (error) {
    // Print any errors that occur to the console
    console.log("Error occurred while listing collections:", error);
  } finally {
    // Close the Weaviate client
    client.close();
  }
}

// Call the main function to execute the script
main();
