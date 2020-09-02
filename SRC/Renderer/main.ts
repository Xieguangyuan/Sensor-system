import '../Common/MainPageUI.css'
import '../Common/BarmenuUI.css'
import '../Common/ScreenAutoFix.css'
import 'font-awesome/css/font-awesome.css'
import { MainPageUI } from './MainUI'
window.onload = function () {
    let link = document.createElement('link');
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';
    link.integrity = 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==';
    link.crossOrigin = '';
    document.getElementsByTagName('head')[0].appendChild(link);
    // document.head.innerHTML =
    //     "<meta charset='UTF-8'>" +
    //     "<meta name='viewport' content='width=device-width,initial-scale=1.0' />" +
    //     "<title>Accss - Electron Autopilot controller</title>" +
    //     "<script> var exports = {}; </script>" +
    //     "<link rel='stylesheet' href='https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'" +
    //     "integrity='sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=='" +
    //     "crossorigin='' />";
    document.body.innerHTML = "<div id='title'></div><div id='root'></div>"
    MainPageUI.MainPageSet();
}