package com.timecomplexityAnalyzer.Gemini.Time.Complexity.Analyzer;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gemini/timeAnalyzer")

@CrossOrigin(origins = "*")
public class Controller {

    private final ServiceToGetComplexity serviceToGetComplexity;
    // Constructor injection (Spring will auto-inject the ServiceToGetComplexity bean)
    public Controller(ServiceToGetComplexity serviceToGetComplexity) {
        this.serviceToGetComplexity = serviceToGetComplexity;
    }
    /**
     * Endpoint: POST /gemini/timeAnalyzer/generate
     *
     * Accepts a JSON body containing a code snippet,
     * sends it to the Service layer, which calls Gemini,
     * and returns the complexity analysis as the HTTP response.
     *
     * Example request body:
     * {
     *   "codeSnippet": "class Solution { ... }"
     * }
     *
     * Example response body:
     * "Time Complexity: O(n), Space Complexity: O(1)"
     *
     * @param codeSnippet JSON request mapped to CodeSnippet object
     * @return ResponseEntity with Gemini’s analysis as plain text
     */
    @PostMapping("/generate")
    public ResponseEntity<String> getComplexity(@RequestBody CodeSnippet codeSnippet){
        String response = serviceToGetComplexity.getTimeComplexity(codeSnippet);
        return ResponseEntity.ok(response);//gemini response
    }
}
