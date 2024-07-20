import icons from "lib/icons"
import PanelButton from "../PanelButton"
import options from "options"
const { microphone } = await Service.import("audio")

const getIcon = () => microphone.is_muted || microphone.stream?.is_muted
    ? icons.audio.mic.muted
    : icons.audio.mic.high

export default () => {
    let iconWidget = Widget.Icon(getIcon())

    const button = PanelButton({
        window: "micmenu",
        on_clicked: () => {
            microphone.is_muted = !microphone.is_muted
            iconWidget.icon_name = getIcon()
        },
        child: iconWidget,
    })

    return button
}
