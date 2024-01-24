#[cfg(all(not(target_os = "windows"), not(target_os = "macos")))]
fn main() {
    // Linux and derivatives (e.g. Android) don't need anything special
}

#[cfg(target_os = "macos")]
fn main() {
    node_bindgen::build::configure();
}

#[cfg(target_os = "windows")]
fn main() {
    // All of this was copied from nj-build/src/lib.rs because calling
    // node_bindgen::build::configure() seems to have no effect on Windows.
    use http_req::request;
    use std::env::temp_dir;
    use std::fs::{remove_file, File};
    use std::process::Command;

    let node_full_version =
        String::from_utf8(Command::new("node").arg("-v").output().unwrap().stdout)
            .unwrap()
            .trim_end()
            .to_string();

    let tmp_dir = temp_dir();
    let temp_lib = tmp_dir
        .clone()
        .join(format!("node-{}.lib", node_full_version.trim_end()));

    if !temp_lib.exists() {
        let lib_file_download_url = format!(
            "https://nodejs.org/dist/{}/win-x64/node.lib",
            node_full_version
        );

        println!(
            "downloading nodejs: {} to: {:#?}",
            lib_file_download_url, temp_lib
        );

        let mut node_lib_file = File::create(&temp_lib).unwrap();
        if let Err(err) = request::get(&lib_file_download_url, &mut node_lib_file) {
            if temp_lib.exists() {
                if let Err(err) = remove_file(&temp_lib) {
                    eprintln!("Fail to remove {:#?} due error: {}", temp_lib, err);
                }
            }
            panic!("Download node.lib file failed with: {}", err);
        };
    }

    println!(
        "cargo:rustc-link-lib={}",
        &temp_lib.file_stem().unwrap().to_str().unwrap()
    );
    println!("cargo:rustc-link-search={}", tmp_dir.to_str().unwrap());

}
