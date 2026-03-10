import { GoogleGenAI } from "@google/genai";
import { SecurityAlert } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeAlert(alert: SecurityAlert) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Analyze this security alert and provide remediation steps:
    
    Type: ${alert.type}
    Severity: ${alert.severity}
    Source: ${alert.source}
    Description: ${alert.description}
    Timestamp: ${alert.timestamp}
    
    Provide a concise analysis in markdown format including:
    1. Risk Assessment
    2. Immediate Actions
    3. Long-term Prevention`,
  });

  return response.text;
}

export async function getSecuritySummary(alerts: SecurityAlert[]) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize these security alerts and provide a high-level security posture assessment:
    
    ${JSON.stringify(alerts.slice(0, 10))}
    
    Provide a brief summary for a CISO dashboard.`,
  });

  return response.text;
}
