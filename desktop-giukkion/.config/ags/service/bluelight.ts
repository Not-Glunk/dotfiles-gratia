import { sh } from "lib/utils";

class BlueLightService extends Service {
    static {
        Service.register(this, {}, {
            "blueLightStatus": ["string"],
        });
    }

    #blueLightStatus = false;

    constructor() {
        super();
        this.updateStatus().catch(error => console.error('Failed to update status on initialization:', error));
    }

    async updateStatus() {
        try {
            const result = await sh("hyprshade current");
            this.#blueLightStatus = result.trim() === "blue-light-filter";
            this.changed("blueLightStatus");
        } catch (error) {
            console.error('Failed to update blue light status:', error);
        }
    }

    isActive() {
        return this.#blueLightStatus;
    }

    toggleBlueLight() {
        sh(["hyprshade", "toggle", "blue-light-filter"])
            .then(() => this.updateStatus().catch(error => console.error('Failed to update status after toggle:', error)))
            .catch(error => console.error('Failed to toggle blue light filter:', error));
    }
}

export const BlueLightServiceInstance = new BlueLightService();

