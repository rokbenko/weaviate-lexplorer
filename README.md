<div align="center">
 
# Weaviate Lexplorer

<p style="display: flex; justify-content: center; align-items: center;">
  Powered by <img width=50 alt="Powered by Weaviate" src="https://github.com/rokbenko/weaviate-lexplorer/blob/main/client/public/weaviate.png" /> Weaviate
</p>

Enjoying what you find in this repository? Your star ⭐ would be greatly appreciated!

<br>

</div>

## 📖 Short description 📖

Weaviate Lexplorer is your 100% open-source go-to tool for deep insights from Lex Fridman's podcasts. Using hybrid search with Weaviate's vector database, it lets you dive into key discussions by analyzing podcast transcriptions in chunks. With a user-friendly input and slider interface, explore now and uncover the richness of Lex Fridman's podcasts.*

👉 See the app [demonstration](https://github.com/rokbenko/weaviate-lexplorer/blob/main/demonstration.gif).

<sub>\*Inspired by [QuoteFinder](https://github.com/weaviate/quote-finder/tree/main).</sub>

<br>

## 🚀 Getting started 🚀

### Step 1: Clone this repository

Run the following command in the terminal to clone this repository:

```
git clone https://github.com/rokbenko/weaviate-lexplorer.git
```

### Step 2: Set up Docker

Run the following command in the terminal to create Docker containers using the [`docker-compose.yaml`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/docker-compose.yaml):

```
docker compose up -d
```

> [!IMPORTANT]
> Having Docker installed is a prerequisite. If you don't have Docker installed, [install](https://www.docker.com/products/docker-desktop/) it.

### Step 3: Set up Ollama

Run the following command in the terminal to download Ollama embedding [`nomic-embed-text`](https://ollama.com/library/nomic-embed-text) LLM:

```
ollama pull nomic-embed-text:v1.5
```

> [!IMPORTANT]
> Having Ollama installed is a prerequisite. If you don't have Ollama installed, [install](https://ollama.com/) it.

### Step 4: Create Weaviate collections

There are two datasets inside the [`data`](https://github.com/rokbenko/weaviate-lexplorer/tree/main/data) directory:

 - [`podcast_dataset.csv`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/data/podcast_dataset.csv), downloaded from [Kaggle](https://www.kaggle.com/datasets/rajneesh231/lex-fridman-podcast-transcript)
 - [`podcast_links_dataset.csv`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/data/podcast_links_dataset.csv), created by the repository author

There are five JavaScript files inside the root directory:

 - [`weaviate_create_podcast_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_create_podcast_collection.mjs)
 - [`weaviate_create_podcast_links_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_create_podcast_links_collection.mjs)
 - [`weaviate_delete_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_delete_collection.mjs)
 - [`weaviate_iterate_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_iterate_collection.mjs)
 - [`weaviate_list_all_collections.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_list_all_collections.mjs)

**Only two out of five JavaScript files are mandatory to run.**

#### Step 4.1: Create the *Podcast* collection

Run the [`weaviate_create_podcast_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_create_podcast_collection.mjs) to create a Weaviate collection named *Podcast* from the [`podcast_dataset.csv`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/data/podcast_dataset.csv):

```
node weaviate_create_podcast_collection.mjs
```

> [!NOTE]
> The *Podcast* collection creation will take a long time. It can take even a day because the script needs to chunk all podcast transcriptions and insert them into Weaviate. Chunking is necessary for two reasons:
>
> 1. Without chunking, the context window limit of the [`nomic-embed-text`](https://ollama.com/library/nomic-embed-text) LLM will be hit because Lex Fridman's podcasts are long.
> 2. Without chunking, there's too much information, and the vector loses specificity. Consequently, the core functionality of the app (i.e., getting deep insights from Lex Fridman's podcasts) can't be achieved. Read more about why [chunking](https://stackoverflow.blog/2024/06/06/breaking-up-is-hard-to-do-chunking-in-rag-applications/) is important.

#### Step 4.2: Create the *Podcast_links* collection

Run the [`weaviate_create_podcast_links_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_create_podcast_links_collection.mjs) to create a Weaviate collection named *Podcast_links* from the [`podcast_links_dataset.csv`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/data/podcast_links_dataset.csv):

```
node weaviate_create_podcast_links_collection.mjs
```

The other three JavaScript files are meant for manipulating Weaviate collections:

 - [`weaviate_delete_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_delete_collection.mjs) can be used to delete a Weaviate collection.
 - [`weaviate_iterate_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_iterate_collection.mjs) can be used to iterate an already created Weaviate collection.
 - [`weaviate_list_all_collections.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_list_all_collections.mjs) can be used to list all already created Weaviate collections.

> [!IMPORTANT]
> The two out of three JavaScript files use the `.env` file. So, before you run [`weaviate_delete_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_delete_collection.mjs) or [`weaviate_iterate_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_iterate_collection.mjs), make sure you set up the `.env` file.
>
> Your `.env` file should contain the following environment variable:
>
> ```
> WEAVIATE_COLLECTION_NAME=xxxxx
> ```
>
> For example, if you set the `WEAVIATE_COLLECTION_NAME` environment variable to `WEAVIATE_COLLECTION_NAME=Podcast_test`, it means that running the two JavaScript files will:
>
> - Delete the collection named *Podcast_test*.
> - Iterate items in the collection named *Podcast_test*.

> [!IMPORTANT]
> Additionally, before you run [`weaviate_delete_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_delete_collection.mjs) or [`weaviate_iterate_collection.mjs`](https://github.com/rokbenko/weaviate-lexplorer/blob/main/weaviate_iterate_collection.mjs), make sure to install dependencies by running the following command in the terminal:
>
> ```
> npm install dotenv csv-parse @langchain/textsplitters
> ```

### Step 5: Change the directory

Run the following command in the terminal to change the directory:

```
cd client
```

### Step 6: Install dependencies

Run the following command to install all Next.js dependencies:

```
npm install
```

### Step 7: Run the app

Run the following command to run the Next.js development server:

```
npm run dev
```

### Step 8: View the app

To view the app, navigate to [http://localhost:3000](http://localhost:3000).

> [!IMPORTANT]
> All three Docker containers (i.e., `weaviate-1`, `ollama-1`, and `text-spellcheck-1`) and Ollama should be running while using the app. 

<br>

## 🤔 How does it work 🤔

Weaviate Lexplorer leverages advanced hybrid search technology to provide in-depth insights from Lex Fridman's podcast episodes. Here's a detailed breakdown of how it works:

1. Data collection and preparation
- **Podcast transcriptions:** The core data for Weaviate Lexplorer is the transcriptions of Lex Fridman's podcast episodes. Each transcription is broken down into smaller, manageable chunks for more detailed analysis.
- **Weaviate vector database:** The chunks of transcriptions are stored in the Weaviate vector database, which enables efficient and advanced search capabilities.

2. Hybrid search
- **Keyword search:** This traditional search method looks for exact matches of the search terms within the chunks of the podcast transcriptions.
- **Vector search:** This method leverages the Weaviate vector database to find semantically similar chunks to the search terms, even if the exact keywords are not present. It uses machine learning models to understand the context and meaning of the words.
- **Alpha parameter:** The alpha parameter allows the user to balance the importance of keyword search results versus vector search results. A slider control in the user interface lets users adjust this parameter to fine-tune their search.

3. User interaction
- **Search input:** Users can type in their search terms into a simple input field.
- **Alpha slider:** Users can adjust a slider to set the alpha parameter, which determines the mix between keyword and vector search results.
- **Search execution:** When the search is executed (either by pressing enter or clicking a search button), the application sends a query to the Weaviate vector database, which processes both keyword and vector searches based on the provided alpha value.

4. Results, processing, and display
- **Relevance scoring:** The results are scored based on their relevance, combining scores from both keyword and vector searches. The higher the score, the more relevant the chunk is to the user's query.
- **Loading skeleton:** While the search is being processed, loading skeleton cards are displayed to indicate that the application is working on retrieving the results.
- **Displaying results:** Once the search is complete, the results are displayed as a list of podcast episodes. Each episode is shown with its relevant transcription chunks highlighted, providing users with quick and easy access to the most relevant parts of the podcasts.

5. Additional features
- **Link integration:** For each podcast episode, relevant links (e.g., YouTube links) are displayed. If a link is marked as "Removed" in the database, the application will show a message indicating that the podcast was removed.
- **User experience:** The application uses Material UI components to ensure a responsive and aesthetically pleasing user interface.

By breaking down podcast transcriptions into chunks and leveraging hybrid search technology, Weaviate Lexplorer offers a powerful and user-friendly way to explore and discover insights from Lex Fridman's podcast episodes.

<br>

## ⚒️ Tech stack ⚒️

Weaviate Lexplorer works with the following tech stack:

| Tech                                                                               | Version            |
| ---------------------------------------------------------------------------------- | ------------------ |
| [Weaviate JS/TS client](https://www.npmjs.com/package/weaviate-client)             | `3.0.8`            |
| [Next.js](https://www.npmjs.com/package/next)                                      | `14.2.4`           |
| [React](https://www.npmjs.com/package/react)                                       | `^18`              |
| [TypeScript](https://www.npmjs.com/package/typescript)                             | `^5`               |
| [Tailwind CSS](https://www.npmjs.com/package/tailwindcss)                          | `^3.4.4`           |
| [SASS](https://www.npmjs.com/package/sass)                                         | `^1.77.6`          |
| [Material UI Next.js](https://www.npmjs.com/package/@mui/material-nextjs)          | `^5.15.11`         |
| [Material Lab](https://www.npmjs.com/package/@mui/lab)                             | `^5.0.0-alpha.171` |
| [Material Icons](https://www.npmjs.com/package/@mui/icons-material)                | `^5.16.0`          |
| [ESLint](https://www.npmjs.com/package/eslint)                                     | `^8`               |
| [Node.js](https://nodejs.org/en)                                                   | `21.2.0`           |
| [CSV parse](https://www.npmjs.com/package/csv-parse)                               | `5.5.6`            |
| [LangChain text splitters](https://www.npmjs.com/package/@langchain/textsplitters) | `0.0.3`            |
| [Dotenv](https://www.npmjs.com/package/dotenv)                                     | `16.4.5`           |

<br>

## ⚠️ Limitations ⚠️

1. The [Lex Fridman podcast transcript](https://www.kaggle.com/datasets/rajneesh231/lex-fridman-podcast-transcript) dataset is not up-to-date. The latest transcription is for podcast #325. Take this into account when using the app because Weaviate Lexplorer will only be able to search for podcast episodes up to #325.
2. Weaviate Lexplorer is not deployed on Vercel because it works with a local Weaviate setup using Docker.
3. The search feature takes longer to give search results because of the *Podcast_link* collection. Removing the link feature would make the search much faster, but one of the core features (i.e., simply clicking the link to start watching the YouTube podcast episode instead of manually searching for it on Lex Fridman's YouTube channel) would be lost. Having links in the [Lex Fridman podcast transcript](https://www.kaggle.com/datasets/rajneesh231/lex-fridman-podcast-transcript) dataset would be the best solution to speed up the search feature. In this case, there would be only the *Podcast* Weaviate collection with YouTube links added.

<br>

## 📽️ Demonstration 📽️

![Demonstration of Weaviate Lexplorer](https://github.com/rokbenko/weaviate-lexplorer/blob/main/demonstration.gif)

<br>

## 🤝 Contributing 🤝

Contributions are welcome! Feel free to [open issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) or [create pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) for any improvements or bug fixes.

<br>

## ⭐ Star history ⭐

[![Star history chart](https://api.star-history.com/svg?repos=rokbenko/weaviate-lexplorer&type=Date)](https://star-history.com/#rokbenko/weaviate-lexplorer&Date)

<br>

## 📝 License 📝

This project is open source and available under the [MIT License](https://github.com/rokbenko/weaviate-lexplorer/blob/main/LICENSE).
