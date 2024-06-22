import { SimpleToggleButton } from "../ToggleButton"
import icons from "lib/icons"
import { BlueLightServiceInstance as BlueLightService } from "service/bluelight.ts"

export const BlueLight = () => SimpleToggleButton({
    icon: icons.color.light,
    label: "Blue Light",
    toggle: () => {
        BlueLightService.toggleBlueLight();
    },
    connection: [
        BlueLightService,
        () => BlueLightService.isActive(),
    ],
})
