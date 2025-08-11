export interface Driver {
    driver_number?: number;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    team_name?: string;
    country_code?: string,
    headshot_url?: string;
}

export async function fetchDrivers(): Promise<Driver[]> {
    const response = await fetch(process.env.EXPO_PUBLIC_DRIVERS_URL!);
    const data: Driver[] = await response.json();
    const uniqueDriversMap = new Map<number, Driver>();

    if (!response.ok) {
        console.error('Error status code: ', response.status);
    }

    for (const driver of data) {
        if (
            driver.driver_number &&
            driver.headshot_url &&
            !uniqueDriversMap.has(driver.driver_number)
        ) {
            uniqueDriversMap.set(driver.driver_number, driver);
        }
    }

    const uniqueDrivers = Array.from(uniqueDriversMap.values());

    return uniqueDrivers;
};