import weaviate from "weaviate-client";
import "dotenv/config";

async function main() {
  /**
   * Connects to the local Weaviate instance, retrieves a collection,
   * creates an iterator for the items in the retrieved collection,
   * loops through each item and prints it to the console. Catches and
   * prints any errors that occur, and finally closes the client connection.
   *
   * @return {Promise<void>} Promise that resolves when the collection is iterated successfully.
   * @throws {Error} If an error occurs while iterating the collection.
   */

  // Connect to the local Weaviate instance
  const client = await weaviate.connectToLocal();

  try {
    // Retrieve a collection from Weaviate
    const collection = await client.collections.get(
      process.env.WEAVIATE_COLLECTION_NAME
    );

    // Create an iterator for the items in the retrieved collection
    const items = await collection.iterator();

    // Loop through each item in the retrieved collection
    for await (let item of items) {
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
