
package ch.akros.marketplace.service;

import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import static ch.akros.marketplace.service.constants.BaseConstants.USER_ROLE_ADMIN;
import static ch.akros.marketplace.service.constants.BaseConstants.USER_ROLE_USER;

@Configuration
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {
    private static final String TOPICS_URI = "/topics";
    private static final String ANY_TOPICS_SEARCHES = "/topics/searches/**";
    private static final String ANY_CATEGORIES_URI = "/categories/**";

    private static final String ANY_USERS_URI = "/users/**";


    @Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean<>(new HttpSessionEventPublisher());
    }

    /**
     * Registers the KeycloakAuthenticationProvider with the authentication manager.
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(keycloakAuthenticationProvider());
    }

    /**
     * Defines the session authentication strategy.
     */
    @Bean
    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(buildSessionRegistry());
    }

    @Bean
    protected SessionRegistry buildSessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, TOPICS_URI, ANY_CATEGORIES_URI, ANY_TOPICS_SEARCHES).permitAll()
                .antMatchers(HttpMethod.POST, TOPICS_URI).hasAnyAuthority(USER_ROLE_ADMIN, USER_ROLE_USER)
                .antMatchers(HttpMethod.DELETE, TOPICS_URI, ANY_USERS_URI).hasAnyAuthority(USER_ROLE_ADMIN, USER_ROLE_USER)
                .antMatchers(HttpMethod.PUT, ANY_USERS_URI).hasAnyAuthority(USER_ROLE_ADMIN, USER_ROLE_USER)
                .anyRequest().permitAll()
                .and().csrf().disable();
    }
}