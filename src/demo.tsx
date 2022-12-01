import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type colorObj = {
  text: string;
  color: string;
  backgroundColor: string;
};
const colorValues: colorObj[] = [
  { text: "Red", color: "red", backgroundColor: "#f08080" },
  { text: "Blue", color: "blue", backgroundColor: "#bcd4e6" },
  { text: "Green", color: "green", backgroundColor: "#ACE1AF" },
  { text: "Orange", color: "orange", backgroundColor: "#ffdead" },
  { text: "Yellow", color: "yellow", backgroundColor: "#ffffe0" },
  { text: "Purple", color: "purple", backgroundColor: "#e6e6fa" },
  { text: "Brown", color: "brown", backgroundColor: "#bc8f8f" },
  { text: "Magenta", color: "magenta", backgroundColor: "#f4bbff" }
];

function getStyles(
  color: colorObj,

  isHovering: boolean
) {
  return {
    backgroundColor: isHovering ? color.backgroundColor : "",
    color: color.color
  };
}

const CustomMenuItem = ({ color, handleSelect }) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <MenuItem
      key={color.text}
      value={color}
      style={getStyles(color, isHovering)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleSelect(color)}
    >
      {color.text}
    </MenuItem>
  );
};

export default function MultipleSelectChip() {
  const [colors, setColors] = React.useState<colorObj[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof colors>) => {
    const {
      target: { value }
    } = event;

    setColors([...colors, value[value.length - 1]]);
    console.log(value);
  };

  const handleRemove = (color: colorObj) => {
    const newColors = colors.filter((value) => value.color !== color.color);
    setColors(newColors);
  };

  const handleSelect = (color: colorObj) => {
    setColors([...colors, color]);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Color</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={colors}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Box alignItems="centre" key={value.color}>
                  <div
                    key={value.text}
                    style={{
                      padding: "0.2rem 0.5rem",
                      color: value.color,
                      background: value.backgroundColor,
                      display: "flex",
                      outline: "solid 0.5px"
                    }}
                  >
                    {value.text}
                    <Box
                      height="100%"
                      margin="0.5px 0.5px 1px 6px"
                      onClick={(e) => {
                        handleRemove(value);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {" "}
                      X
                    </Box>
                  </div>
                </Box>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {colorValues.map((color) => (
            <CustomMenuItem
              color={color}
              key={color.color}
              handleSelect={handleSelect}
            />
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
