import React from 'react';

export const themes = {
    light: {
        background: "#ffffff",
        title_left_color: "#00bfffff",
        title_right_color: "#f815d1c6",
        button_background: "#f815d166",
        button_shadow: "#f815d1c6",
        button_color: "#ffffff",
        modal_overlay: "#0000007f",
        text_color: '#000',
        card_background: '#ddfff7'
    },
    dark: {
        background: "#222222",
        title_left_color: "",
        title_right_color: "",
        button_background: "",
        button_shadow: "",
        button_color: "",
        modal_overlay: "",
        text_color: ''
    }
}

export const ThemeContext = React.createContext(themes.light);
