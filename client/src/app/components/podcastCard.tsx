import { PodcastType } from "@/app/types/podcast";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LaunchIcon from "@mui/icons-material/Launch";
import FormatQuote from "@mui/icons-material/FormatQuote";
import InfoIcon from "@mui/icons-material/Info";

// Define the interface for PodcastCard component props
interface PodcastCardProps {
  index: number;
  podcast: PodcastType;
  link?: string;
}

// Define and export the PodcastCard functional component
export default function PodcastCard({
  index,
  podcast,
  link,
}: PodcastCardProps) {
  /**
   * Renders a card with the following podcast details: index of the search result
   * (ranging from 1 to 10 since the hybrid search returns 10 results), podcast title,
   * podcast number, podcast guest, podcast transcription, and a YouTube link to watch
   * the podcast episode on YouTube if available.
   *
   * @param {number} index - The index of the podcast in the list of search results (1-10).
   * @param {PodcastType} podcast - The podcast object containing the following podcast details: title, number, guest, and transcription.
   * @param {string} link - The link to the YouTube video of the podcast episode.
   * @return {JSX.Element} - The JSX element representing the PodcastCard component.
   */

  return (
    <Card
      className="flex my-16"
      raised={true}
      sx={{
        padding: "2rem",
        "&.MuiPaper-rounded": { borderRadius: "0.75rem" },
        "&.MuiPaper-elevation": {
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <div>
        <h3 className="text-2xl text-gray-900 mb-2">
          {index}. {podcast.title}{" "}
          <Chip
            color="primary"
            size="small"
            label={podcast.distance.toFixed(3)}
            sx={{ color: "white" }}
          />
          <Tooltip
            title="The distance indicates how closely the podcast transcription chunk matches your search. It combines scores from keyword and vector searches, adjusted by the alpha you set using the slider. The higher the distance number, the more closely the podcast transcription chunk matches your search."
            className="opacity-25 ms-1"
          >
            <InfoIcon />
          </Tooltip>
        </h3>
        <h4 className="text-lg text-gray-600 mb-2">
          Episode #{podcast.number} – {podcast.guest}
        </h4>
        <div className="text-base text-gray-700">
          <FormatQuote
            className="text-green-100 opacity-50"
            sx={{ fontSize: "5rem" }}
          />
          <p className="w-10/12 mx-auto">/.../ {podcast.transcription} /.../</p>
          <div className="w-full flex justify-end">
            <FormatQuote
              className="text-green-100 opacity-50"
              sx={{ fontSize: "5rem" }}
            />
          </div>
        </div>
        {link && link !== "Removed" ? (
          <a
            className="text-base text-gray-700 hover:text-green-300 transition-colors duration-250 underline decoration-1 underline-offset-4"
            href={link}
            target="_blank"
          >
            Watch the episode on YouTube
            <LaunchIcon fontSize="small" className="ms-1" />
          </a>
        ) : (
          <div className="flex">
            <InfoIcon color="error" />{" "}
            <p className="text-red-500 ms-1">
              Podcast was removed from YouTube
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
