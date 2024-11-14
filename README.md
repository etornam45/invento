# Project Setup Guide

This guide provides instructions for setting up `JAVA_HOME` and `ANDROID_HOME` environment variables, necessary for Android development.

## 1. Prerequisites

Ensure you have the following installed:
- **Java Development Kit (JDK)** - Version 17.
- **Android SDK** - Installed via Android Studio or as a standalone SDK.

## 2. Setting Up `JAVA_HOME`

1. **Locate the JDK Path**:
   - For example, on Windows, it might be in: `C:\Program Files\Java\jdk-11`. you need to install it if you dont have it [Java SE Development Kit 17.0.12](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
   - On macOS or Linux, it could be something like `/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home`.

2. **Set `JAVA_HOME`**:
   - **Windows**:
     - Open **System Properties** (Win + Pause) → **Advanced System Settings** → **Environment Variables**.
     - Click **New** under **System variables**.
     - Set **Variable name** to `JAVA_HOME`.
     - Set **Variable value** to the JDK path (e.g., `C:\Program Files\Java\jdk-11`).
     - Click **OK** to save.

   - **macOS / Linux**:
     - Open your terminal.
     - Edit your shell profile file (e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`).
     - Add the following line:
       ```sh
       export JAVA_HOME=/path/to/your/jdk
       ```
     - Replace `/path/to/your/jdk` with your actual JDK path.
     - Save the file and run `source ~/.bashrc` or `source ~/.zshrc` to apply the changes.

3. **Verify `JAVA_HOME`**:
   - Run `echo %JAVA_HOME%` on Windows or `echo $JAVA_HOME` on macOS/Linux.
   - The output should display the path to your JDK.

## 3. Setting Up `ANDROID_HOME`

1. **Locate the Android SDK Path**:
   - Typically, on Windows, it’s under: `C:\Users\YourUsername\AppData\Local\Android\Sdk`.
   - On macOS, it’s commonly found at: `~/Library/Android/sdk`.
   - On Linux, it’s often at: `~/Android/Sdk`.

2. **Set `ANDROID_HOME`**:
   - **Windows**:
     - Open **System Properties** → **Environment Variables**.
     - Click **New** under **System variables**.
     - Set **Variable name** to `ANDROID_HOME`.
     - Set **Variable value** to your SDK path (e.g., `C:\Users\YourUsername\AppData\Local\Android\Sdk`).
     - Click **OK** to save.

   - **macOS / Linux**:
     - Open your terminal.
     - Edit your shell profile file (e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`).
     - Add the following line:
       ```sh
       export ANDROID_HOME=/path/to/your/sdk
       ```
     - Replace `/path/to/your/sdk` with your actual SDK path.
     - Save the file and run `source ~/.bashrc` or `source ~/.zshrc` to apply the changes.

3. **Add SDK Tools to `PATH`**:
   - After setting `ANDROID_HOME`, add the following to your `PATH` environment variable for easy access to SDK tools:
     - **Windows**:
       - Add `%ANDROID_HOME%\tools` and `%ANDROID_HOME%\platform-tools` to the `PATH` variable.
     - **macOS / Linux**:
       - Add the following lines to your shell profile file:
         ```sh
         export PATH=$PATH:$ANDROID_HOME/tools
         export PATH=$PATH:$ANDROID_HOME/platform-tools
         ```

4. **Verify `ANDROID_HOME`**:
   - Run `echo %ANDROID_HOME%` on Windows or `echo $ANDROID_HOME` on macOS/Linux.
   - The output should display the path to your Android SDK.

## 4. Building the Project

Once `JAVA_HOME` and `ANDROID_HOME` are set, you can build the project. For example, to run an Expo project on Android:

```bash
npx expo run:android
```

# Specifies the JVM arguments used for the daemon process. `graddle.properties` 
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
# org.gradle.jvmargs=-XX:MaxPermSize=512m
org.gradle.jvmargs=-Xmx4g -Dfile.encoding=UTF-8