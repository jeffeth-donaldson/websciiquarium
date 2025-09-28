```
 _ _ _     _           _ _ _____             _           
| | | |___| |_ ___ ___|_|_|     |_ _ ___ ___|_|_ _ _____ 
| | | | -_| . |_ -|  _| | |  |  | | | .'|  _| | | |     |
|_____|___|___|___|___|_|_|__  _|___|__,|_| |_|___|_|_|_|
                             |__|                        
```

[Production site](https://websciiquarium.vercel.app)

WebsciiQuarium is an open-source web application that simulates an aquarium using ASCII art. Inspired by the classic "xscreensaver" aquariums and the original [asciiquarium](https://github.com/cmatsuoka/asciiquarium) program by [Kirk Baucom](https://robobunny.com/wp/?cat=11) (repository owned by Claudio Matsuoka), this project brings a nostalgic terminal experience to modern web browsers.



## Features

- Interactive ASCII aquarium in your browser
- Multiple fish and tank decorations
- Customizable color schemes
- Persistent color scheme selection (remembers your choice)
- Responsive design
- Installable PWA

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

Clone the repository:
```sh
git clone https://github.com/jeffeth-donaldson/websciiquarium.git
cd websciiquarium
```

Install dependencies:
```sh
npm install
```

### Development

Start the development server:
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Customization

- **Color Schemes:**
  - Open the Settings modal to choose your preferred color scheme.
  - Your selection is saved and will be used on future visits.

## License

This project is licensed under the MIT License.

## Credits

- [asciiquarium](https://github.com/cmatsuoka/asciiquarium) originally by [Kirk Baucom](https://robobunny.com/wp/?cat=11), repository by Claudio Matsuoka
- [favicon.io](https://favicon.io) for favicon generator
- SvelteKit, Vite, and the open-source community

---

Enjoy your ASCII aquarium! 🐟
