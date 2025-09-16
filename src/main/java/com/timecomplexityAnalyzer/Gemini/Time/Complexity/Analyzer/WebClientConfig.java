package com.timecomplexityAnalyzer.Gemini.Time.Complexity.Analyzer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Creates and registers a WebClient bean in the Spring application context.
 *
 * - @Bean tells Spring that this method returns an object to be managed as a bean.
 * - WebClient is a non-blocking, reactive HTTP client used to call external APIs.
 * - By defining it here, we can inject WebClient into any service or component
 *   using @Autowired or constructor injection.
 *
 * Example usage in a service:
 *   private final WebClient webClient;
 *   public MyService(WebClient webClient) {
 *       this.webClient = webClient;
 *   }
 *
 * @return a WebClient instance built using the default builder
 */
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }
}
