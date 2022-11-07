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
        card_background: '#ddfff7',
        recap_card_background: '#9edfe4cc',
        icon: 'dark_mode'
    },
    dark: {
        background: "#2b2a33ff",
        title_left_color: "#074f75",
        title_right_color: "#760322",
        button_background: "#42414dff",
        button_shadow: "#42414d7f",
        button_color: "#fff",
        modal_overlay: "#0000007f",
        text_color: '#fbfbfeff',
        card_background: '#42414dff',
        recap_card_background: '#42414dff',
        icon: 'light_mode'
    }
}

export const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => {}
});
