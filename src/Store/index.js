import { purple } from '@mui/material/colors';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react'

export const ColorModeContext = createContext({
    toggleMode: () => { },
    mode: 'light'
});

export const ColorContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleMode: () =>
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
            mode,
        }),
        [mode]
    );
    const theme = createTheme({
        palette: {
            mode: mode,
            ...(mode === 'light' ? {
                background: {
                    paper: '#fff',
                    default: '#F6F6F6',
                }
            }
                :
                {
                    primary: {
                        // Purple and green play nicely together.
                        main: purple[500],
                      },
                      secondary: {
                        // This is green.A700 as hex.
                        main: '#11cb5f',
                      },
                    background: {
                        paper: '#212130',
                        default: '#171622'
                    },

                   
                })
        }
    });

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}