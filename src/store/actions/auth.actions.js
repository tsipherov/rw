import { createAction } from "@reduxjs/toolkit";

export const authSessionId = createAction("@@auth/sessionId");
export const authUser = createAction("@@auth/user");

// @@auth/fetch(update, delete)_user_request
// @@auth/fetch(update, delete)_user_success
// @@auth/fetch(update, delete)_user_failure
