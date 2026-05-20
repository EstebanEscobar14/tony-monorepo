import nx from "@nx/eslint-plugin";

export default [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {
        ignores: [
            "**/dist",
            "**/out-tsc"
        ]
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        "^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"
                    ],
                    depConstraints: [
                        {
                            sourceTag: "scope:shell",
                            onlyDependOnLibsWithTags: [
                                "scope:shared",
                                "scope:domain-auth",
                                "scope:domain-payments",
                                "scope:domain-treasury",
                                "scope:domain-compliance",
                                "scope:domain-onboarding",
                                "scope:domain-admin",
                                "scope:domain-analytics"
                            ]
                        },
                        {
                            sourceTag: "scope:domain-auth",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-payments",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-treasury",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-compliance",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-onboarding",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-admin",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:domain-analytics",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "scope:shared",
                            onlyDependOnLibsWithTags: ["scope:shared"]
                        },
                        {
                            sourceTag: "type:app",
                            onlyDependOnLibsWithTags: [
                                "type:app",
                                "type:ui",
                                "type:util",
                                "type:data-access"
                            ]
                        },
                        {
                            sourceTag: "type:ui",
                            onlyDependOnLibsWithTags: ["type:ui", "type:util"]
                        },
                        {
                            sourceTag: "type:data-access",
                            onlyDependOnLibsWithTags: ["type:data-access", "type:util"]
                        },
                        {
                            sourceTag: "type:util",
                            onlyDependOnLibsWithTags: ["type:util"]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts",
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs"
        ],
        // Override or add rules here
        rules: {}
    }
];
