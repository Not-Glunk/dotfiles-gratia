#!/bin/bash

# THIS IS NOT TO BE CONSIDERED AN INSTALL SCRIPT
# more like outdated guidelines for a mostly already set-up fedora environment

# (fedora) enable hyprland copr
dnf copr enable solopasha/hyprland
# install packages
dnf install hyprland hypridle hyprlock ags swww wofi dmenu cliphist slurp grimblast swappy zsh-syntax-highlighting \
            fd-find scdoc cargo rustup \
            qt5ct qt6ct
cargo install matugen
pip install --user hyprshade
npm install -g bun sass
# add missing to /urs/bin path (or symlink, or add to PATH)
bunBinPath=$(which bun); cp $bunBinPath /usr/bin/bun
cp ~/.local/bin/hyprshade /usr/bin/hyprshade
cp ~/.cargo/bin/matugen /usr/bin/mategun
sassBinPath=$(which sass); cp $sassBinPath /usr/bin/sass

# hypr config (or choose laptop-thonkpad)
cp -r ./desktop-giukkion/.config/hypr/* ~/.config/hypr/
# ags config (or choose laptop-thonkpad)
cp -r ./destkop-giukkion/.config/ags/* ~/.config/ags/ 
# cava config (or choose laptop-thonkpad)
cp -r ./desktop-giukkion/.config/cava/* ~/.config/cava/

# zsh config (do NOT just run these)
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
cp ./desktop-giukkion/.config/zsh/.zshrc ~/.zshrc
cp ./desktop-giukkion/.config/zsh/.p10k.zsh ~/.p10k.zsh

# wayshot compile
mkdir ~/git/wayshot
git clone "https://github.com/waycrate/wayshot" ~/git/wayshot/wayshot
    cd ~/git/wayshot/wayshot
    make
    make setup
    sudo make install # already in /usr/bin

# swww latest release build
mkdir ~/git/swww/swww-0.9.5
curl -O '~/git/swww/swww-0.9.5/swww-0.9.5.zip' 'https://github.com/LGFae/swww/archive/refs/tags/v0.9.5.zip'
    cd ~/git/swww/swww-0.9.5/
    unzip 'swww-0.9.5.zip'
    cd swww-0.9.5
    cargo build --release
    ./doc/gen.sh
    mv target/release/swww /usr/bin/swww
    mv target/release/swww-daemon /usr/bin/swww-daemon

# copy wallpapers
cp -r ./resources/wallpapers/* ~/Pictures/wallpapers/
