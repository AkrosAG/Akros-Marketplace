package ch.akros.marketplace.service.service.impl;

import ch.akros.marketplace.service.converters.UserConverter;
import ch.akros.marketplace.service.model.UserDto;
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

import static ch.akros.marketplace.service.constants.BaseConstants.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final TopicService topicService;
    private final WebClient keycloakClient;
    private final UserConverter userConverter;
    private final String keycloakClientId;
    private final String keycloakGrantType;
    private final String keycloakClientSecret;

    private static final String KEYCLOAK_USERS_URL = "/admin/realms/akros-marketplace/users";
    private static final String KEYCLOAK_ACCESS_TOKEN_URL = "/realms/akros-marketplace/protocol/openid-connect/token";

    public UserServiceImpl(WebClient keycloakClient,
                           TopicService topicService,
                           UserConverter userConverter,
                           @Value("${spring.keycloak_client.client_id}") String keycloakClientId,
                           @Value("${spring.keycloak_client.grant_type}") String keycloakGrantType,
                           @Value("${spring.keycloak_client.client_secret}") String keycloakClientSecret) {
        this.keycloakClient = keycloakClient;
        this.topicService = topicService;
        this.userConverter = userConverter;
        this.keycloakClientId = keycloakClientId;
        this.keycloakGrantType = keycloakGrantType;
        this.keycloakClientSecret = keycloakClientSecret;
    }

    @Transactional
    @Override
    public void deleteUser(String userId) throws NotFoundException {
        log.debug("UserServiceImpl.deleteUser() called");

        String requestUrl = KEYCLOAK_USERS_URL + "/" + userId;
        String authHeader = HTTP_BEARER_AUTHENTICATION_HEADER + " " + getAccessToken().orElse("");

        try {
            this.topicService.deleteTopicsForUser(userId);

            keycloakClient.delete()
                    .uri(requestUrl)
                    .header(HTTP_AUTHORIZATION_HEADER, authHeader)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

        } catch (WebClientResponseException.Unauthorized unauthorizedEx) {
            log.error("UserServiceImpl.deleteUser() user with id " + userId + "unauthorized access token " + authHeader);

        } catch (WebClientResponseException.Forbidden forbiddenEx) {
            log.error("UserServiceImpl.deleteUser() user with id " + userId + "forbidden access token " + authHeader);

        } catch (WebClientResponseException.NotFound notFoundEx) {
            log.error("UserServiceImpl.deleteUser() user with id " + userId + " not found.");
            throw new NotFoundException("User not found");

        } catch (WebClientResponseException.InternalServerError internalServerError) {
            log.error("UserServiceImpl.deleteUser() user with id " + userId + " Keycloak 500 error");
        } catch (Exception e) {

            log.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public void updateUser(String userId, UserDto userDto) throws NotFoundException {
        log.debug("UserServiceImpl.updateUser() called");

        String requestUrl = KEYCLOAK_USERS_URL + "/" + userId;
        String authHeader = HTTP_BEARER_AUTHENTICATION_HEADER + " " + getAccessToken().orElse("");

        JSONObject keycloakUser = userConverter.convertUserDtoToKeycloakUser(userDto);

        try {
            keycloakClient.put()
                    .uri(requestUrl)
                    .header(HTTP_AUTHORIZATION_HEADER, authHeader)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(keycloakUser)
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();

        } catch (Exception e) {

        }


    }

    private Optional<String> getAccessToken() {
        log.debug("UserServiceImpl.getAccessToken called");
        MultiValueMap<String, String> bodyValues = new LinkedMultiValueMap<>();
        bodyValues.add(KEYCLOAK_CLIENT_ID, keycloakClientId);
        bodyValues.add(KEYCLOAK_GRANT_TYPE, keycloakGrantType);
        bodyValues.add(KEYCLOAK_CLIENT_SECRET, keycloakClientSecret);

        try {
            JSONObject jsonResponse = keycloakClient.post().uri(KEYCLOAK_ACCESS_TOKEN_URL)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(bodyValues)
                    .retrieve()
                    .bodyToMono(JSONObject.class)
                    .block();

            return Optional.of(jsonResponse.get(HTTP_ACCESS_TOKEN).toString());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return Optional.empty();
    }
}
