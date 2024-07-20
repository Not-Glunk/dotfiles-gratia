import { sh } from "lib/utils";

class Caffeine extends Service {
    static {
        Service.register(this, {}, {
            "caffeineStatus": ["string"],
        });
    }

    #caffeineStatus = false;
    #promiseQueue = Promise.resolve();

    constructor() {
        super();
        this.updateStatus().catch(error => console.error('Failed to update status on initialization:', error));
    }

    async updateStatus() {
        try {
            const result = await sh("pgrep -x hypridle");
            // If `hypridle` is not running, caffeine mode is active
            this.#caffeineStatus = result.trim() === "";
            this.changed("caffeineStatus");
        } catch (error) {
            console.error('Failed to update caffeine status:', error);
        }
    }

    isActive() {
        return this.#caffeineStatus;
    }

    toggleCaffeine() {
        this.#promiseQueue = this.#promiseQueue
            .then(() => {
                const command = this.#caffeineStatus ? "hyprctl dispatch exec hypridle" : "killall hypridle";
                return sh(command);
            })
            .then(() => this.updateStatus())
            .catch(error => console.error('Failed to toggle caffeine status:', error));
    }
}

export const CaffeineServiceInstance = new Caffeine();
