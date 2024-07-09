import GitHubIcon from "@mui/icons-material/GitHub";

// Define and export the Header functional component
export default function Header() {
  /**
   * Renders a header with a link to the GitHub repository of the project.
   *
   * @return {JSX.Element} - The JSX element representing the Header component.
   */

  return (
    <header className="max-w-7xl w-full flex justify-end mx-auto">
      <a
        className="hover:text-green-400 transition-colors duration-250"
        href="https://github.com/rokbenko/weaviate-lexplorer"
        target="_blank"
      >
        <GitHubIcon />
      </a>
    </header>
  );
}
