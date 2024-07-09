import Slider from "@mui/material/Slider";

// Define the interface for SearchSlider component props
interface SearchSliderProps {
  onChange: (event: Event, value: number | number[]) => void; // Function to handle slider value changes
}

// Define and export the SearchSlider functional component
export default function SearchSlider({ onChange }: SearchSliderProps) {
  /**
   * Renders a slider with two marks.
   *
   * @param {Event} event - The slider value change event.
   * @param {number | number[]} value - The slider value.
   * @return {JSX.Element} - The JSX element representing the SearchSlider component.
   */

  return (
    <Slider
      valueLabelDisplay="auto"
      defaultValue={0.5}
      min={0}
      max={1}
      step={0.05}
      shiftStep={0.05}
      marks={[
        {
          value: 0,
          label: "Keyword search only",
        },
        {
          value: 1,
          label: "Vector search only",
        },
      ]}
      sx={{
        ".MuiSlider-markLabel": { color: "rgb(75 85 99)" },
        ".MuiSlider-markLabel[data-index='0']": { transform: "translateX(0%)" },
        ".MuiSlider-markLabel[data-index='1']": {
          transform: "translateX(-100%)",
        },
        ".MuiSlider-valueLabel": { backgroundColor: "#95c711" },
      }}
      onChange={onChange} // Calls onChange function on slider value change
    />
  );
}
