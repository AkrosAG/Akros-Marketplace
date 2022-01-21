package ch.akros.am.userservice.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import static org.springframework.security.oauth2.jwt.JwtClaimNames.AUD;

import java.time.Duration;
import java.util.List;


@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String ROLES_KEY = "roles";
    private static final String ROLE_PREFIX = "ROLE_";

//    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
//    String jwkSetUri;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    String issuerUri;

    @Value("${auth.audience.service-name}")
    private String serviceName;

    //    @Override
    protected void configure2(HttpSecurity http) throws Exception {
        http.cors().and() // (1)
            .authorizeRequests().anyRequest().authenticated() // (2)
            .and()
            .oauth2ResourceServer().jwt(); // (3)
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
//        http.headers().frameOptions().sameOrigin();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests(authz -> authz
                        .antMatchers("/api/auth/**", "/oauth2/**", "/actuator/health/**", "/h2-console/**", "/mapproxy/**", "/site/**", "/swagger-ui/**", "/v3/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer()
                .jwt()
         //       .jwtAuthenticationConverter(jwtAuthenticationConverter());
        ;
    }

//    Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter() {
//        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
//
//        // Define the appropriate converter for converting roles/scopes to granted authorities
//        // - for Azure AD roles use <code>azureAdRoleConverter()</code>
//        // - for Azure AD scopes use <code>new JwtGrantedAuthoritiesConverter()</code>
//        converter.setJwtGrantedAuthoritiesConverter(azureAdRoleConverter());
//
//        return converter;
//    }

//    @Bean
//    JwtDecoder jwtDecoder(RestTemplateBuilder builder) {
//        RestOperations rest = builder
//                .setConnectTimeout(Duration.ofMinutes(2))
//                .setReadTimeout(Duration.ofMinutes(2))
//                .build();
//
//        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).restOperations(rest).build();
//
//        OAuth2TokenValidator<Jwt> audienceValidator = new JwtClaimValidator<List<String>>(AUD, aud -> aud.contains(serviceName));
//        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
//        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<Jwt>(withIssuer, audienceValidator);
//
//        jwtDecoder.setJwtValidator(withAudience);
//
//        return jwtDecoder;
//    }


//
//    @Bean
//    public JwtDecoder jwtDecoder(RestTemplateBuilder restTemplateBuilder) {
//
//        RestTemplate restOperations = restTemplateBuilder
//                .setConnectTimeout(Duration.ofSeconds(90))
//                .setReadTimeout(Duration.ofSeconds(90))
//                .build();
//
//        NimbusJwtDecoder nimbusJwtDecoder = NimbusJwtDecoder
//                .withJwkSetUri(jwkSetUri)
//                .restOperations(restOperations)
//                .build();
//
//        OAuth2TokenValidator<Jwt> clockSkew
//                = new DelegatingOAuth2TokenValidator<>(new JwtTimestampValidator(Duration.ofSeconds(60)));
//
//        nimbusJwtDecoder.setJwtValidator(clockSkew);
//        return nimbusJwtDecoder;
//    }

    /**
     * Extracts the roles from an Azure AD token and converts them to granted authorities
     */
//    private JwtGrantedAuthoritiesConverter azureAdRoleConverter() {
//        JwtGrantedAuthoritiesConverter roleConverter = new JwtGrantedAuthoritiesConverter();
////        roleConverter.setAuthorityPrefix(ROLE_PREFIX);
////        roleConverter.setAuthoritiesClaimName(ROLES_KEY);
//        return roleConverter;
//    }

//    @Bean(BeanIds.AUTHENTICATION_MANAGER)
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

}
