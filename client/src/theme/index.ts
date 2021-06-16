import palette from "./palette";
import props from "./props";
import overrides from "./overrides";
import typography from "./typography";
import spacing from "./spacing";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    spacing,
    // palette, //palette messed with with default UI, check LATER
    props,
    typography,
    overrides,
});
