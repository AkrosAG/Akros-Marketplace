package ch.akros.marketplace.service.service;

import org.webjars.NotFoundException;

public interface UserService {

    void deleteUser(String userId) throws NotFoundException;

}
