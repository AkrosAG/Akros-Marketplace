package ch.akros.marketplace.service.service;

import ch.akros.marketplace.api.model.UserDTO;
import ch.akros.marketplace.api.model.UserResponseDTO;

import java.util.UUID;

public interface UserService {

    void deleteUser(UUID userId);

    UserResponseDTO updateUser(UUID userId, UserDTO user);
}
