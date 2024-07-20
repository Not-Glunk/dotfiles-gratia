import { SimpleToggleButton } from "../ToggleButton"
import icons from "lib/icons"
import Wallpaper from "service/wallpaper"

export const RandomWallpaper = () => SimpleToggleButton({
    icon: icons.ui.wallpaper,
    label: "Wallpaper",
    toggle: () => {
        Wallpaper.random();
    },
    connection: [],
})
