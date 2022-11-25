
package ch.akros.marketplace.administration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.vaadin.artur.helpers.LaunchUtil;

import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
@NpmPackage(value = "lumo-css-framework", version = "^4.0.10")
@NpmPackage(value = "line-awesome", version = "1.3.0")
public class AdminUIApplication extends SpringBootServletInitializer {
  private static final String DRIVER_CLASS_NAME = "org.postgresql.Driver";

  @Value("${POSTGRES_AM_DB_URL:${spring.datasource.url}}")
  private String dbUrl;

  @Value("${POSTGRES_AM_DB_USERNAME:${spring.datasource.username}}")
  private String dbUsername;

  @Value("${POSTGRES_AM_DB_PASSWORD:${spring.datasource.password}}")
  private String dbPassword;

  public static void main(String[] args) {
    System.setProperty("server.port", "9090");
    LaunchUtil.launchBrowserInDevelopmentMode(SpringApplication.run(AdminUIApplication.class, args));
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
}
