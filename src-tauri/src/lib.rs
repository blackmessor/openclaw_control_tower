// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command/
#[tauri::command]
fn openclaw_status() -> Result<String, String> {
    std::process::Command::new("openclaw")
        .arg("status")
        .output()
        .map_err(|e| e.to_string())
        .map(|output| String::from_utf8_lossy(&output.stdout).to_string())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, openclaw_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}