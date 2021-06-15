import palette from "./palette";
import props from "./props";
// import override from "./override";
import typography from "./typography";
import spacing from "./spacing";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    spacing,
    palette,
    props,
    // override,
    typography,
});
