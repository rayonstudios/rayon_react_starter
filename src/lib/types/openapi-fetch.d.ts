export interface paths {
    "/users/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserFetch"];
        put?: never;
        post?: never;
        delete: operations["UserRemove"];
        options?: never;
        head?: never;
        patch: operations["UserUpdate"];
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserFetchList"];
        put?: never;
        post: operations["UserCreate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProfileFetch"];
        put?: never;
        post?: never;
        delete: operations["ProfileDelete"];
        options?: never;
        head?: never;
        patch: operations["ProfileUpdate"];
        trace?: never;
    };
    "/posts/{postId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostFetch"];
        put?: never;
        post?: never;
        delete: operations["PostRemove"];
        options?: never;
        head?: never;
        patch: operations["PostUpdate"];
        trace?: never;
    };
    "/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostFetchList"];
        put?: never;
        post: operations["PostCreate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/webhooks/handle-trigger": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["NotificationHandleTrigger"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/general": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["NotificationSendGeneral"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["NotificationFetchList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/mark-read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["NotificationMarkRead"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["MiscGetStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/openapi.json": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["MiscGetOpenApiSpec"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reload-secrets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["MiscReloadSecrets"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["FileSave"];
        delete: operations["FileRemove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files/webhooks/handle-img-resize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["FileHandleImageResize"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthLogin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthSignup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthVerifyEmail"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signout-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthSignout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/forgot-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthForgotPassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthResetPassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/change-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthChangePassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/resend-verification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthResendVerification"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthRefresh"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description From https://github.com/sindresorhus/type-fest/
         *     Matches any valid JSON value. */
        JsonValue: (string | number | boolean | components["schemas"]["JsonObject"] | components["schemas"]["JsonArray"]) | null;
        /** @description From https://github.com/sindresorhus/type-fest/
         *     Matches a JSON object.
         *     This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. */
        JsonObject: {
            [key: string]: components["schemas"]["JsonValue"];
        };
        /** @description From https://github.com/sindresorhus/type-fest/
         *     Matches a JSON array. */
        JsonArray: Record<string, never>;
        /** @description From T, pick a set of properties whose keys are in the union K */
        "Pick_User.Exclude_keyofUser.password_hash-or-refresh_token_version__": {
            name: string;
            created_at?: string | (Date | undefined);
            updated_at?: string | (Date | undefined);
            id?: string;
            role?: string;
            email_verified?: boolean;
            email: string;
            photo?: string;
            fcm_tokens?: string[];
            bio?: string;
            /** Format: double */
            unread_noti_count?: number;
            photo_sizes?: components["schemas"]["JsonValue"];
        };
        /** @description Construct a type with the properties of T except for those in type K. */
        "Omit_User.password_hash-or-refresh_token_version_": components["schemas"]["Pick_User.Exclude_keyofUser.password_hash-or-refresh_token_version__"];
        SanitizedUser: components["schemas"]["Omit_User.password_hash-or-refresh_token_version_"];
        APIResponse_SanitizedUser_: {
            data: components["schemas"]["SanitizedUser"] | null;
            error: string | null;
        };
        PaginationSortResponse_SanitizedUser_: {
            /** Format: double */
            total?: number;
            list: components["schemas"]["SanitizedUser"][];
        };
        APIResponse_PaginationSortResponse_SanitizedUser__: {
            data: components["schemas"]["PaginationSortResponse_SanitizedUser_"] | null;
            error: string | null;
        };
        /** @enum {string} */
        Role: "user" | "admin" | "super-admin";
        /** @enum {string} */
        "SortFields_SanitizedUser.created_at-or-updated_at-or-name_": "created_at" | "updated_at" | "name";
        UserSortFields: components["schemas"]["SortFields_SanitizedUser.created_at-or-updated_at-or-name_"];
        /** @enum {string} */
        SortOrder: "asc" | "desc";
        UserFetchList: {
            sortOrder?: components["schemas"]["SortOrder"];
            sortField?: components["schemas"]["UserSortFields"];
            /** Format: double */
            limit?: number;
            /** Format: double */
            page?: number;
            search?: string;
            role?: components["schemas"]["Role"];
        };
        "Expand_Optional_UserMutable.bio-or-photo__": {
            photo?: string;
            bio?: string;
            name: string;
            role: string;
            email: string;
        };
        UserCreate: components["schemas"]["Expand_Optional_UserMutable.bio-or-photo__"];
        /** @description Make all properties in T optional */
        "Partial_Omit_UserMutable.email__": {
            name?: string;
            role?: string;
            photo?: string;
            bio?: string;
        };
        UserUpdate: components["schemas"]["Partial_Omit_UserMutable.email__"];
        "Expand_PostUnlinked-and-_author-SanitizedUser__": {
            created_at?: string | (Date | undefined);
            updated_at?: string | (Date | undefined);
            id?: string;
            title: string;
            slug: string;
            text: string;
            author_id: string;
            /** Format: double */
            views?: number;
            labels: string[];
            author: components["schemas"]["SanitizedUser"];
        };
        PostType: components["schemas"]["Expand_PostUnlinked-and-_author-SanitizedUser__"];
        APIResponse_PostType_: {
            data: components["schemas"]["PostType"] | null;
            error: string | null;
        };
        PaginationSortResponse_PostType_: {
            /** Format: double */
            total?: number;
            list: components["schemas"]["PostType"][];
        };
        APIResponse_PaginationSortResponse_PostType__: {
            data: components["schemas"]["PaginationSortResponse_PostType_"] | null;
            error: string | null;
        };
        /** @enum {string} */
        "SortFields_Post.created_at-or-updated_at-or-title-or-views_": "created_at" | "updated_at" | "title" | "views";
        PostSortFields: components["schemas"]["SortFields_Post.created_at-or-updated_at-or-title-or-views_"];
        PostFetchList: {
            sortOrder?: components["schemas"]["SortOrder"];
            sortField?: components["schemas"]["PostSortFields"];
            /** Format: double */
            limit?: number;
            /** Format: double */
            page?: number;
            search?: string;
            author_id?: string;
            labels?: string[];
            populate?: boolean;
        };
        "Expand_Omit_PostMutable.author_id__": {
            title: string;
            labels: string[];
            text: string;
        };
        PostCreate: components["schemas"]["Expand_Omit_PostMutable.author_id__"];
        Expand_Partial_PostMutable__: {
            title?: string;
            labels?: string[];
            text?: string;
            author_id?: string;
        };
        PostUpdate: components["schemas"]["Expand_Partial_PostMutable__"];
        Message: {
            message: string;
        };
        APIResponse_Message_: {
            data: components["schemas"]["Message"] | null;
            error: string | null;
        };
        /** @enum {string} */
        "NotificationEvent.GENERAL": "general";
        /** @description Type of `Prisma.DbNull`.
         *
         *     You cannot use other instances of this class. Please use the `Prisma.DbNull` value. */
        "Prisma.NullTypes.DbNull": Record<string, never>;
        /** @description Type of `Prisma.JsonNull`.
         *
         *     You cannot use other instances of this class. Please use the `Prisma.JsonNull` value. */
        "Prisma.NullTypes.JsonNull": Record<string, never>;
        "Prisma.NullableJsonNullValueInput": components["schemas"]["Prisma.NullTypes.DbNull"] | components["schemas"]["Prisma.NullTypes.JsonNull"];
        /** @description Matches any valid value that can be used as an input for operations like
         *     create and update as the value of a JSON field. Unlike \`JsonValue\`, this
         *     type allows read-only arrays and read-only object properties and disallows
         *     \`null\` at the top level.
         *
         *     \`null\` cannot be used as the value of a JSON field because its meaning
         *     would be ambiguous. Use \`Prisma.JsonNull\` to store the JSON null value or
         *     \`Prisma.DbNull\` to clear the JSON value and set the field to the database
         *     NULL value instead. */
        InputJsonValue: string | number | boolean | components["schemas"]["InputJsonObject"] | components["schemas"]["InputJsonArray"] | Record<string, never>;
        /** @description Matches a JSON object.
         *     Unlike \`JsonObject\`, this type allows undefined and read-only properties. */
        InputJsonObject: {
            [key: string]: components["schemas"]["InputJsonValue"];
        };
        /** @description Matches a JSON array.
         *     Unlike \`JsonArray\`, readonly arrays are assignable to this type. */
        InputJsonArray: Record<string, never>;
        /** @description Construct a type with a set of properties K of type T */
        "Record_string.any_": {
            [key: string]: unknown;
        };
        GenericObject: components["schemas"]["Record_string.any_"];
        "Expand_Omit_NotificationMutable.event_-and-_roles_63_-Role-Array--userIds_63_-string-Array--metadata_63_-GenericObject__": {
            title: string;
            body: string;
            image?: string;
            link?: string;
            metadata?: ((components["schemas"]["Prisma.NullableJsonNullValueInput"] | components["schemas"]["InputJsonValue"]) & components["schemas"]["GenericObject"]) & components["schemas"]["GenericObject"];
            roles?: components["schemas"]["Role"][];
            userIds?: string[];
        };
        NotificationSendGeneral: components["schemas"]["Expand_Omit_NotificationMutable.event_-and-_roles_63_-Role-Array--userIds_63_-string-Array--metadata_63_-GenericObject__"];
        /** @enum {string} */
        "NotificationEvent.SIGN_UP": "sign-up";
        /** @enum {string} */
        "NotificationEvent.NEW_POST": "new-post";
        NotificationPayload: {
            /** Format: double */
            timestamp?: number;
        } & ({
            data: components["schemas"]["NotificationSendGeneral"];
            event: components["schemas"]["NotificationEvent.GENERAL"];
        } | {
            data: {
                email: string;
                name: string;
            };
            event: components["schemas"]["NotificationEvent.SIGN_UP"];
        } | {
            data: {
                title: string;
                author: string;
            };
            event: components["schemas"]["NotificationEvent.NEW_POST"];
        });
        "Expand_Prisma.notificationsCreateManyInput-and-_metadata_63_-GenericObject__": {
            id?: string;
            created_at?: string | (Date | undefined);
            updated_at?: string | (Date | undefined);
            title: string;
            body: string;
            image?: string;
            link?: string;
            metadata?: (components["schemas"]["Prisma.NullableJsonNullValueInput"] | components["schemas"]["InputJsonValue"]) & components["schemas"]["GenericObject"];
            event: string;
        };
        Notification: components["schemas"]["Expand_Prisma.notificationsCreateManyInput-and-_metadata_63_-GenericObject__"];
        PaginationSortResponse_Notification_: {
            /** Format: double */
            total?: number;
            list: components["schemas"]["Notification"][];
        };
        APIResponse_PaginationSortResponse_Notification__: {
            data: components["schemas"]["PaginationSortResponse_Notification_"] | null;
            error: string | null;
        };
        /** @enum {string} */
        "SortFields_Notification.created_at_": "created_at";
        NotificationSortFields: components["schemas"]["SortFields_Notification.created_at_"];
        NotificationFetchList: {
            sortOrder?: components["schemas"]["SortOrder"];
            sortField?: components["schemas"]["NotificationSortFields"];
            /** Format: double */
            limit?: number;
            /** Format: double */
            page?: number;
        };
        /** @description Construct a type with a set of properties K of type T */
        "Record_string.string_": {
            [key: string]: string;
        };
        FileWithImgVariants: {
            img_sizes?: components["schemas"]["Record_string.string_"];
            url: string;
        };
        APIResponse_FileWithImgVariants_: {
            data: components["schemas"]["FileWithImgVariants"] | null;
            error: string | null;
        };
        FileDelete: {
            url: string;
        };
        /** @enum {string} */
        "Prisma.ModelName": "otps" | "posts" | "users" | "notifications" | "userNotifications";
        /** @enum {string} */
        IMAGE_SIZE: "small" | "medium" | "large";
        Resizeconfig: {
            sizes: components["schemas"]["IMAGE_SIZE"][];
            img_field: string;
            record_id: string;
            model: components["schemas"]["Prisma.ModelName"];
        };
        FileWebhookHandleResize: {
            resize_config: components["schemas"]["Resizeconfig"];
            url: string;
        };
        AuthLoginResponse: {
            refreshToken: string;
            accessToken: string;
            user: components["schemas"]["SanitizedUser"];
        };
        APIResponse_AuthLoginResponse_: {
            data: components["schemas"]["AuthLoginResponse"] | null;
            error: string | null;
        };
        AuthLogin: {
            password: string;
            email: string;
        };
        AuthVerifyEmail: {
            email: string;
            otp: string;
        };
        AuthForgotPass: {
            hcaptcha_token?: string;
            email: string;
        };
        AuthResetPass: {
            password: string;
            otp: string;
            email: string;
        };
        AuthChangePass: {
            newPassword: string;
            oldPassword: string;
        };
        /** @description From T, pick a set of properties whose keys are in the union K */
        "Pick_AuthLoginResponse.Exclude_keyofAuthLoginResponse.user__": {
            accessToken: string;
            refreshToken: string;
        };
        /** @description Construct a type with the properties of T except for those in type K. */
        "Omit_AuthLoginResponse.user_": components["schemas"]["Pick_AuthLoginResponse.Exclude_keyofAuthLoginResponse.user__"];
        "APIResponse_Omit_AuthLoginResponse.user__": {
            data: components["schemas"]["Omit_AuthLoginResponse.user_"] | null;
            error: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    UserFetch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    UserRemove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    UserUpdate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserUpdate"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    UserFetchList: {
        parameters: {
            query?: {
                sortOrder?: components["schemas"]["SortOrder"];
                sortField?: components["schemas"]["UserSortFields"];
                limit?: number;
                page?: number;
                search?: string;
                role?: components["schemas"]["Role"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PaginationSortResponse_SanitizedUser__"];
                };
            };
        };
    };
    UserCreate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserCreate"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    ProfileFetch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    ProfileDelete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    ProfileUpdate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": {
                    name?: string;
                    bio?: string;
                    added_fcm_token?: string;
                    removed_fcm_token?: string;
                    /** Format: binary */
                    photo?: File;
                };
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    PostFetch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                postId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PostType_"];
                };
            };
        };
    };
    PostRemove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                postId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PostType_"];
                };
            };
        };
    };
    PostUpdate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                postId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostUpdate"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PostType_"];
                };
            };
        };
    };
    PostFetchList: {
        parameters: {
            query?: {
                sortOrder?: components["schemas"]["SortOrder"];
                sortField?: components["schemas"]["PostSortFields"];
                limit?: number;
                page?: number;
                search?: string;
                author_id?: string;
                labels?: string[];
                populate?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PaginationSortResponse_PostType__"];
                };
            };
        };
    };
    PostCreate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCreate"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PostType_"];
                };
            };
        };
    };
    NotificationHandleTrigger: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NotificationPayload"] & {
                    taskMetadata: components["schemas"]["GenericObject"];
                };
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    NotificationSendGeneral: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NotificationSendGeneral"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    NotificationFetchList: {
        parameters: {
            query?: {
                sortOrder?: components["schemas"]["SortOrder"];
                sortField?: components["schemas"]["NotificationSortFields"];
                limit?: number;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_PaginationSortResponse_Notification__"];
                };
            };
        };
    };
    NotificationMarkRead: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    MiscGetStatus: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    MiscGetOpenApiSpec: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericObject"];
                };
            };
        };
    };
    MiscReloadSecrets: {
        parameters: {
            query: {
                api_key: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    FileSave: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** Format: binary */
                    file?: File;
                    img_sizes?: string;
                };
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_FileWithImgVariants_"];
                };
            };
        };
    };
    FileRemove: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FileDelete"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    FileHandleImageResize: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FileWebhookHandleResize"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthLogin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthLogin"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_AuthLoginResponse_"];
                };
            };
        };
    };
    AuthSignup: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    name: string;
                    email: string;
                    password: string;
                    bio?: string;
                    hcaptcha_token?: string;
                    /** Format: binary */
                    photo?: File;
                };
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_SanitizedUser_"];
                };
            };
        };
    };
    AuthVerifyEmail: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthVerifyEmail"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_AuthLoginResponse_"];
                };
            };
        };
    };
    AuthSignout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthForgotPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthForgotPass"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthResetPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthResetPass"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthChangePassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthChangePass"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthResendVerification: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthForgotPass"];
            };
        };
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Message_"];
                };
            };
        };
    };
    AuthRefresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ok */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["APIResponse_Omit_AuthLoginResponse.user__"];
                };
            };
        };
    };
}
