import * as winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
const logFolder1 = path.join(__dirname, "/AllLogs/");
const logFolder = logFolder1.replace(
  "src/logs/errors/",
  "volume/winstonLogs/"
);
// console.log(logFolder);
const Logger = () => {
  const transport = new winston.transports.DailyRotateFile({
    filename: "AllLogs-%DATE%.txt",
    datePattern: "YYYY-MM-DD-HH",
    maxSize: "20m",
    dirname: logFolder
  });
  transport.on("rotate", function (oldFilename, newFilename) {
    // do something fun
  });

  return winston.createLogger({
    transports: [transport]
  });
};
const logger = Logger();
export default logger;
