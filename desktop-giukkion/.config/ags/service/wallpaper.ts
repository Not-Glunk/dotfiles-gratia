import options from "options"
import { dependencies, sh } from "lib/utils"

export type Resolution = 1920 | 1366 | 3840
export type Market =
    | "random"
    | "en-US"
    | "ja-JP"
    | "en-AU"
    | "en-GB"
    | "de-DE"
    | "en-NZ"
    | "en-CA"

const WP = `${Utils.HOME}/.config/background.png`

class Wallpaper extends Service {
    static {
        Service.register(this, {}, {
            "wallpaper": ["string"],
        })
    }

    #blockMonitor = false

    #wallpaper() {
        if (!dependencies("swww"))
            return

        sh("hyprctl cursorpos").then(pos => {
            sh([
                "swww", "img",
                "--invert-y",
                "--transition-type", "grow",
                "--transition-pos", pos.replace(" ", ""),
                WP,
            ]).then(() => {
                this.changed("wallpaper")
            })
        })
    }

    async #setWallpaper(path: string) {
        this.#blockMonitor = true

        await sh(`cp ${path} ${WP}`)
        this.#wallpaper()

        this.#blockMonitor = false
    }
    
    async #fetchRandom() {
        const file = await sh([
            "sh", "-c",
            "ls ~/Pictures/wallpapers/*.png | sort -R | tail -1"
        ]);
        
        this.#setWallpaper(file)
    }

    readonly random = () => { this.#fetchRandom() }
    readonly set = (path: string) => { this.#setWallpaper(path) }
    get wallpaper() { return WP }

    constructor() {
        super()

        if (!dependencies("swww"))
            return this

        // gtk portal
        Utils.monitorFile(WP, () => {
            if (!this.#blockMonitor)
                this.#wallpaper()
        })

        Utils.execAsync("swww-daemon")
            .then(this.#wallpaper)
            .catch(() => null)
    }
}

export default new Wallpaper

