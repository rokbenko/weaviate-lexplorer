import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";

// Define the interface for SearchBar component props
interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input field changes
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function to handle search button click
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Function to handle keyboard events
  isLoading: boolean; // Flag to indicate if search is in progress
}

// Define and export the SearchBar functional component
export default function SearchBar({
  onChange,
  onSubmit,
  onKeyDown,
  isLoading,
}: SearchBarProps) {
  /**
   * Renders an input field with a search button.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input field change event.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The button click event.
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.
   * @param {boolean} isLoading - The flag to indicate if search is in progress.
   * @return {JSX.Element} - The JSX element representing the SearchBar component.
   */

  return (
    <>
      <OutlinedInput
        fullWidth={true}
        autoFocus={true}
        placeholder="What topic interests you in Lex Fridman's podcasts?"
        sx={{
          borderRadius: "0.5rem 0 0 0.5rem",
          ".MuiInputBase-input": { padding: "0.75rem 1rem" },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#95c711 !important",
          },
        }}
        onChange={onChange} // Calls onChange function on input change
        onKeyDown={onKeyDown} // Calls onKeyDown function on key press
      />
      <LoadingButton
        variant="contained"
        sx={{
          color: "white",
          borderRadius: "0 0.5rem 0.5rem 0",
          boxShadow: "none",
          padding: "0.75rem 1.5rem",
        }}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        onClick={onSubmit} // Calls onSubmit function on button click
      >
        Search
      </LoadingButton>
    </>
  );
}
