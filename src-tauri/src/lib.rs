// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command/
use std::process::Command;
use tauri::{App, Window};

#[tauri::command]
fn openclaw_status() -> Result<String, String> {
    let output = Command::new("openclaw")
        .arg("status")
        .arg("--json")
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn agents_list() -> Result<String, String> {
    let output = Command::new("openclaw")
        .args(["agents", "list", "--json"])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn sessions_list() -> Result<String, String> {
    let output = Command::new("openclaw")
        .args(["sessions", "--json"])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, openclaw_status, agents_list, sessions_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}