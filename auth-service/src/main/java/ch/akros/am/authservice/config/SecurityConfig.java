package ch.akros.am.authservice.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String ROLES_KEY = "roles";
    private static final String ROLE_PREFIX = "ROLE_";

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
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests(authz -> authz
                        .antMatchers("/api/auth/**", "/oauth2/**", "/actuator/health/**", "/h2-console/**", "/mapproxy/**", "/site/**", "/swagger-ui/**", "/v3/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer()
                .jwt();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

}
