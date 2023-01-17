package ch.akros.marketplace.service.service;

import ch.akros.marketplace.api.model.UserDTO;
import ch.akros.marketplace.api.model.UserResponseDTO;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.UUID;

public interface UserService {

    void deleteUser(UUID userId) throws WebClientResponseException.Unauthorized,
            WebClientResponseException.Forbidden,
            WebClientResponseException.NotFound,
            WebClientResponseException.InternalServerError,
            WebClientResponseException.ServiceUnavailable;

    UserResponseDTO updateUser(UUID userId, UserDTO user) throws WebClientResponseException.Unauthorized,
            WebClientResponseException.Forbidden,
            WebClientResponseException.NotFound,
            WebClientResponseException.InternalServerError,
            WebClientResponseException.ServiceUnavailable;
}
