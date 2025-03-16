Here’s a comprehensive `README.md` file for your `dilogger` package. It includes installation instructions, usage examples, API documentation, and other relevant details.

---

# Dilogger

A lightweight, customizable logging utility for Node.js applications. This package provides a simple and flexible way to log messages to a file with timestamps, caller information, and support for multiple log levels (`INFO`, `DEBUG`, `WARNING`, `ERROR`). It also supports custom time zones for log timestamps.

---

## Features

- **File Logging**: Log messages to a file with automatic directory creation.
- **Log Levels**: Supports `INFO`, `DEBUG`, `WARNING`, and `ERROR` log levels.
- **Custom Time Zones**: Specify a time zone for log timestamps.
- **Caller Information**: Automatically includes the caller function name in logs.
- **Flexible Configuration**: Customize log file names, paths, and backup paths.

---

## Installation

Install the package using npm:

```bash
npm install dilogger
```

---

## Usage

### Basic Example

```javascript
import { createLogger } from "dilogger";

// Create a logger instance
const logger = createLogger({
    FILE_NAME: "app.log",
    TIMEZONE: "America/New_York",
});

// Log messages
logger.info("This is an info message.");
logger.debug("This is a debug message.");
logger.warning("This is a warning message.");
logger.error("This is an error message.");
```

### Output in `app.log`

```plaintext
[10/15/2023, 3:45:12 PM] - (main) - [INFO] - This is an info message.
[10/15/2023, 3:45:12 PM] - (main) - [DEBUG] - This is a debug message.
[10/15/2023, 3:45:12 PM] - (main) - [WARNING] - This is a warning message.
[10/15/2023, 3:45:12 PM] - (main) - [ERROR] - This is an error message.
```

---

## API Documentation

### `createLogger(options)`

Creates a new logger instance.

#### Parameters

- `options` (Object, optional): Configuration options for the logger.
  - `FILE_NAME` (String, optional): Name of the log file. Default: `"index.log"`.
  - `LOG_MOD` (String, optional): Log level. Must be one of `"INFO"`, `"DEBUG"`, `"WARNING"`, or `"ERROR"`. Default: `"DEBUG"`.
  - `FILE_PATH` (String, optional): Directory for log files. Default: `"./logs/"`.
  - `BACKUP_FILE_PATH` (String, optional): Directory for backup log files. Default: `"./logs/backup/"`.
  - `TIMEZONE` (String, optional): Time zone for log timestamps. Default: `"UTC"`.

#### Returns

- A `LOGGER` instance.

---

### `LOGGER` Class

#### Methods

- **`info(message)`**
  - Logs an `INFO` level message.
  - Example: `logger.info("This is an info message.");`

- **`debug(message)`**
  - Logs a `DEBUG` level message (only if `LOG_MOD` is set to `"DEBUG"`).
  - Example: `logger.debug("This is a debug message.");`

- **`warning(message)`**
  - Logs a `WARNING` level message.
  - Example: `logger.warning("This is a warning message.");`

- **`error(message)`**
  - Logs an `ERROR` level message.
  - Example: `logger.error("This is an error message.");`

---

## Configuration

### Log Levels

The following log levels are supported:

- `INFO`: General information.
- `DEBUG`: Debugging information (only logged if `LOG_MOD` is set to `"DEBUG"`).
- `WARNING`: Warnings that may require attention.
- `ERROR`: Errors that need immediate attention.

### Time Zones

You can specify a custom time zone for log timestamps using IANA time zone identifiers (e.g., `"America/New_York"`, `"UTC"`). For a full list of valid time zones, refer to the [IANA Time Zone Database](https://www.iana.org/time-zones).

---

## Example

### Advanced Configuration

```javascript
import { createLogger } from "dilogger";

// Create a logger with custom settings
const logger = createLogger({
    FILE_NAME: "app.log",
    TIMEZONE: "Asia/Karachi",
    LOG_MOD: "INFO",
    FILE_PATH: "./custom-logs/",
    BACKUP_FILE_PATH: "./custom-logs/backup/",
});

// Log messages
logger.info("Application started.");
logger.debug("This debug message will not be logged because LOG_MOD is INFO.");
logger.warning("Low disk space.");
logger.error("Failed to connect to the database.");
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/realkabeerahmad/dilogger.git).

---

Enjoy logging with `dilogger`! 🚀