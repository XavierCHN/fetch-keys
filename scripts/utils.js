const packageJson = require("../package.json");
const fs = require("fs-extra");
const { getGamePath } = require("steam-game-path");

module.exports.getAddonName = () => {
    if (!/^[a-z]([\d_a-z]+)?$/.test(packageJson.name)) {
        throw new Error("Addon name may consist only of lowercase characters, digits, and underscores " + "and should start with a letter. Edit `name` field in `package.json` file.");
    }

    return packageJson.name;
};

module.exports.getDotaPath = async () => {
    const path = getGamePath(570);
    return path.game.path;
};

read_all_files = (path) => {
    var pa = fs.readdirSync(path);
    var files = [];
    pa.forEach((ele, index) => {
        let child = path + "/" + ele;
        let info = fs.statSync(child);
        if (info.isDirectory()) {
            let subs = read_all_files(child);
            subs.forEach((s) => files.push(s));
        } else {
            files.push(child);
        }
    });
    return files;
};
module.exports.read_all_files = read_all_files;

read_sub_directories = (path) => {
    var pa = fs.readdirSync(path);
    var directories = [];
    pa.forEach((ele, index) => {
        let child = path + "/" + ele;
        let info = fs.statSync(child);
        if (info.isDirectory()) {
            directories.push(child);
        }
    });
    return directories;
};
module.exports.read_sub_directories = read_sub_directories;
