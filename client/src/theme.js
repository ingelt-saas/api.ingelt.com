import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => {
    return (mode === 'dark' ? {
        blue: {
            100: "#00142d",
            200: "#00285a",
            300: "#003c87",
            400: "#0050b4",
            500: "#0064e1",
            600: "#3383e7",
            700: "#66a2ed",
            800: "#99c1f3",
            900: "#cce0f9",
        },
        black: {
            100: "#000000",
            200: "#000000",
            300: "#000000",
            400: "#000000",
            500: "#000000",
            600: "#333333",
            700: "#666666",
            800: "#999999",
            900: "#cccccc",
        },
        white: {
            100: "#333333",
            200: "#666666",
            300: "#999999",
            400: "#cccccc",
            500: "#ffffff",
            600: "#ffffff",
            700: "#ffffff",
            800: "#ffffff",
            900: "#ffffff",
        },
    } : {
        blue: {
            100: "#cce0f9",
            200: "#99c1f3",
            300: "#66a2ed",
            400: "#3383e7",
            500: "#0064e1",
            600: "#0050b4",
            700: "#003c87",
            800: "#00285a",
            900: "#00142d"
        },
        black: {
            100: "#cccccc",
            200: "#999999",
            300: "#666666",
            400: "#333333",
            500: "#000000",
            600: "#000000",
            700: "#000000",
            800: "#000000",
            900: "#000000"
        },
        white: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
    }
    );
};

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.blue[500],
                    },
                    secondary: {
                        main: colors.white[500],
                    },
                    background: {
                        default: colors.black[400],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.black[500],
                    },
                    background: {
                        default: colors.white[400],
                    },
                }),
        },
        shadows: [
            "none",
            "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
            "0px 6px 8px 0px rgba(0, 0, 0, 0.25)",
            "0px 15px 52px 15px rgba(50, 59, 82, 0.15)",
            ...Array(20).fill("none"),
        ],
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {

    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};