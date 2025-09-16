package com.timecomplexityAnalyzer.Gemini.Time.Complexity.Analyzer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import java.util.Map;

@Service
public class ServiceToGetComplexity {
    /*
     * Service class responsible for communicating with the Gemini model
     * to analyze time and space complexity of a given code snippet.
     */

    private final WebClient webClient;// Reactive HTTP client to make API calls

    // Constructor injection of WebClient, API URL, and API Key
    public ServiceToGetComplexity(WebClient webClient,
                                  @Value("${gemini.api.url}") String geminiApiUrl,
                                  @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClient;
        this.geminiApiUrl = geminiApiUrl;
        this.geminiApiKey = geminiApiKey;
    }

   private final String geminiApiUrl;

    private final String geminiApiKey;
    /**
     * Calls Gemini API with a code snippet and retrieves the time/space complexity.
     * @param codeSnippet object containing the user-provided code
     * @return Extracted response (complexity analysis as plain text)
     */
   public String getTimeComplexity(CodeSnippet codeSnippet){
       // 1. Build the natural language prompt from code snippet
       String prompt = buildPrompt(codeSnippet);
       // 2. Create request body in the expected Gemini API format
       Map<String, Object> requestBody = Map.of(
              "contents",new Object[]{
                Map.of("parts",new Object[]{
                        Map.of("text",prompt)
                })
               }
       );
       // 3. Send POST request to Gemini API
       String response = webClient.post().uri(geminiApiUrl+geminiApiKey).header("Content-Type","application/json").bodyValue(requestBody).retrieve().bodyToMono(String.class).block();
    return extractResponse(response);
   }

    /**
     * Extracts the relevant "text" field from Gemini's JSON response.
     * Example JSON structure:
     * {
     *   "candidates": [
     *     {
     *       "content": {
     *         "parts": [{ "text": "Time: O(n), Space: O(1)" }]
     *       }
     *     }
     *   ]
     * }
     *
     * @param response raw JSON string returned by Gemini
     * @return extracted complexity text
     */
   private String extractResponse(String response){
       try {
           ObjectMapper mapper = new ObjectMapper();
           JsonNode rootNode = mapper.readTree(response);
           return rootNode.path("candidates")
                   .get(0)
                   .path("content")
                   .path("parts")
                   .get(0)
                   .path("text")
                   .asText();
       } catch (Exception e) {
           return "Error processing request: " + e.getMessage();
       }
   }


    /**
     * Builds a prompt string that is sent to the Gemini model.
     * Escapes characters such as backslashes, quotes, and newlines
     * so the code snippet can be safely embedded in JSON.
     *
     * @param codeSnippet object containing user code
     * @return formatted natural language prompt
     */

    private String buildPrompt(CodeSnippet codeSnippet) {
        StringBuilder prompt = new StringBuilder("");
        prompt.append("Provide me time and space complexity for this code(note: do not reply me with my code snippet just answer the question) - ");
        String code = codeSnippet.getCodeSnippet().replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n");
        prompt.append(code);
        return prompt.toString();
    }
}
