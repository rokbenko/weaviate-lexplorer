import weaviate from "weaviate-client";
import "dotenv/config";

async function main() {
  /**
   * Connects to the local Weaviate instance and deletes a collection. Catches and
   * prints any errors that occur, and finally closes the client connection.
   *
   * @return {Promise<void>} Promise that resolves when the collection is deleted successfully.
   * @throws {Error} If an error occurs while deleting the collection.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  try {
    // Delete the collection
    await client.collections.delete(process.env.WEAVIATE_COLLECTION_NAME);

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
