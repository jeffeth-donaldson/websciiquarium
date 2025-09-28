import { writable } from "svelte/store";
import type { TerminalColorScheme } from "../types/colors";

export function TerminalColorSchemeToCSSVariables(scheme: TerminalColorScheme): string {
    return `
        --black: ${scheme.black};
        --red: ${scheme.red};
        --green: ${scheme.green};
        --yellow: ${scheme.yellow};
        --blue: ${scheme.blue};
        --magenta: ${scheme.magenta};
        --cyan: ${scheme.cyan};
        --white: ${scheme.white};
        --bright-black: ${scheme.brightBlack};
        --bright-red: ${scheme.brightRed};
        --bright-green: ${scheme.brightGreen};
        --bright-yellow: ${scheme.brightYellow};
        --bright-blue: ${scheme.brightBlue};
        --bright-magenta: ${scheme.brightMagenta};
        --bright-cyan: ${scheme.brightCyan};
        --bright-white: ${scheme.brightWhite};
    `;
}

export const colorSchemes: TerminalColorScheme[] = [
    {
        name: 'Default',
        black: '#000000',
        red: '#FF5555',
        green: '#50FA7B',
        yellow: '#F1FA8C',
        blue: '#BD93F9',
        magenta: '#FF79C6',
        cyan: '#8BE9FD',
        white: '#BFBFBF',
        brightBlack: '#4D4D4D',
        brightRed: '#FF6E67',
        brightGreen: '#5AF78E',
        brightYellow: '#F4F99D',
        brightBlue: '#CAA9FA',
        brightMagenta: '#FF92D0',
        brightCyan: '#9AEDFE',
        brightWhite: '#E6E6E6'
    },
    {
        name: 'Solarized Dark',
        black: '#073642',
        red: '#DC322F',
        green: '#859900',
        yellow: '#B58900',
        blue: '#268BD2',
        magenta: '#D33682',
        cyan: '#2AA198',
        white: '#EEE8D5',
        brightBlack: '#002B36',
        brightRed: '#CB4B16',
        brightGreen: '#586E75',
        brightYellow: '#657B83',
        brightBlue: '#839496',
        brightMagenta: '#6C71C4',
        brightCyan: '#93A1A1',
        brightWhite: '#FDF6E3'
    },
    {
        name: 'Solarized Light',
        black: '#EEE8D5',
        red: '#DC322F',
        green: '#859900',
        yellow: '#B58900',
        blue: '#268BD2',
        magenta: '#D33682',
        cyan: '#2AA198',
        white: '#073642',
        brightBlack: '#FDF6E3',
        brightRed: '#CB4B16',
        brightGreen: '#586E75',
        brightYellow: '#657B83',
        brightBlue: '#839496',
        brightMagenta: '#6C71C4',
        brightCyan: '#93A1A1',
        brightWhite: '#002B36'
    },
    {
        name: 'Monokai',
        black: '#272822',
        red: '#F92672',
        green: '#A6E22E',
        yellow: '#F4BF75',
        blue: '#66D9EF',
        magenta: '#AE81FF',
        cyan: '#38CCD1',
        white: '#F8F8F2',
        brightBlack: '#75715E',
        brightRed: '#FD5FF1',
        brightGreen: '#B6E354',
        brightYellow: '#FFE792',
        brightBlue: '#9EFFFF',
        brightMagenta: '#E1D5FF',
        brightCyan: '#A1EFE4',
        brightWhite: '#F9F8F5'
    },
    {
        name: 'Gruvbox Dark',
        black: '#282828',
        red: '#CC241D',
        green: '#98971A',
        yellow: '#D79921',
        blue: '#458588',
        magenta: '#B16286',
        cyan: '#689D6A',
        white: '#A89984',
        brightBlack: '#928374',
        brightRed: '#FB4934',
        brightGreen: '#B8BB26',
        brightYellow: '#FABD2F',
        brightBlue: '#83A598',
        brightMagenta: '#D3869B',
        brightCyan: '#8EC07C',
        brightWhite: '#EBDBB2'
    },
    {
        name: 'Dracula',
        black: '#21222C',
        red: '#FF5555',
        green: '#50FA7B',
        yellow: '#F1FA8C',
        blue: '#BD93F9',
        magenta: '#FF79C6',
        cyan: '#8BE9FD',
        white: '#F8F8F2',
        brightBlack: '#6272A4',
        brightRed: '#FF6E6E',
        brightGreen: '#69FF94',
        brightYellow: '#FFFFA5',
        brightBlue: '#D6ACFF',
        brightMagenta: '#FF92DF',
        brightCyan: '#A4FFFF',
        brightWhite: '#FFFFFF'
    }
];

const LOCAL_KEY = 'colorScheme';

function getInitialScheme() {
    if (typeof localStorage === 'undefined') {
        return colorSchemes[0];
    }
  const saved = localStorage.getItem(LOCAL_KEY);
  return colorSchemes.find(s => s.name === saved) || colorSchemes[0];
}

export const currentScheme = writable(getInitialScheme());

currentScheme.subscribe((scheme) => {
    if (typeof localStorage === 'undefined') {
        return;
    }
  localStorage.setItem(LOCAL_KEY, scheme.name);
});