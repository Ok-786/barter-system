import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setSearchQuery }) => (
    <div>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            // label="Enter product name"
            variant="outlined"
            placeholder="Search..."
            color="secondary"
            size="small"
            sx={{
                "& fieldset": { borderRadius: '20px', border: '1px solid white' },
            }}
            InputLabelProps={{
                style: { color: 'white' },
            }}
            InputProps={{
                style: { color: 'white' },
                endAdornment: (
                    <SearchIcon />
                ),
            }}
        />
    </div>
);

export default SearchBar