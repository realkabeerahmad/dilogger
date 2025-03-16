import fs from "fs";
import path from "path";

class LOGGER {
    static LEVEL = {
        INFO: "INFO",
        DEBUG: "DEBUG",
        WARNING: "WARN",
        ERROR: "ERROR",
    } as const;

    private FILE_NAME: string;
    private LOG_MOD: keyof typeof LOGGER.LEVEL;
    private FILE_PATH: string;
    private BACKUP_FILE_PATH: string;
    private TIMEZONE: string;
    private OUTPUT: fs.WriteStream;
    private CONSOLER: Console;

    constructor({
        FILE_NAME = "index.log",
        LOG_MOD = "DEBUG",
        FILE_PATH = "./logs/",
        BACKUP_FILE_PATH = "./logs/backup/",
        TIMEZONE = "UTC",
    }: {
        FILE_NAME?: string;
        LOG_MOD?: keyof typeof LOGGER.LEVEL;
        FILE_PATH?: string;
        BACKUP_FILE_PATH?: string;
        TIMEZONE?: string;
    } = {}) {
        this.FILE_NAME = FILE_NAME;
        this.LOG_MOD = LOG_MOD;
        this.FILE_PATH = path.join(FILE_PATH, FILE_NAME);
        this.BACKUP_FILE_PATH = path.join(BACKUP_FILE_PATH, FILE_NAME);
        this.TIMEZONE = TIMEZONE;

        this.ensureDirectoryExistence(this.FILE_PATH);
        this.ensureDirectoryExistence(this.BACKUP_FILE_PATH);

        this.OUTPUT = fs.createWriteStream(this.FILE_PATH, { flags: this.LOG_MOD === LOGGER.LEVEL.INFO ? "w" : "a" });
        this.CONSOLER = new console.Console(this.OUTPUT, this.OUTPUT);
    }

    private ensureDirectoryExistence(filePath: string): void {
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }
    }

    private logMessage(level: keyof typeof LOGGER.LEVEL, message: string): void {
        const stack = this.getStackTrace();
        const timestamp = new Date().toLocaleString("en-US", { timeZone: this.TIMEZONE });

        this.CONSOLER.log(`[${timestamp}] - (${stack}) - [${level}] - ${message}`);
    }

    private getStackTrace(): string {
        const err = new Error();
        const stack = err.stack?.split("\n") || [];
        return stack[4]?.trim().split(" ")[1] === "Object.<anonymous>" ? "main" : stack[4]?.trim().split(" ")[1] || "unknown";
    }

    public info(message: string): void {
        this.logMessage("INFO", message);
    }

    public error(message: string): void {
        this.logMessage("ERROR", message);
    }

    public warning(message: string): void {
        this.logMessage("WARNING", message);
    }

    public debug(message: string): void {
        if (this.LOG_MOD === "DEBUG") {
            this.logMessage("DEBUG", message);
        }
    }
}

export const createLogger = (options?: {
    FILE_NAME?: string;
    LOG_MOD?: keyof typeof LOGGER.LEVEL;
    FILE_PATH?: string;
    BACKUP_FILE_PATH?: string;
    TIMEZONE?: string;
}): LOGGER => new LOGGER(options);

export default LOGGER;
