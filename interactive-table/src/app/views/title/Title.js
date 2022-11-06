import './title.css'
import { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";

export default function Title() {
    const theme = useContext(ThemeContext);

    return (
        <h1>
            <span style={{ color: theme.title_left_color }}>Miam</span>
            <span style={{ color: theme.title_right_color }}>Miam</span>
        </h1>
    )
}