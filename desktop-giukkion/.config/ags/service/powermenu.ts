import options from "options"

const { shutdown, reboot, lock, logout, sleep } = options.powermenu

export type Action = "shutdown" | "reboot" | "lock" | "logout" | "sleep"

class PowerMenu extends Service {
    static {
        Service.register(this, {}, {
            "title": ["string"],
            "cmd": ["string"],
        })
    }

    #title = ""
    #cmd = ""

    get title() { return this.#title }

    action(action: Action) {
        [this.#cmd, this.#title] = {
            shutdown: [shutdown.value, "Shutdown"],
            reboot: [reboot.value, "Reboot"],
            lock: [lock.value, "Lock"],
            logout: [logout.value, "Log Out"],
            sleep: [sleep.value, "Sleep"],
        }[action]

        this.notify("cmd")
        this.notify("title")
        this.emit("changed")
        App.closeWindow("powermenu")
        App.openWindow("verification")
    }

    readonly shutdown = () => {
        this.action("shutdown")
    }

    readonly exec = () => {
        App.closeWindow("verification")
        Utils.exec(this.#cmd)
    }
}

const powermenu = new PowerMenu
Object.assign(globalThis, { powermenu })
export default powermenu
