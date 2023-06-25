type AvailableServices = "logger";

export class Services {
    private static instance: Services | null = null;
    private readonly services: Map<string, any> = new Map();
    private constructor() {}
    static getInstance() {
        if (Services.instance === null) {
            Services.instance = new Services();
        }
        return Services.instance;
    }
    add<T>(name: AvailableServices, instance: T) {
        this.services.set(name, instance);
    }
    get<T>(name: AvailableServices): T {
        const instance = this.services.get(name);
        if (!instance) {
            throw new Error(`Service ${name} not registered!`);
        }
        return instance as T;
    }
}

export default Services.getInstance();