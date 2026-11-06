import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const PaginationBar = ({ page, totalPages, onChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Pagination
        
        count={Math.min(totalPages || 1, 500)}
        page={page}
        onChange={(event, value) => {
          onChange(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        color="primary"
        size="large"
        sx={{ backgroundColor: "white", borderRadius: 1, padding: "6px" }}
      />
    </Box>
  );
};

export default PaginationBar;