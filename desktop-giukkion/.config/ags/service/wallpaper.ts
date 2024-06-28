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

        sh([
            "swww", "img",
            "--transition-fps", "60",
            "--transition-step", "155",
            "--transition-duration", "3",
            "--transition-bezier", "0.69,0.0,0.15,0.99",
            "--transition-type", "wave",
            "--transition-wave", "25,40",
            WP,
        ]).then(() => {
            this.changed("wallpaper")
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

