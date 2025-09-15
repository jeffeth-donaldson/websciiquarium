<script>
    import { allFish } from "../art/fish";
    import Aquarium from "../components/aquarium.svelte";
    import Frame from "../components/frame.svelte";
    import Test from "../components/test.svelte";
    import { Fish } from "../elements/fish";
    const logo = `                                                         
 _ _ _     _           _ _ _____             _           
| | | |___| |_ ___ ___|_|_|     |_ _ ___ ___|_|_ _ _____ 
| | | | -_| . |_ -|  _| | |  |  | | | .'|  _| | | |     |
|_____|___|___|___|___|_|_|__  _|___|__,|_| |_|___|_|_|_|
                             |__|                        `
    // Iterate over fish art and display for a few seconds each
    let currentFishIndex = 23;
    // let logoWithFish = logo + "\n" + allFish[currentFishIndex] + "\n" + allFish[currentFishIndex + 1];
    // const interval = setInterval(() => {
    //     currentFishIndex = (currentFishIndex + 1) % allFish.length;
    //     logoWithFish = logo + "\n" + allFish[currentFishIndex];
    // }, 3000);
    // List of css colors
    const colors = ["red", "blue", "green", "orange", "purple", "cyan", "magenta", "yellow", "lime", "pink"];

    const myFish = new Fish(currentFishIndex);
    const logoWithFish = logo + "\n" + myFish.getDisplayArt(colors);
</script>

<div class="page">
<Aquarium/>
</div>
<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #e0f7fa;
        font-family: 'Courier New', Courier, monospace;
        padding: 0px;
    }

    h1 {
        color: #00796b;
        margin-bottom: 20px;
    }
</style>
