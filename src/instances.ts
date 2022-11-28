import { Logger } from "./services";
import { AppServices } from "./types";

const services: AppServices = {
    logger: new Logger()
}

export default services;