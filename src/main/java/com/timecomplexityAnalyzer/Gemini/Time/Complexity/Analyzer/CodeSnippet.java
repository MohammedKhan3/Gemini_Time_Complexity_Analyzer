package com.timecomplexityAnalyzer.Gemini.Time.Complexity.Analyzer;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

/**
 * Model class that represents the request body sent from the client.
 *
 * This class is used to capture a code snippet provided by the user,
 * which will then be passed to the service layer and analyzed for
 * time and space complexity using Gemini API.
 *
 * Example JSON request (from frontend):
 * {
 *   "codeSnippet": "class Solution { public int[] twoSum(...) { ... } }"
 * }
 */

public class CodeSnippet {
    public String getCodeSnippet() {
        return codeSnippet;
    }

    public void setCodeSnippet(String codeSnippet) {
        this.codeSnippet = codeSnippet;
    }

    private String codeSnippet;
}
