import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    div: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    plot: {
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
    }
}));