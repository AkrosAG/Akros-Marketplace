package ch.akros.marketplace.service.converters;

import ch.akros.marketplace.service.model.UserDto;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    private final static String KEYCLOAK_USER_FIRSTNAME = "firstName";
    private final static String KEYCLOAK_USER_LASTNAME = "lastName";
    private final static String KEYCLOAK_USER_EMAIL = "email";
    private final static String KEYCLOAK_USER_ATTRIBUTES = "attributes";
    private final static String KEYCLOAK_USER_PHONE_NUMBER = "phoneNumber";

    public JSONObject convertUserDtoToKeycloakUser(UserDto userDto) {
        JSONObject keycloakUser = new JSONObject();
        keycloakUser.put(KEYCLOAK_USER_FIRSTNAME, userDto.getFirstName());
        keycloakUser.put(KEYCLOAK_USER_LASTNAME, userDto.getLastName());
        keycloakUser.put(KEYCLOAK_USER_EMAIL, userDto.getEmail());

        JSONObject attributesObject = new JSONObject();
        keycloakUser.put(KEYCLOAK_USER_ATTRIBUTES, attributesObject);
        attributesObject.put(KEYCLOAK_USER_PHONE_NUMBER, userDto.getPhoneNumber());

        return keycloakUser;
    }
}
