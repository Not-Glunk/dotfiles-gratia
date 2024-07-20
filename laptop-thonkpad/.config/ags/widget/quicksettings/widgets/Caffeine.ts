import { SimpleToggleButton } from "../ToggleButton"
import icons from "lib/icons"
import { CaffeineServiceInstance as CaffeineService } from "service/caffeine.ts"

export const Caffeine = () => SimpleToggleButton({
    icon: icons.caffeine.macchiato,
    label: "Caffeine",
    toggle: () => {
        CaffeineService.toggleCaffeine();
    },
    connection: [
        CaffeineService,
        () => CaffeineService.isActive(),
    ],
})
