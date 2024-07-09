import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

// Define the interface for Loading component props
interface LoadingProps {
  times: number;
}

// Define and export the Loading functional component
export default function Loading({ times: number = 1 }: LoadingProps) {
  /**
   * Renders a skeleton loading card with a specified number of times.
   *
   * @param {number} times - The number of times to render the skeleton loading card.
   * @return {JSX.Element} - The JSX element representing the Loading component.
   */

  // Define the skeleton elements
  const skeleton = (
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
      <Stack spacing={2} className="w-full">
        <Stack>
          <Stack spacing={1} direction="row">
            <Skeleton height="3rem" width="50%" />
            <Skeleton
              animation="wave"
              variant="text"
              className="rounded-3xl w-[48px] h-[32px] mx-auto"
            />
          </Stack>
          <Stack>
            <Skeleton height="2rem" width="25%" />
          </Stack>
        </Stack>
        <Stack>
          <Skeleton height="4rem" width="3rem" />
        </Stack>
        <Stack className="w-[80%] flex justify-center mx-auto">
          <Stack sx={{ transform: "translateX(70px)" }}>
            <Skeleton height="1.25rem" width="95%" />
            <Skeleton height="1.25rem" width="99%" />
            <Skeleton height="1.25rem" width="97%" />
            <Skeleton height="1.25rem" width="94%" />
            <Skeleton height="1.25rem" width="96%" />
            <Skeleton height="1.25rem" width="33.33%" />
          </Stack>
        </Stack>
        <Stack className="h-full flex items-end">
          <Skeleton height="4rem" width="3rem" />
        </Stack>
        <Stack>
          <Skeleton height="1.5rem" width="33.33%" />
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <div className="max-w-3xl w-full my-8" key={index}>
          {skeleton}
        </div>
      ))}
    </>
  );
}
