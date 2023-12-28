import { Fetched } from "../models/Fetched";
import React from "react";

export const userDefaults: Fetched<string | null> = {
    state: "not-started",
    data: null,
}

export const UserContext = React.createContext(userDefaults)
UserContext.displayName = "UserEmailContext";
