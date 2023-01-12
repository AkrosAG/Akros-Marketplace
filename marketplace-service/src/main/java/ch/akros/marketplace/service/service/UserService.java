package ch.akros.marketplace.service.service;

import ch.akros.marketplace.service.model.UserDto;
import org.webjars.NotFoundException;

public interface UserService {

    void deleteUser(String userId) throws NotFoundException;

    void updateUser(String userId, UserDto user) throws NotFoundException;
}
