"use client";

import { useState } from "react";
import Image from "next/image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PodcastType } from "@/app/types/podcast";
import { queryPodcasts } from "@/app/actions/weaviateHybridSearch";
import { iteratePodcastLinks } from "./actions/weaviateIterate";
import SearchBar from "@/app/components/searchBar";
import SearchSlider from "@/app/components/searchSlider";
import Loading from "@/app/components/loading";
import PodcastCard from "@/app/components/podcastCard";

// Define the Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#95c711",
    },
  },
});

// Define and export the Home functional component
export default function Home() {
  /**
   * Renders the home page of the app.
   * - Displays Weaviate Lexplorer branding and description.
   * - Allows the user to search for Lex Fridman's podcasts based on a search term and alpha value
   * using the SearchBar and SearchSlider components.
   * - Displays skeleton loading cards using the Loading component until search results
   * are fetched.
   * - Renders 10 search results using the PodcastCard component with podcast details
   * and a YouTube link.
   *
   * @returns {JSX.Element} - The JSX element representing the Home component.
   */

  // Define the state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [alpha, setAlpha] = useState(0.5);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [podcastLinks, setPodcastLinks] = useState<
    { number: number; link: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Define a function to handle the change event of the slider
  const handleSliderChange = async (event: Event, value: number | number[]) => {
    /**
     * Handles the change event of the slider.
     *
     * @param {Event} event - The event object.
     * @param {number | number[]} value - The new value of the slider.
     * @return {Promise<void>} - The promise that resolves when the slider is changed.
     */

    if (typeof value === "number") {
      setAlpha(value);
    }

    // Prevent the default form submission
    event.preventDefault();

    // Set the loading state to true
    setLoading(true);

    // Call the queryPodcasts function with the search term and alpha value
    const podcasts = await queryPodcasts(searchTerm, alpha);
    // Set the search results in the state
    setPodcasts(podcasts);

    // Set the loading state to false
    setLoading(false);
  };

  // Define a function to handle the change event of the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * Handles the change event of the input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The event object representing the input change.
     * @return {void} No return value.
     */

    // Set the search term in the state
    setSearchTerm(event.target.value);
  };

  const handleInputSubmitOnButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    /**
     * Handles the input submit event when the button is clicked.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The event object representing the button click.
     * @return {Promise<void>} - The promise that resolves when the input submit is handled.
     */

    // Prevent the default form submission
    event.preventDefault();

    // Set the loading state to true
    setLoading(true);

    // Call the queryPodcasts function with the search term and alpha value
    const podcasts = await queryPodcasts(searchTerm, alpha);
    // Set the search results in the state
    setPodcasts(podcasts);

    // Call the iteratePodcastLinks function with the search results
    const links = await iteratePodcastLinks(podcasts);
    // Set the podcast links in the state
    setPodcastLinks(links);

    // Set the loading state to false
    setLoading(false);
  };

  const handleInputSubmitOnKeyPress = async (event: React.KeyboardEvent) => {
    /**
     * Handles the input submit event when a key is pressed.
     *
     * @param {React.KeyboardEvent} event - The event object representing the key press.
     * @return {Promise<void>} - The promise that resolves when the input submit is handled.
     */

    // Check if the key pressed is the Enter key
    if (event.key === "Enter") {
      // Prevent the default form submission
      event.preventDefault();

      // Set the loading state to true
      setLoading(true);

      // Call the queryPodcasts function with the search term and alpha value
      const podcasts = await queryPodcasts(searchTerm, alpha);
      // Set the search results in the state
      setPodcasts(podcasts);

      // Call the iteratePodcastLinks function with the search results
      const links = await iteratePodcastLinks(podcasts);
      // Set the podcast links in the state
      setPodcastLinks(links);

      // Set the loading state to false
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className="relative min-h-screen flex flex-col items-center">
        <div className="z-10 max-w-3xl">
          <h1 className="text-5xl text-gray-900 text-center font-semibold mt-4 mb-6">
            Weaviate <span className="text-green-300">Lex</span>plorer
          </h1>
          <h2 className="text-2xl text-gray-700 text-center text-xl mb-4">
            Discover insights from Lex Fridman's podcasts
          </h2>
          <div className="text-base text-gray-600 text-center mb-1">
            <span>Made with ❤️ by </span>
            <a
              className="hover:text-green-300 transition-colors duration-250 underline decoration-1 underline-offset-4"
              href="https://linktr.ee/rokbenko"
              target="_blank"
            >
              Rok Benko
            </a>
          </div>
          <div className="text-base text-gray-600 text-center flex items-center justify-center mb-6">
            <span className="mr-1">Powered by</span>
            <Image
              src="/weaviate.png"
              alt="Weaviate logo"
              width={40}
              height={40}
              className="mr-1"
            />
            <a
              className="hover:text-green-300 transition-colors duration-250 underline decoration-1 underline-offset-4 flex items-center"
              href="https://weaviate.io"
              target="_blank"
            >
              Weaviate
            </a>
          </div>
          <div className="text-lg text-gray-600 mb-8">
            Weaviate Lexplorer is your go-to tool for deep insights from Lex
            Fridman's podcasts. Using hybrid search with Weaviate's vector
            database, it lets you dive into key discussions by analyzing podcast
            transcriptions in chunks. With a user-friendly input and slider
            interface, explore now and uncover the richness of Lex Fridman's
            podcasts.
          </div>
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex mb-4">
              <SearchBar
                onChange={handleInputChange}
                onSubmit={handleInputSubmitOnButtonClick}
                onKeyDown={handleInputSubmitOnKeyPress}
                isLoading={loading}
              />
            </div>
            <SearchSlider onChange={handleSliderChange} />
          </div>
          {loading ? (
            // Display 10 skeleton loading cards
            <Loading times={10} />
          ) : (
            // Display the search results
            // Use the map function to render the PodcastCard component for each podcast
            podcasts.map((podcast, index) => {
              // Find the link data for the podcast
              const linkData = podcastLinks.find(
                (linkObj) => linkObj.number === podcast.number
              );
              // Extract the link from the link data
              const link = linkData ? linkData.link : undefined;

              return (
                <PodcastCard
                  key={index}
                  index={index + 1}
                  podcast={podcast}
                  link={link}
                />
              );
            })
          )}
        </div>
        <Image
          src="/lex.svg"
          alt="Lex Fridman portrait line drawing"
          width={0}
          height={0}
          sizes="100vh"
          style={{ width: "auto", height: "100%" }}
          className="fixed top-0 left-0 grayscale opacity-[0.08]"
        />
      </main>
    </ThemeProvider>
  );
}
