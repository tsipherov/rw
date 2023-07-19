import { createAction } from "@reduxjs/toolkit";

export const authSessionId = createAction("@@auth/sessionId");
export const authUser = createAction("@@auth/user");
