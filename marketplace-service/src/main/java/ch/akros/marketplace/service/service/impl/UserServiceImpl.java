package ch.akros.marketplace.service.service.impl;

import ch.akros.marketplace.service.service.TopicService;
import ch.akros.marketplace.service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.webjars.NotFoundException;

import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final TopicService topicService;
    private final WebClient keycloakClient;

    @Value("${spring.keycloak_client.client_id}")
    private String keycloakClientId;
    @Value("${spring.keycloak_client.grant_type}")
    private String keycloakGrantType;
    @Value("${spring.keycloak_client.client_secret}")
    private String keycloakClientSecret;

    public UserServiceImpl(WebClient keycloakClient, TopicService topicService) {
        this.keycloakClient = keycloakClient;
        this.topicService = topicService;
    }

    @Transactional
    @Override
    public void deleteUser(String userId) throws NotFoundException {
        log.debug("UserServiceImpl.deleteUser() called");

        String requestUrl = String.format("/admin/realms/akros-marketplace/users/%s", userId);
        String authToken = getAccessToken().orElse("");
        String authHeader = "Bearer " + authToken;

        try {
            keycloakClient.delete()
                    .uri(requestUrl)
                    .header("Authorization", authHeader)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            this.topicService.deleteTopicsForUser(userId);

        } catch (WebClientResponseException.NotFound notFoundEx) {
            log.error("UserServiceImpl.deleteUser() user with id " + userId + " not found.");
            throw new NotFoundException("User not found");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    private Optional<String> getAccessToken() {
        log.debug("UserServiceImpl.getAccessToken called");
        MultiValueMap<String, String> bodyValues = new LinkedMultiValueMap<>();
        bodyValues.add("client_id", keycloakClientId);
        bodyValues.add("grant_type", keycloakGrantType);
        bodyValues.add("client_secret", keycloakClientSecret);

        try {
            JSONObject jsonResponse = keycloakClient.post().uri("/realms/akros-marketplace/protocol/openid-connect/token")
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(bodyValues)
                    .retrieve()
                    .bodyToMono(JSONObject.class)
                    .block();

            return Optional.of(jsonResponse.get("access_token").toString());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return Optional.empty();
    }
}
