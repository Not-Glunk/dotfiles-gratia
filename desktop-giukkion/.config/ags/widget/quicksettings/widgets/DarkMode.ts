import { SimpleToggleButton } from "../ToggleButton"
import icons from "lib/icons"
import options from "options"
import { sh } from "lib/utils"
import GLib from "gi://GLib?version=2.0"

const { scheme } = options.theme

const setDarkMode = () => {
    sh("gsettings set org.gnome.desktop.interface gtk-theme Adwaita-dark");
    sh('gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"');
    // GLib.setenv("QT_STYLE_OVERRIDE", "Adwaita-dark", false);
    process.env.QT_STYLE_OVERRIDE="Adwaita-dark";
};

const setLightMode = () => {
    sh("gsettings set org.gnome.desktop.interface gtk-theme Adwaita");
    sh('gsettings set org.gnome.desktop.interface color-scheme "prefer-light"');
    process.env.QT_STYLE_OVERRIDE="Adwaita";
};

export const DarkModeToggle = () => SimpleToggleButton({
    icon: scheme.bind().as(s => icons.color[s]),
    label: scheme.bind().as(s => s === "dark" ? "Dark" : "Light"),
    toggle: () => {
        if (scheme.value === "dark") {
            scheme.value = "light";
            setLightMode();
        } else {
            scheme.value = "dark";
            setDarkMode();
        }
    },
    connection: [scheme, () => scheme.value === "dark"],
})
