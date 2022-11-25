package ch.akros.marketplace.service;

import javax.sql.DataSource;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
@Import(SecurityConfig.class)
public class MarketplaceServiceApplication {
  private static final String DRIVER_CLASS_NAME = "org.postgresql.Driver";

  @Value("${POSTGRES_AM_DB_URL:${spring.datasource.url}}")
  private String dbUrl;

  @Value("${POSTGRES_AM_DB_USERNAME:${spring.datasource.username}}")
  private String dbUsername;

  @Value("${POSTGRES_AM_DB_PASSWORD:${spring.datasource.password}}")
  private String dbPassword;

  private static final int HTTP_PORT = 8080;

  private static final int HTTPS_PORT = 8443;

  public static void main(final String[] args) {
    SpringApplication application = new SpringApplication(MarketplaceServiceApplication.class);
    application.run(args);
  }

  @Bean
  public KeycloakConfigResolver keycloakConfigResolver() {
    return new KeycloakSpringBootConfigResolver();
  }

  @Bean
  public DataSource getPostgresDataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName(DRIVER_CLASS_NAME);
    dataSource.setUrl(dbUrl);
    dataSource.setUsername(dbUsername);
    dataSource.setPassword(dbPassword);
    return dataSource;
  }

  @Bean
  public ServletWebServerFactory servletContainer() {
    TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
      @Override
      protected void postProcessContext(final Context context) {
        var securityConstraint = new SecurityConstraint();
        securityConstraint.setUserConstraint("CONFIDENTIAL");
        var collection = new SecurityCollection();
        collection.addPattern("/*");
        securityConstraint.addCollection(collection);
        context.addConstraint(securityConstraint);
      }
    };
    tomcat.addAdditionalTomcatConnectors(getHttpConnector());
    return tomcat;
  }

  private Connector getHttpConnector() {
    var connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
    connector.setScheme("http");
    connector.setPort(HTTP_PORT);
    connector.setSecure(false);
    connector.setRedirectPort(HTTPS_PORT);
    return connector;
  }
}
