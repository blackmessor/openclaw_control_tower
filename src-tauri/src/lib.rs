// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command/
use std::process::Command;
use serde_json::Value;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowMenuEvent};

#[tauri::command]
fn openclaw_status() -&gt; Result&lt;String, String&gt; {
    let output = Command::new(&quot;openclaw&quot;)
        .arg(&quot;status&quot;)
        .arg(&quot;--json&quot;)
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&amp;output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&amp;output.stderr).to_string())
    }
}

#[tauri::command]
fn agents_list() -&gt; Result&lt;String, String&gt; {
    let output = Command::new(&quot;openclaw&quot;)
        .args([&quot;agents&quot;, &quot;list&quot;, &quot;--json&quot;])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&amp;output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&amp;output.stderr).to_string())
    }
}

#[tauri::command]
fn sessions_list() -&gt; Result&lt;String, String&gt; {
    let output = Command::new(&quot;openclaw&quot;)
        .args([&quot;sessions&quot;, &quot;--json&quot;])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&amp;output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&amp;output.stderr).to_string())
    }
}

#[tauri::command]
fn greet(name: &amp;str) -&gt; String {
    format!(&quot;Hello, {}! You&apos;ve been greeted from Rust!&quot;, name)
}

use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowMenuEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let quit = CustomMenuItem::new(&quot;quit&quot;, &quot;Quit&quot;);
    let open = CustomMenuItem::new(&quot;open&quot;, &quot;Open&quot;);
    let tray_menu = SystemTrayMenu::new()
        .add_item(open)
        .add_native_item(tauri::MenuItem::Separator)
        .add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                let window = app.get_webview_window(&quot;main&quot;).unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                &quot;open&quot; => {
                    let window = app.get_webview_window(&quot;main&quot;).unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                &quot;quit&quot; => app.exit(0),
                _ => {}
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet, openclaw_status, agents_list, sessions_list])
        .run(tauri::generate_context!())
        .expect(&quot;error while running tauri application&quot;);
}