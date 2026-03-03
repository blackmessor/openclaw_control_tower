// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::menu::{PredefinedMenuItem, SystemTrayMenu};
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let show_item: tauri::menu::MenuItem<tauri::menu::TrayItemMetadata> = CustomMenuItem::new("show", "Show").into();
    let quit_item: tauri::menu::MenuItem<tauri::menu::TrayItemMetadata> = CustomMenuItem::new("quit", "Quit").into();
    let tray_menu = SystemTrayMenu::new()
        .add_item(show_item)
        .add_native_item(PredefinedMenuItem::Separator)
        .add_item(quit_item);

    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "show" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}