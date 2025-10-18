# MCP Server Setup Guide for Untracked Files

## Overview
This project is now configured with two MCP (Model Context Protocol) servers to handle untracked MD files and general filesystem operations.

## Installed MCP Servers

### 1. Markdown Rules MCP Server
- **Purpose**: Specialized handling of Markdown documentation
- **Features**:
  - Smart dependency resolution for linked documents
  - Automatic context inclusion for related files
  - Line-range embeds for precise code references
  - Handles untracked MD files

### 2. Filesystem MCP Server
- **Purpose**: General filesystem operations
- **Features**:
  - Read/write/move/delete files
  - Search capabilities
  - Path validation and permission control
  - Access to all files including untracked ones

## Configuration
The MCP servers are configured in: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "markdown-rules": {
      "command": "npx",
      "args": ["-y", "@valstro/markdown-rules-mcp@latest"],
      "env": {
        "PROJECT_ROOT": "C:\\Users\\Admin\\.cursor\\HR AI website",
        "MARKDOWN_INCLUDE": "./HR-AI-Portal/**/*.md,./DocuGenius/**/*.md",
        "HOIST_CONTEXT": "true",
        "INCLUDE_UNTRACKED": "true"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "C:\\Users\\Admin\\.cursor\\HR AI website"
      }
    }
  }
}
```

## Current Status
✅ **38 Markdown files** have been successfully indexed, including:
- All HR-AI-Portal documentation (25+ MD files)
- DocuGenius documentation
- Project README files

## Untracked Files Detected
The following directories contain untracked MD files that are now accessible via MCP:
- `HR-AI-Portal/` - Contains deployment, development, and implementation guides
- `DocuGenius/` - Contains job descriptions and certification documentation

## How to Use

### In Cursor
1. **Restart Cursor** to activate the MCP servers
2. When chatting with the AI, it will now have access to:
   - All untracked MD files in the project
   - Full filesystem operations within the project directory
   - Smart context inclusion for related documentation

### Benefits for Your Workflow
- **No Manual Staging**: Untracked MD files are automatically accessible
- **Smart Context**: Related documents are automatically included when relevant
- **Full Control**: Can read, write, and manage all project files
- **Documentation-Aware**: The AI understands the structure and relationships in your documentation

## Troubleshooting

### If MCP servers don't work after restart:
1. Check that Node.js v18+ is installed: `node --version`
2. Verify the configuration file exists: `.cursor/mcp.json`
3. Test servers manually:
   ```bash
   npx @valstro/markdown-rules-mcp@latest --version
   npx @modelcontextprotocol/server-filesystem --help
   ```

### To update the server configuration:
1. Edit `.cursor/mcp.json`
2. Restart Cursor
3. The changes will take effect immediately

## Next Steps
- The MCP servers are now ready to use
- Your untracked MD files are accessible to the AI
- You can continue working without needing to manually track or stage documentation files
