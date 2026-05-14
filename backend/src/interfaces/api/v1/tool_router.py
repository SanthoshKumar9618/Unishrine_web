from fastapi import APIRouter, HTTPException
from typing import Dict, Any

router = APIRouter()

# In-memory tool registry (temporary until DB-backed)
TOOLS_REGISTRY: Dict[str, Dict[str, Any]] = {}


@router.get("/tools")
async def list_tools():
    """
    List all registered tools
    """
    return {
        "tools": list(TOOLS_REGISTRY.values())
    }


@router.post("/tools/register")
async def register_tool(tool: Dict[str, Any]):
    """
    Register a new tool
    """
    name = tool.get("name")

    if not name:
        raise HTTPException(status_code=400, detail="Tool name required")

    TOOLS_REGISTRY[name] = tool

    return {
        "status": "registered",
        "tool": tool
    }


@router.post("/tools/execute/{tool_name}")
async def execute_tool(tool_name: str, payload: Dict[str, Any]):
    """
    Execute a tool (placeholder implementation)
    """
    tool = TOOLS_REGISTRY.get(tool_name)

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    # Later this will call real business logic
    return {
        "tool": tool_name,
        "input": payload,
        "result": "execution placeholder"
    }


@router.get("/tools/health")
async def tools_health():
    return {
        "status": "ok",
        "service": "tools"
    }